// set variables for environment
var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app).listen(process.env.PORT || 4000);
var io = require('socket.io')(server);
var path = require('path');
var request = require('request');

var eventCode;

// views as directory for all template files
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs'); // use either jade or ejs
// instruct express to server up static assets
app.use(express.static('public'));

// set routes
app.get('/', function(req, res) {
  res.render('index');
});
app.get('/:id', function(req, res) {
  var data;
  eventCode = req.params.id;
  var options = {
	  url: 'https://hipstaapi.azurewebsites.net/event/' + eventCode + '/images',
	  headers: {
	    'X-ApiVersion': 3
	  }
	};

  function callback(eventCode) {
    return function(error, response, body) {
      if (!error && response.statusCode == 200) {
        data = JSON.parse(body);
        data.eventCode = eventCode;
        res.render('slideshow', { 'data': data });
      }
      else {
        res.render('index');
      }
    }
  }

  request(options, callback(eventCode));

  function pollCallback(error, response, body) {
    if (!error && response.statusCode == 200) {
      var newData = JSON.parse(body);
      if(newData.images.length>data.images.length) {
        console.log('sending reload to browser');
        io.emit('reload');
        data = newData;
      }
    }
  }

  function pollForNewImages() {
    request(options, pollCallback);
  }
  setInterval(() => pollForNewImages(), 180000);
});

io.on('connection', (socket) => {
  console.log('Client connected');
  socket.on('disconnect', () => console.log('Client disconnected'));
});

console.log('server is running on port' +  process.env.PORT || 4000);
