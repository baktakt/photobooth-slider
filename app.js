// set variables for environment
var express = require('express');
var app = express();
var path = require('path');
var request = require('request');

// views as directory for all template files
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs'); // use either jade or ejs
// instruct express to server up static assets
app.use(express.static('public'));

// set routes
app.get('/:id', function(req, res) {
  var options = {
	  url: 'https://hipstaapi.azurewebsites.net/event/' + req.params.id + '/stream',
	  headers: {
	    'X-ApiVersion': 3
	  }
	};

	function callback(error, response, body) {
	  if (!error && response.statusCode == 200) {
	    var data = JSON.parse(body);
      console.log(data);
	    res.render('index', data);
	  }
	}

	request(options, callback);
});

// Set server port
app.listen(process.env.PORT || 4000);
console.log('server is running on port' +  process.env.PORT || 4000);
