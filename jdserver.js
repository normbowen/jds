'use strict';

// Constants
const express = require('express');
const { status } = require('express/lib/response');
const app = express();
const date = require('date-and-time');

const PORT = 3000;
const HOST = '0.0.0.0';

var fs = require("fs");

// Endpoint to allow miniweb to GET protocol string for the WJS
// Shell script "jds" is run from cron to produce jackpot.txt

app.get('/jds/:mwid', function (req, res) {
    fs.readFile(__dirname + "/" + "jackpot.txt", 'utf8', function (err, data) {  
    const now = new Date();                                     // Creating object of current date and time by using Date()
    const mytime = date.format(now, 'YYYY/MM/DD HH:mm:ss');     // Formatting the date and time by using date.format() method
    const mwid = req.params.mwid;                               // The miniweb device ID is appended to the URL, capture to add to console log
    console.log(mytime, mwid, "GET", data);                     // Echo to console date/time, miniweb device ID, GET, data returned (jackpot.txt)
    res.end( data );
   });
})

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);