const os = require('os');

module.exports = {
  sumRows: (data) => {
    let runningTotal = 0;
    const splitLines = data.split(os.EOL);
    for (let i = 0; i < splitLines.length; i++) {
      const sign = splitLines[i][0];
      const val = parseInt(splitLines[i].substring(1), 10);
      if (!Number.isNaN(val)) {
        if (sign === '+') {
          runningTotal += val;
        } else {
          runningTotal -= val;
        }
      }
    }
    return runningTotal;
  },

  loopRows: (data) => {
    let runningTotal = 0;
    let index = 0;
    let found = false;
    const pastFreqs = new Set();
    const splitLines = data.split(os.EOL);

    while (!found) {
      // Add the current data item to the running total
      const sign = splitLines[index][0];
      const val = parseInt(data[index].substring(1), 10);

      if (!Number.isNaN(val)) {
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

  hasVals: (boxid) => {
    // Declare dictionary of letter/count pairs & booleans to be used in
    // determining output.
    const letterCounts = {};
    let foundTwo = false;
    let foundThree = false;

    // Iterate through string, for each letter, add (or increment) it's value
    // to the dictionary.
    for (let i = 0; i < boxid.length; i++) {
      if (Object.keys(letterCounts).includes(boxid.charAt(i))) {
        letterCounts[boxid[i]]++;
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
    for (let i = 0; i < letterCounts.length; i++) {
      // If both 2's and 3's are found, we can exit early
      if (foundTwo && foundThree) {
        break;
      }
      if (letterCounts[i] === 2) {
        foundTwo = true;
      }
      if (letterCounts[i] === 3) {
        foundThree = true;
      }
    }

    let outval = 0;

    if (foundTwo && foundThree) {
      outval = 3;
    } else if (foundThree) {
      outval = 2;
    } else if (foundTwo) {
      outval = 1;
    } else {
      outval = 0;
    }

    return outval;
  },

  // Assuming strings are the same length. Would add error handling for the
  // general case.
  stringDistance: (string1, string2) => {
    let distance = 0;
    for (let i = 0; i < string1.length; i++) {
      if (string1.charAt(i) !== string2.charAt(i)) {
        distance++;
      }
    }
    return distance;
  },

  // Assuming strings are the same length. Would add error handling for the
  // general case.
  stripDifferent: (string1, string2) => {
    let outstring = '';
    for (let i = 0; i < string1.length; i++) {
      if (string1.charAt(i) === string2.charAt(i)) {
        outstring += string1.charAt(i);
      }
    }
    return outstring;
  },

  // This function parses the string that defines size & position of fabric
  // patch.
  // @return: A JSON with horizontalPos, verticalPos, width, and height values.
  getFabricDimensions: (spec) => {
    const output = {
      horizontalPos: 0,
      verticalPos: 0,
      width: 0,
      height: 0,
    };
    const posString = spec.slice(spec.indexOf('@') + 2, spec.indexOf(':'));
    const sizeString = spec.slice(spec.indexOf(':') + 1);

    output.horizontalPos = posString.slice(0, posString.indexOf(','));
    output.verticalPos = posString.slice(posString.indexOf(',') + 1);
    output.width = sizeString.slice(1, sizeString.indexOf('x'));
    output.height = sizeString.slice(sizeString.indexOf('x') + 1);

    return output;
  },

  sortByKey: (array, key) => {
    array.sort((a, b) => {
      const x = a[key];
      const y = b[key];
      let outval = 0;
      if (x < y) {
        outval = -1;
      } else if (x > y) {
        outval = 1;
      }
      return outval;
    });
  },
};
