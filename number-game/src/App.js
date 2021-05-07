"use strict";
exports.__esModule = true;
var readline_1 = require("readline");
{
    var readline = readline_1.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    var input_1 = [];
    readline.on('line', function (line) {
        console.log('line', line);
        input_1.push(line);
    });
    readline.on('close', function () {
        console.log('input', input_1);
        process.exit();
    });
}
