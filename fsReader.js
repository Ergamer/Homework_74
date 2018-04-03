const fs = require('fs');

fs.readFile('./messages.txt', (err, result) => {
    if (err) throw err;
    console.log('File contents: ', result.toString());
});


console.log('Program is running!');