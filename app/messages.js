const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = "./messages";



let getArray = () => {
    return new Promise((resolve, reject) => {
        const messagesArray = [];
        fs.readdir('./messages', (err, files) => {
            files.forEach(file => {
                if (err) {
                    reject(err);
                } else {
                    messagesArray.push(path + '/' + file);
                }
            });
            resolve(messagesArray);
        });
    })
};



router.get('/', (req, res) => {
    getArray().then((result) => {
                    console.log(result)
        const getMessages = result.map((message) => {
            return new Promise((resolve, reject) => {
                fs.readFile(message, (err, result) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(JSON.parse(result));
                });
            });
        });
        return Promise.all(getMessages);
    }).then((result) => {
        res.send(result.slice(-5));
    });
});






router.post('/', (req, res) => {
    const messages = req.body;
    let data = new Date();
    let isoDate = data.toISOString();
    messages.date = isoDate;
    fs.writeFile('./messages/' + isoDate + '.txt', JSON.stringify(messages), (err) => {
        if (err) {
            console.error(err);
        }
        console.log('File was saved!');
    });
});


module.exports = router;

