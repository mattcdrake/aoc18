const express = require('express');
const solutionCalls = require('./solution');

const app = express();

solutionCalls.solvePuzzles();

// Set EJS as rendering engine
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Home page
app.get('/', (req, res) => {
  const solutions = solutionCalls.getSolutions();
  res.render('home', {
    solutions,
  });
});

app.get('/solutions/:puzzleId', (req, res) => {
  const solutions = solutionCalls.getSolutions();
  if (Object.keys(solutions).includes(req.params.puzzleId)) {
    res.render('solution', {
      answer: solutions[req.params.puzzleId],
      puzzle: parseInt(req.params.puzzleId, 10),
    });
  } else {
    res.render('404');
  }
});

app.listen(3000, () => {});
