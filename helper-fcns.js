var fs = require('fs');
var os = require('os');

module.exports = {
  sumRows: function(data) {
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
  },

  loopRows: function(data) {
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
  },

  hasVals: function(boxid) {
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
  },

  // Assuming strings are the same length. Would add error handling for the
  // general case.
  stringDistance: function(string1, string2) {
    var distance = 0;
    for (var i = 0; i < string1.length; i++) {
      if (string1.charAt(i) !== string2.charAt(i)) {
        distance++;
      }
    }
    return distance;
  },

  // Assuming strings are the same length. Would add error handling for the
  // general case.
  stripDifferent: function(string1, string2) {
    var outstring = "";
    for (var i = 0; i < string1.length; i++) {
      if (string1.charAt(i) === string2.charAt(i)) {
        outstring += string1.charAt(i);
      }
    }
    return outstring;
  },

  // This function parses the string that defines size & position of fabric 
  // patch.
  // @return: A JSON with horizontalPos, verticalPos, width, and height values.
  getFabricDimensions: function(spec) {
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
  },

  sortByKey: function(array, key) {
    return array.sort(function(a, b) {
      var x = a[key];
      var y = b[key];
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
  }
}