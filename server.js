// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/timestamp/:date_string?", function (req, res) {
  
  console.log(req.params.date_string + " "+ typeof req.params.date_string);
  
  let ds = req.params.date_string != undefined ? req.params.date_string :null;
  //check if this date string is valid.
  
  let date = ds == null ? new Date() :(ds.indexOf('-')>-1? new Date(ds): new Date(parseInt(ds)));
  //console.log(parseInt("05-28-1999"));
 // date =new Date( parseInt("1450000"));
  //console.log(date.toString());
  //let date = ds == null ? new Date() :new Date(ds);
  //console.log(date.toString());
  if(date.toString() == "Invalid Date")
  {
    //invalid datestring was sent. return response from here.
    res.json({"error" : "Invalid Date" });
  }
  else
  {
    res.json({"unix": date.getTime(), "utc" : date.toUTCString()});
  }
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});