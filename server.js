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

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});


// Timestamp API Service
app.get('/api/timestamp/:date_string?', function(req, res) {

  let date;
  
  if(req.params.date_string) { 
    
    let date_string = /\d{13}/.test(req.params.date_string) ? parseInt(req.params.date_string) : req.params.date_string;
    
    date = new Date(date_string);
    
    // Test if date_string is valid   
    if(date.toString() === 'Invalid Date') { 
      res.json({error : "Invalid Date" });
    } else {
      res.json({unix : date.getTime(), utc: date.toUTCString() })
    }
    
  } else { // if undefined
    
    date = new Date();
    res.json({unix : date.getTime(), utc: date.toUTCString() });
    
  }
  
});