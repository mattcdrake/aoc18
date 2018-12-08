var express = require('express');
var app = express();
var solutionCalls = require("./solution");
var solutionNames = {
    "Day 1 Solution": "solution1"
};
var solutions = {
    "solution1": null
}

solutionCalls.solution1(solutions);

// Set EJS
app.use(express.static("public"));
app.set("view engine", "ejs");

// Home page
app.get('/', function(req, res) {
    res.render("home", {solutions: solutionNames});
});

// Day 1
app.get('/solution1', function(req, res) {
    console.log("Solving for problem 1: " + solutions["solution1"]);
    res.render("solution1", {answer: solutions["solution1"]});
});

app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});


