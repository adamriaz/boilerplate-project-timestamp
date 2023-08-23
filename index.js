// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.get("/api/:date?", function (req, res) {
  const params = req.params.date;
  const INVALID_DATE = "Invalid Date"
  const invalidResponseMessage = { error: INVALID_DATE }

  const current = new Date();
  const dateResponse = { unix: current.getTime(), utc: current.toUTCString() }
  if (params === '' || params === undefined) {
    res.json(dateResponse);
  }

  const date = new Date(params);

  if (date.toString() === INVALID_DATE) {

    const unix = new Date(parseInt(params, 10));
    if (unix.toString() !== INVALID_DATE) {
      dateResponse.unix = unix.getTime();
      dateResponse.utc = unix.toUTCString();
      res.json(dateResponse);
    } else {
      res.json(invalidResponseMessage);
    }

  } else {
    dateResponse.unix = date.getTime();
    dateResponse.utc = date.toUTCString();
    res.json(dateResponse)
  }
});

// listen for requests :)
var listener = app.listen(3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
