var express = require("express");
var path = require('path');

var app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use('/js', express.static(__dirname + '/public/js'));
app.use('/app', express.static(__dirname + '/public/app'));
app.use('/css', express.static(__dirname + '/public/css'));

app.all('/api/*', function(req, res, next) {
  res.sendStatus(404);
});

app.all('*', function(req, res, next) {
  // Just send the index.html for other files to support HTML5Mode
  res.sendFile('public/index.html', { root: __dirname });
});

module.exports = app;