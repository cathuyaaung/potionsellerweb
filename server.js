
// Express app
var express 	= require('express');
var app 		= express();
var config 		= require('./config');
configs 		= config();

var port = config().port;

app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.use('/app',  express.static(__dirname + '/app'));
app.use('/views',  express.static(__dirname + '/views'));

// Homepage
app.get('/*', function(req, res){
	res.sendFile(__dirname+'/views/index.html', { message: 'test' });
});


// Start app
// ---------
app.listen(port);
console.log('Magic happening at: ' + port);