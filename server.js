
// Express app
var express 	= require('express');
var app 		= express();


var config 		= require('./config');
configs 		= config();
console.log(configs);

// Setup
// -----
var port = config().port;


app.get('/', function(req, res){
	res.send('Hello from Potionseller WEB');
});

// Start app
// ---------
app.listen(port);
console.log('Magic happening at: ' + port);