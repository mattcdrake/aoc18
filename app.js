var express = require('express');
var app = express();
var solutionCalls = require("./solution");
var solutionNames = {
    "Day 1 Solution": "solution1"
};

// Set EJS
app.use(express.static("public"));
app.set("view engine", "ejs");

// Home page
app.get('/', function(req, res) {
    res.render("home", {solutions: solutionNames});
});

// Day 1
app.get('/solution1', function(req, res) {
    solutionCalls.solution1(function(returnValue) {
        console.log(returnValue);
    })
    // console.log("Solving solution 1: " + answer);
    // res.render("solution1", {answer: answer});
});

app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});
