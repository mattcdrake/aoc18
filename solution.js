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
    }
};
