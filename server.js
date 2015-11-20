"use strict"

var express = require('express');
var app = express(); // our app using express
var mongoose = require('mongoose'); // mongoose for mongodb
var port = process.env.PORT || 8080; // defines port
var morgan =require('morgan'); // log requests to the console
var bodyParser = require('body-parser'); // pulls info from HTML POST
var methodOverride = require('method-override'); // simulate DELETE and PUT
var database = require('./config/database.js');
// ================================== //
//          CONNECT TO MONGODB        //
// ================================== //
mongoose.connect(database.url);
// ================================== //
//           SERVER CONFIG            //
// ================================== //
app.use(express.static(__dirname + '/public')); // sets static file location
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json({ type: 'application/vnd.api+json'}));
app.use(methodOverride());
// ================================== //
//              ROUTES                //
// ================================== //
require('./app/routes')(app);

app.listen(port);
console.log('App listening on port', port);