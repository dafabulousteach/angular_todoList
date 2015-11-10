"use strict"

var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var port = process.env.PORT || 7575;
var router = require('./routes.js');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.set('view engine', 'ejs');
// app.use(express.static('client'));
app.use('/', router);

var server = app.listen(port, function(){
  var host = server.address().address;
  console.log('Listening at http://%s:%s -- %s', host, port);
});