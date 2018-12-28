var express = require('express');
var app = express();
var solutionCalls = require("./solution");
var solutions = {};

solutionCalls.solution1(solutions);
solutionCalls.solution2(solutions);
solutionCalls.solution3(solutions);
solutionCalls.solution4(solutions);
solutionCalls.solution5(solutions);
solutionCalls.solution6(solutions);

// Set EJS as rendering engine
app.use(express.static("public"));
app.set("view engine", "ejs");

// Home page
app.get('/', function (req, res) {
  res.render("home", {
    solutions: solutions
  });
});

app.get('/solutions/:puzzleId', function (req, res) {
  console.log("Solving for problem " + req.params.puzzleId + ": " 
    + solutions[req.params.puzzleId]);
  res.render("solution", {
    answer: solutions[req.params.puzzleId],
    puzzle: parseInt(req.params.puzzleId)
  });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

