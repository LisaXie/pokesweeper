import readline = require('readline');

var rl = readline.createInterface({
    input:  process.stdin,
    output: process.stdout
});

export = function(question: string, callback: (input: string) => void) {
    rl.question(question, callback);
};
