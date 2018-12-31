const fs = require('fs');
const os = require('os');
const Fabric = require('./fabric');
const GuardLogDay = require('./guard-log');
const HelperFunctions = require('./helper-fcns');

module.exports = {
  solutions: {},

  getSolutions: () => module.exports.solutions,

  setAnswer(puzzle, answer) {
    this.solutions[puzzle] = answer;
  },

  solution1: () => {
    //
    // Could probably speed this up by parsing each line as it's read from
    // the file, but I don't know enough JS (yet) to do that.
    //
    fs.readFile('./input_data/p1.txt', 'utf-8', (err, data) => {
      const answer = HelperFunctions.sumRows(data);
      // object['1'] = answer;
      module.exports.setAnswer(1, answer);
    });
  },

  solution2: () => {
    fs.readFile('./input_data/p1.txt', 'utf-8', (err, data) => {
      const answer = HelperFunctions.loopRows(data);
      module.exports.setAnswer(2, answer);
    });
  },

  solution3: () => {
    fs.readFile('./input_data/p3.txt', 'utf-8', (err, data) => {
      let countTwos = 0;
      let countThrees = 0;
      //
      // Function return of 0 means that the value didn't have 2's or 3's,
      // Return of 1 means had 2's, not 3's,
      // Return of 2 means has 3's, not 2's,
      // Return of 3 means has both
      //
      let twosAndThrees = 0;
      const tempLines = data.split(os.EOL);
      const splitLines = tempLines.filter(line => line.length > 0);

      for (let i = 0; i < splitLines.length; i++) {
        twosAndThrees = HelperFunctions.hasVals(splitLines[i]);
        if (twosAndThrees === 1) {
          countTwos++;
        } else if (twosAndThrees === 2) {
          countThrees++;
        } else if (twosAndThrees === 3) {
          countTwos++;
          countThrees++;
        }
        // Reset twosAndThrees for next loop
        twosAndThrees = 0;
      }
      const answer = countTwos * countThrees;
      module.exports.setAnswer(3, answer);
    });
  },

  solution4: () => {
    fs.readFile('./input_data/p3.txt', 'utf-8', (err, data) => {
      const splitLines = data.split(os.EOL);

      for (let i = 0; i < splitLines.length; i++) {
        for (let j = i + 1; j < splitLines.length; j++) {
          const distance = HelperFunctions.stringDistance(
            splitLines[i],
            splitLines[j],
          );
          if (distance === 1) {
            const answer = HelperFunctions.stripDifferent(
              splitLines[i],
              splitLines[j],
            );
            module.exports.setAnswer(4, answer);
          }
        }
      }
    });
  },

  solution5: () => {
    // Parse input file
    fs.readFile('./input_data/p5.txt', 'utf-8', (err, data) => {
      const splitLines = data.split(os.EOL);

      // Create a "fabric" abstraction using 1000 sq inches
      const fabric = new Fabric(1000, 1000);

      // Iterate through whole file
      for (let i = 0; i < splitLines.length; i++) {
        // For each spec, send dimensions to the fabric abstraction to
        // track which squares are utilized and how many times
        const dimensions = HelperFunctions.getFabricDimensions(splitLines[i]);
        // Simple check for last line in the input file
        if (dimensions.height !== '') {
          fabric.addOrder(dimensions);
        }
      }
      let answer = fabric.sumDoubles();
      module.exports.setAnswer(5, answer);

      // Calculate how many squares are used > 1 time
      for (let i = 0; i < splitLines.length; i++) {
        const fabricDims = HelperFunctions.getFabricDimensions(splitLines[i]);
        if (!fabric.isOrderOverlapping(fabricDims)) {
          answer = splitLines[i];
          module.exports.setAnswer(6, answer);
          return;
        }
      }
    });
  },

  solution7: () => {
    // Parse input file
    fs.readFile('./input_data/p7.txt', 'utf-8', (err, data) => {
      // Split input on newlines and drop empty lines
      const tempLines = data.split(os.EOL);
      const splitLines = tempLines.filter(line => line.length > 0);
      let logList = [];

      for (let i = 0; i < splitLines.length; i++) {
        logList.push(GuardLogDay.breakupLine(splitLines[i]));
      }
      logList = HelperFunctions.sortByKey(logList, 'timestamp');

      const GuardLogDayArray = [];
      let GuardLog;
      let firstGuard = true;

      for (let i = 0; i < logList.length; i++) {
        const tempstring = logList[i].restOfLine;
        if (tempstring.indexOf('Guard') > 0) {
          if (!firstGuard) {
            // Push the old guard log
            GuardLogDayArray.push(GuardLog);
          }
          firstGuard = false;
          const words = tempstring.split(' ');
          const GuardId = words[2].substring(1);
          logList[i].timestamp.setDate(logList[i].timestamp.getDate() + 1);
          GuardLog = new GuardLogDay(logList[i].timestamp, GuardId);
        } else if (tempstring.indexOf('wakes') > 0) {
          GuardLog.wakeUp(logList[i].timestamp.getMinutes());
        } else {
          GuardLog.fallAsleep(logList[i].timestamp.getMinutes());
        }
      }

      GuardLogDayArray.push(GuardLog);

      const guardSleepCounter = {};

      for (let i = 0; i < GuardLogDayArray.length; i++) {
        const dayInfo = GuardLogDayArray[i].getInfo();
        const todaysGuard = dayInfo.guard;

        if (Object.keys(guardSleepCounter).includes(todaysGuard)) {
          guardSleepCounter[todaysGuard] += dayInfo.minutesAsleep;
        } else {
          guardSleepCounter[todaysGuard] = dayInfo.minutesAsleep;
        }
      }

      let reducer = (a, b) => {
        const subAnswer = guardSleepCounter[a] > guardSleepCounter[b] ? a : b;
        return subAnswer;
      };

      const sleepyGuard = Object.keys(guardSleepCounter).reduce(reducer);

      const sleepyMinutes = GuardLogDay.createSleepyMinutes(GuardLogDayArray,
        sleepyGuard);

      reducer = (a, b) => {
        const subAnswer = sleepyMinutes[a] > sleepyMinutes[b] ? a : b;
        return subAnswer;
      };

      let sleepiestMinute = Object.keys(sleepyMinutes).reduce(reducer);
      const answer = sleepiestMinute * sleepyGuard;
      module.exports.setAnswer(7, answer);

      const minuteSleepFrequency = GuardLogDay.buildSleepFreq(GuardLogDayArray);
      sleepiestMinute = GuardLogDay.buildSleepiestMinute(minuteSleepFrequency);

      // Find guard that sleeps more on a single minute than all others
      const sleepiestGuard = Object.keys(sleepiestMinute).reduce(
        (a, b) => (
          sleepiestMinute[a].timesAsleep >
          sleepiestMinute[b].timesAsleep ? a : b),
      );

      const answerGuard = parseInt(sleepiestGuard, 10);
      const answerMinute = sleepiestMinute[sleepiestGuard].sleepyMinute;
      const answer2 = answerGuard * answerMinute;
      module.exports.setAnswer(8, answer2);
    });
  },

  solution9: () => {
    fs.readFile('./input_data/p9.txt', 'utf-8', (err, data) => {
      module.exports.setAnswer(9, HelperFunctions.fullyReact(data));
    });
  },

  solution10: () => {
    fs.readFile('./input_data/p9.txt', 'utf-8', (err, data) => {
      const polymerString = data.trim();
      const polymerLengths = {};
      for (let i = 0; i < 26; i++) {
        const unit = String.fromCharCode(97 + i);
        const strippedUnit = HelperFunctions.stripUnit(polymerString, unit);
        const currentLength = HelperFunctions.fullyReact(strippedUnit);
        polymerLengths[unit] = currentLength;
      }
      const shortestPolymer = Object.keys(polymerLengths).reduce(
        (a, b) => (
          polymerLengths[a] < polymerLengths[b] ? a : b),
      );
      module.exports.setAnswer(10, polymerLengths[shortestPolymer]);
    });
  },

  solvePuzzles() {
    this.solution1();
    this.solution2();
    this.solution3();
    this.solution4();
    // Solution5() fills solutions for puzzles 5 & 6
    this.solution5();
    // Solution7() fills solutions for puzzles 7 & 8
    this.solution7();
    this.solution9();
    this.solution10();
  },
};
