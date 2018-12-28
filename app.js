var express = require('express');
var app = express();
var solutionCalls = require("./solution");
var solutions = {};

solutionCalls.solution1(solutions);
solutionCalls.solution2(solutions);
solutionCalls.solution3(solutions);
solutionCalls.solution4(solutions);
// Solution5() fills solutions for puzzles 5 & 6
solutionCalls.solution5(solutions);
solutionCalls.solution7(solutions);

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
  var puzzleId = req.params.puzzleId;
  if (puzzleId in Object.keys(solutions)) {
    console.log("Solving for problem " + puzzleId + ": " 
      + solutions[puzzleId]);
    res.render("solution", {
      answer: solutions[puzzleId],
      puzzle: parseInt(puzzleId)
  });
  } else {
    console.log("Solution not found for problem " + puzzleId + ": 404");
    res.render("404");
  }
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

