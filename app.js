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

});

io.on('connection', (socket) => {
  socket.on ('poll', function (eventCode) {
    pollForNewImages(eventCode, socket.id);
  });
});

function pollForNewImages(eventCode, socketId) {
  options = {
    url: 'https://hipstaapi.azurewebsites.net/event/' + eventCode + '/images',
    headers: {
      'X-ApiVersion': 3
    }
  };
  request(options, function(error, response, body) {
    var newData = JSON.parse(body);
    io.to(socketId).emit('newdata', newData);
  });
}

console.log('server is running on port' +  process.env.PORT || 4000);
