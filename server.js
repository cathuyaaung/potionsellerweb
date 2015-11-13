
// Express app
var express 	= require('express');
var app 		= express();


var config 		= require('./config');
configs 		= config();
console.log(configs);

// Setup
// -----
var port = config().port;
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.use('/css',  express.static(__dirname + '/css'));
app.use('/app',  express.static(__dirname + '/app'));

// Homepage
app.get('/', function(req, res){
	res.sendFile(__dirname+'/index.html', { message: 'test' });
});

// Everything else
// app.get('*', function(req, res){
// 	res.sendFile(__dirname+'/404.html');
// });


// Start app
// ---------
app.listen(port);
console.log('Magic happening at: ' + port);