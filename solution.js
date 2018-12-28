var Fabric = require('./fabric');
var GuardLogDay = require('./guard-log');

var fs = require('fs');
var os = require('os');

function sumRows(data) {
  var runningTotal = 0;
  data = data.split(os.EOL);
  for (item in data) {
    var sign = data[item][0];
    var val = parseInt(data[item].substring(1));
    if (!isNaN(val)) {
      if (sign === '+') {
        runningTotal += val;
      } else {
        runningTotal -= val;
      }
    }
  }
  return runningTotal;
};

function loopRows(data) {
  var runningTotal = 0;
  var index = 0;
  var found = false;
  var pastFreqs = new Set();
  data = data.split(os.EOL);

  while (!found) {
    // Add the current data item to the running total
    var sign = data[index][0];
    var val = parseInt(data[index].substring(1));

    if (!isNaN(val)) {
      if (sign === '+') {
        runningTotal += val;
      } else {
        runningTotal -= val;
      }

      // Check if value has been found before, if so, set flag.
      // I think you can do this from the while condition.
      if (pastFreqs.has(runningTotal)) {
        found = true;
      }

      // Add running total to array of found values
      pastFreqs.add(runningTotal);
    }


    // Increment index and reset it to 0 if necessary 
    index++;
    if (index >= data.length) {
      index = 0;
    }
  }

  return runningTotal;
}

function hasVals(boxid) {
  // Declare dictionary of letter/count pairs & booleans to be used in 
  // determining output.
  var letterCounts = {}
  var foundTwo = false;
  var foundThree = false;

  // Iterate through string, for each letter, add (or increment) it's value
  // to the dictionary.
  for (var i = 0; i < boxid.length; i++) {
    if (Object.keys(letterCounts).includes(boxid.charAt(i))) {
      letterCounts[boxid[i]] = letterCounts[boxid[i]] + 1;
    } else {
      letterCounts[boxid[i]] = 1;
    }
  }

  // 
  // Use dictionary to determine whether output should be 0, 1, 2, or 3 based
  // on which values show up 2 or 3 times.
  // Function return of 0 means that the value didn't have 2's or 3's,
  // Return of 1 means had 2's, not 3's,
  // Return of 2 means has 3's, not 2's,
  // Return of 3 means has both
  //
  for (var key in letterCounts) {
    // If both 2's and 3's are found, we can exit early
    //console.log("keyvalue: " + letterCounts[key]);
    if (foundTwo && foundThree) {
      break;
    }
    if (letterCounts[key] == 2) {
      foundTwo = true;
    }
    if (letterCounts[key] == 3) {
      foundThree = true;
    }
  }

  if (foundTwo && foundThree) {
    return 3;
  } else if (foundThree) {
    return 2;
  } else if (foundTwo) {
    return 1;
  } else {
    return 0;
  }
}

// Assuming strings are the same length. Would add error handling for the
// general case.
function stringDistance(string1, string2) {
  var distance = 0;
  for (var i = 0; i < string1.length; i++) {
    if (string1.charAt(i) !== string2.charAt(i)) {
      distance++;
    }
  }
  return distance;
}

// Assuming strings are the same length. Would add error handling for the
// general case.
function stripDifferent(string1, string2) {
  var outstring = "";
  for (var i = 0; i < string1.length; i++) {
    if (string1.charAt(i) === string2.charAt(i)) {
      outstring += string1.charAt(i);
    }
  }
  return outstring;
}

// This function parses the string that defines size & position of fabric patch.
// @return: A JSON with horizontalPos, verticalPos, width, and height values.
function getFabricDimensions(spec) {
  var output = {
    horizontalPos: 0,
    verticalPos: 0,
    width: 0,
    height: 0
  };
  var posString = spec.slice(spec.indexOf("@") + 2, spec.indexOf(":"));
  var sizeString = spec.slice(spec.indexOf(":") + 1);

  output.horizontalPos = posString.slice(0, posString.indexOf(","));
  output.verticalPos = posString.slice(posString.indexOf(",") + 1);
  output.width = sizeString.slice(1, sizeString.indexOf("x"));
  output.height = sizeString.slice(sizeString.indexOf("x") + 1);

  return output;
}

function sortByKey(array, key) {
  return array.sort(function(a, b) {
    var x = a[key];
    var y = b[key];
    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
  });
}

