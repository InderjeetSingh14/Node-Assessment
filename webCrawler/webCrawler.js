var request = require('request');
var cheerio = require('cheerio');
var URL = require('url-parse');
var fs = require('fs');

// const pagesToVisit = URL here;

var baseUrl;

var webCrawler = (pagesToVisit, callback) => {
    var url = new URL(pagesToVisit);
    baseUrl = url.protocol + "//" + url.hostname;
    request(pagesToVisit, function (error, response, body) {
        if (error) {
            console.log("Error: " + error);
        }
        if (response.statusCode === 200) {

            var $ = cheerio.load(body);
            console.log("Page title:  " + $('title').text());
            collectInternalLinks($);
            callback('true')
        }
    });
}
function collectInternalLinks($) {
    var links = [];
    var relativeLinks = $("a[href^='/']");
    relativeLinks.each(function () {
        if (links.indexOf(baseUrl + $(this).attr('href')) == -1) {
            links.push(baseUrl + $(this).attr('href'));
        }
    });
    fs.writeFile('webCrawlerOutput.txt', links, function (err) {
        if (err) throw err;
        console.log('Saved!');
    });
}

module.exports = webCrawler
