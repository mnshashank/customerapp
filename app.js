var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");


var app = express();


// var logger = function(req,res,next) {
// console.log("logging...");
// next();
// }
//
// app.use(logger);

// body parser middleware


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

// set static path
app.use(express.static(path.join(__dirname, "public")));

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
  res.json(person);
});


app.listen(3000, function() {
console.log("App started on port 3000!! :)");
});
