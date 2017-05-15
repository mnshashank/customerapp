var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var expressValidator = require("express-validator");


var app = express();


// var logger = function(req,res,next) {
// console.log("logging...");
// next();
// }
//
// app.use(logger);

//view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
// body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

// set static path
app.use(express.static(path.join(__dirname, "public")));

//global variables
app.use(function (req, res,next) {
  res.locals.errors = null;
  next();
})

//express validator middleware
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

var person = [
  {
    name: "shashank",
    age: 23
  },
  {
    name: "shashank",
    age: 23
  },
  {
    name: "shashank",
    age: 23
  },
  {
    name: "shashank",
    age: 23
  }];

app.get('/',function(req,res){
  res.render("index",{
    title: "customers",
    users: person
  });
});

app.post("/users/add", function(req, res) {

req.checkBody("name", "name is essential").notEmpty();
req.checkBody("age", "age is very essential").notEmpty();
var errors = req.validationErrors();

if (errors) {
  console.log("Error occured :(");
  res.render("index",{
    title: "customers",
    users: person,
    errors : errors
  });
} else {
  var newUser = {
    name : req.body.name,
    age : req.body.age
  };
  console.log(newUser);
}

});

app.listen(3000, function() {
console.log("App started on port 3000!! :)");
});
