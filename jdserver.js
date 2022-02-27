'use strict';

// Constants
const express = require('express');
const { status } = require('express/lib/response');
const app = express();
const date = require('date-and-time');
  
// Creating object of current date and time by using Date()
const now  =  new Date();
  
// Formatting the date and time by using date.format() method
const value = date.format(now,'YYYY/MM/DD HH:mm:ss');

const PORT = 3000;
const HOST = '0.0.0.0';

var fs = require("fs");

//
// Endpoint to allow miniweb to GET protocol string for the WJS
// Shell script "jds" is run from cron to produce jackpot.json
//
app.get('/rest_miniweb/jackpots.pl', function (req, res) {
   fs.readFile( __dirname + "/" + "jackpot.json", 'utf8', function (err, data) {
      console.log(value, req.hostname, "GET", data );    // Echo to console
      res.end( data );
   });
})

app.use(express.json());

// 
// Endpoint to allow miniweb to POST push reports
//
app.post('/rest_miniweb/status_report.pl', function(req, res) {
  console.log(value, req.hostname, "POST", JSON.stringify(req.body));      // Echo to console

  // Equivalent to res.status(200).send('OK')
  res.sendStatus(200);
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);