var express = require('express');
var app = express();
var solutionCalls = require("./solution");
var solutions = {
  "solution1": null,
  "solution2": null,
  "solution3": null,
  "solution4": null,
  "solution5": null,
  "solution6": null
};

// TODO uncomment these once finished
/*
solutionCalls.solution1(solutions);
solutionCalls.solution2(solutions);
solutionCalls.solution3(solutions);
solutionCalls.solution4(solutions);
solutionCalls.solution5(solutions);
solutionCalls.solution6(solutions);
*/

// Set EJS as rendering engine
app.use(express.static("public"));
app.set("view engine", "ejs");

// Home page
app.get('/', function (req, res) {
  res.render("home", {
    solutions: solutions
  });
});

// TODO use a query string to combine all solutions into a single GET request
// Puzzle 1
app.get('/solution1', function (req, res) {
  console.log("Solving for problem 1: " + solutions["solution1"]);
  res.render("solution", {
    answer: solutions["solution1"],
    puzzle: 1
  });
});

// Puzzle 2
app.get('/solution2', function (req, res) {
  console.log("Solving for problem 2: " + solutions["solution2"]);
  res.render("solution", {
    answer: solutions["solution2"],
    puzzle: 2
  });
});

// Puzzle 3
app.get('/solution3', function (req, res) {
  console.log("Solving for problem 3: " + solutions["solution3"]);
  res.render("solution", {
    answer: solutions["solution3"],
    puzzle: 3
  });
});

// Puzzle 4
app.get('/solution4', function (req, res) {
  console.log("Solving for problem 4: " + solutions["solution4"]);
  res.render("solution", {
    answer: solutions["solution4"],
    puzzle: 4
  });
});

// Puzzle 5
app.get('/solution5', function (req, res) {
  console.log("Solving for problem 5: " + solutions["solution5"]);
    res.render("solution", {
      answer: solutions["solution5"],
      puzzle: 5
  });
});

// Puzzle 6
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

