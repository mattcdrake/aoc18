var express = require('express');
var app = express();
var solutionCalls = require("./solution");
var solutionNames = {
    "Solution #1": "solution1",
    "Solution #2": "solution2"
};
var solutions = {
    "solution1": null,
    "solution2": null
}

solutionCalls.solution1(solutions);
solutionCalls.solution2(solutions);

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
    res.render("solution", {answer: solutions["solution1"], day: 2});
});

// Day 2
app.get('/solution2', function(req, res) {
    console.log("Solving for problem 2: " + solutions["solution2"]);
    res.render("solution", {answer: solutions["solution2"], day: 2});
});

app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});