module.exports = {
  solution1: function (object) {
    //
    // Could probably speed this up by parsing each line as it's read from
    // the file, but I don't know enough JS (yet) to do that.
    //
    return fs.readFile('./input_data/p1.txt', 'utf-8', (err, data) => {
      var answer = sumRows(data);
      object['1'] = answer;
      return answer;
    });
  },

  solution2: function (object) {
    return fs.readFile('./input_data/p1.txt', 'utf-8', (err, data) => {
      var answer = loopRows(data);
      object['2'] = answer;
      return answer;
    });
  },

  solution3: function (object) {
    return fs.readFile('./input_data/p3.txt', 'utf-8', (err, data) => {
      var countTwos = 0;
      var countThrees = 0;
      //
      // Function return of 0 means that the value didn't have 2's or 3's,
      // Return of 1 means had 2's, not 3's,
      // Return of 2 means has 3's, not 2's,
      // Return of 3 means has both
      //
      var twosAndThrees = 0;
      data = data.split(os.EOL);

      for (item in data) {
        twosAndThrees = hasVals(data[item]);
        if (twosAndThrees === 0) {
          continue;
        } else if (twosAndThrees === 1) {
          countTwos++;
        } else if (twosAndThrees === 2) {
          countThrees++;
        } else {
          countTwos++;
          countThrees++;
        }
        // Reset twosAndThrees for next loop
        twosAndThrees = 0;
      }
      object['3'] = countTwos * countThrees;
    });
  },

  solution4: function (object) {
    return fs.readFile('./input_data/p3.txt', 'utf-8', (err, data) => {
      data = data.split(os.EOL);

      for (var i = 0; i < data.length; i++) {
        for (var j = i + 1; j < data.length; j++) {
          if (stringDistance(data[i], data[j]) == 1) {
            object['4'] = stripDifferent(data[i], data[j]);
            return;
          }
        }
      }
    });
  },

  solution5: function (object) {
    // Parse input file
    return fs.readFile('./input_data/p5.txt', 'utf-8', (err, data) => {
      data = data.split(os.EOL);

      // Create a "fabric" abstraction using 1000 sq inches
      var fabric = new Fabric(1000, 1000);

      // Iterate through whole file
      for (var i = 0; i < data.length; i++) {
        // For each spec, send dimensions to the fabric abstraction to
        // track which squares are utilized and how many times
        var dimensions = getFabricDimensions(data[i]);
        // Simple check for last line in the input file
        if (dimensions.height != "") {
          fabric.addOrder(dimensions);
        }
      }
      object["5"] = fabric.sumDoubles();

      // Calculate how many squares are used > 1 time
      for (var i = 0; i < data.length; i++) {
        if (!fabric.isOrderOverlapping(getFabricDimensions(data[i]))) {
          object["6"] = data[i];
          return;
        }
      }
    });
  }, 

  solution7: function(object) {
    // Parse input file
    return fs.readFile('./input_data/p7.txt', 'utf-8', (err, data) => {
      // Split input on newlines and drop empty lines
      data = data.split(os.EOL);
      data = data.filter(line => line.length > 0);
      var logList = [];

      for (var i = 0; i < data.length; i++) {
        var line = data[i];
        var dateString = line.substring(line.indexOf('[') + 1, 
          line.indexOf(']'));
        var year = dateString.substring(0, 4);
        var month = dateString.substring(5, 7);
        month = month - 1;
        var day = dateString.substring(8, 10);
        var hour = dateString.substring(11, 13);
        var minute = dateString.substring(14, 16);
        var thisDate = new Date(year, month, day, hour, minute);
        logList.push({timestamp: thisDate, 
          restOfLine: line.substring(line.indexOf("]") + 1)});
      }
      logList = sortByKey(logList, 'timestamp');

      GuardLogDayArray = [];
      var GuardLog;
      var firstGuard = true;

      for (line in logList) {
        tempstring = logList[line]['restOfLine'];
        if (tempstring.indexOf("Guard") > 0) {
          if (!firstGuard) {
            // Push the old guard log
            GuardLogDayArray.push(GuardLog);
          }
          firstGuard = false;
          var words = tempstring.split(' ');
          var GuardId = words[2].substring(1);
          logList[line]['timestamp'].setDate(
            logList[line]['timestamp'].getDate() + 1);
          GuardLog = new GuardLogDay(logList[line]['timestamp'], GuardId);
        } else {
          if (tempstring.indexOf("wakes") > 0) {
            GuardLog.wakeUp(logList[line]['timestamp'].getMinutes());
          } else {
            GuardLog.fallAsleep(logList[line]['timestamp'].getMinutes());
          }
        }
      }
      GuardLogDayArray.push(GuardLog);
      
      var guardSleepCounter = {};

      for (day in GuardLogDayArray) {
        var dayInfo = GuardLogDayArray[day].getInfo();
        var todaysGuard = dayInfo['guard'];

        if (Object.keys(guardSleepCounter).includes(todaysGuard)) {
          guardSleepCounter[todaysGuard] += dayInfo['minutesAsleep'];
        } else {
          guardSleepCounter[todaysGuard] = dayInfo['minutesAsleep'];
        }
      }

      var sleepyGuard = Object.keys(guardSleepCounter).reduce((a, b) =>
        guardSleepCounter[a] > guardSleepCounter[b] ? a : b);

      var sleepyMinutes = {};

      for (var i = 0; i < 60; i++) {
        sleepyMinutes[i] = 0;
      }

      for (day in GuardLogDayArray) {
        if (GuardLogDayArray[day].guardId == sleepyGuard) {
          var asleepMinutes = GuardLogDayArray[day].getAsleepMinutes();

          asleepMinutes.forEach(function(value) {
            sleepyMinutes[value]++;
          });
        }
      }


      var sleepiestMinute = Object.keys(sleepyMinutes).reduce((a, b) =>
      sleepyMinutes[a] > sleepyMinutes[b] ? a : b);

      object['7'] = sleepiestMinute * sleepyGuard;
      return;
    });
  }
};

