var express = require('express');
var app = express();
var solutionCalls = require("./solution");
// TODO collapse "solutionNames" and "solutions" functionality
var solutionNames = {
  "Solution #1": "solution1",
  "Solution #2": "solution2",
  "Solution #3": "solution3",
  "Solution #4": "solution4",
  "Solution #5": "solution5",
  "Solution #6": "solution6"
};
var solutions = {
  "solution1": null,
  "solution2": null,
  "solution3": null,
  "solution4": null,
  "solution5": null,
  "solution6": null
};

// TODO uncomment these once finished
solutionCalls.solution1(solutions);
solutionCalls.solution2(solutions);
solutionCalls.solution3(solutions);
solutionCalls.solution4(solutions);
solutionCalls.solution5(solutions);

// Set EJS as rendering engine
app.use(express.static("public"));
app.set("view engine", "ejs");

// Home page
app.get('/', function (req, res) {
  res.render("home", {
    solutions: solutionNames
  });
});

// TODO use a query string to combine all solutions into a single GET request
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

// Day 4
app.get('/solution4', function (req, res) {
  console.log("Solving for problem 4: " + solutions["solution4"]);
  res.render("solution", {
    answer: solutions["solution4"],
    puzzle: 4
  });
});

// Day 5
app.get('/solution5', function (req, res) {
  console.log("Solving for problem 5: " + solutions["solution5"]);
    res.render("solution", {
      answer: solutions["solution5"],
      puzzle: 5
  });
});

// Day 6
app.get('/solution6', function (req, res) {
  console.log("Solving for problem 6: " + solutions["solution6"]);
    res.render("solution", {
      answer: solutions["solution6"],
      puzzle: 6
  });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

