var express = require('express');
var app = express();
var solutionCalls = require("./solution");
// TODO collapse "solutionNames" and "solutions" functionality
var solutionNames = {
    "Solution #1": "solution1",
    "Solution #2": "solution2",
    "Solution #3": "solution3"
};
var solutions = {
    "solution1": null,
    "solution2": null,
    "solution3": null
}

// TODO uncomment these once finished
solutionCalls.solution1(solutions);
//solutionCalls.solution2(solutions);
solutionCalls.solution3(solutions);

// Set EJS
app.use(express.static("public"));
app.set("view engine", "ejs");

// Home page
app.get('/', function (req, res) {
    res.render("home", {
        solutions: solutionNames
    });
});

// Day 1
app.get('/solution1', function (req, res) {
    console.log("Solving for problem 1: " + solutions["solution1"]);
    res.render("solution", {
        answer: solutions["solution1"],
        puzzle: 1
    });
});

// Day 2
app.get('/solution2', function (req, res) {
    console.log("Solving for problem 2: " + solutions["solution2"]);
    res.render("solution", {
        answer: solutions["solution2"],
        puzzle: 2
    });
});

// Day 3
app.get('/solution3', function (req, res) {
    console.log("Solving for problem 3: " + solutions["solution3"]);
    res.render("solution", {
        answer: solutions["solution3"],
        puzzle: 3
    });
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});