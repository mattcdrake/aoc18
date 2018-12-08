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
    var pastFreqs = [];
    var count = 0;
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
            if (pastFreqs.includes(runningTotal)) {
                found = true;
            }

            // Add running total to array of found values
            pastFreqs.push(runningTotal);
        }


        // Increment index and reset it to 0 if necessary 
        index++;
        if (index >= data.length) {
            index = 0;
        }
        count++;
        console.log("Index: " + index + ", data.length: " + data.length);
        console.log("Value: " + data[index]);
        console.log("Count: " + count);
        console.log("Running total: "  +  runningTotal);
    }

    return runningTotal;
}

module.exports = {
    solution1: function(object) {
        //
        // Could probably speed this up by parsing each line as it's read from
        // the file, but I don't know enough JS (yet) to do that.
        //
        return fs.readFile('./input_data/p1.txt', 'utf-8', (err, data) => {
            var answer = sumRows(data);
            object['solution1'] = answer;
            return answer;
        });
    },

    solution2: function(object) {
        return fs.readFile('./input_data/p1.txt', 'utf-8', (err, data) => {
            var answer = loopRows(data);
            object['solution2'] = answer;
            return answer;
        });
    }

};
