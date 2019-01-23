var crawler = require('./webCrawler/webCrawler');

const fs = require('fs');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

firstNonRepeatingCharacter = string => {
    for (let i = 0; i < string.length; i++) {
        let char = string.charAt(i);
        if (string.indexOf(char) == i && string.indexOf(char, i + 1) == -1) {
            return char;
        }
    }
    return null;
};

// Task 1. outputs a file content from any local directory
app.get('/readFile', (req, res) => {
    let fileContent = fs.readFileSync('readFile.json');
    fileContent = JSON.parse(fileContent);
    res.status(200).send(fileContent);
});

// 2. API that takes two parameters in a GET call and produces their product.
app.get('/product/:parameter1/:parameter2', (req, res) => {
    if (isNaN(req.params.parameter1) || isNaN(req.params.parameter2)) {
        res.status(400).send("Both Parameters should be a number")
    }
    else {
        let product = req.params.parameter1 * req.params.parameter2;
        res.status(200).send(`${req.params.parameter1} * ${req.params.parameter2} is ${product}`);
    }
});

// 3. API that accepts a file content and writes them to the disk.
app.post('/writeFile', (req, res) => {
    req.on('data', (data) => {
        fs.writeFile('writeFile.txt', data, (err) => {
            if (err) {
                res.status(400).send('File Not Saved', err);
            }
        });
    });
    req.on('end', () => {
        res.status(200).send('File Successfully Saved');
    });
});

// 4. API that accepts a String as an input name and returns the first non-repeating character in the String. 
app.get('/firstNonRepeatingCharacter/:name', (req, res) => {
    let nonRepeatChar = firstNonRepeatingCharacter(req.params.name);
    if (nonRepeatChar) {
        res.status(200).send(nonRepeatChar);
    }
    else {
        res.status(400).send("No Non Repeating Character Found");
    }
});

app.get('/webCrawler', (req, res) => {
    crawler(req.query.url, (data, err) => {
        if (err) {
            res.status(400).send(err);
        }
        if (data == "true") {
            res.status(200).send("done");
        }
    });
});

// Task 1.	Write a Nodejs server that listens on port 3001
app.listen(3001, () => {
    console.log("server is up and listening on port 3001");
});

module.exports = app;
