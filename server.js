"use strict"

var express = require('express');
var app = express(); // our app using express
var mongoose = require('mongoose'); // mongoose for mongodb
var morgan =require('morgan'); // log requests to the console
var bodyParser = require('body-parser'); // pulls info from HTML POST
var methodOverride = require('method-override'); // simulate DELETE and PUT

// ================================== //
//          CONNECT TO MONGODB        //
// ================================== //
// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function(){
//   var Todo = mongoose.model('Todo', {
//     text : String
//   });
//   console.log('db connection has been created');
// });
mongoose.connect('mongodb://admin:password@ds053784.mongolab.com:53784/todo-list');

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
//              MODELS                //
// ================================== //
var Todo = mongoose.model('Todo', {
    text : String
});

// ================================== //
//              ROUTES                //
// ================================== //
app.get('/api/todos', function(req, res){
  Todo.find(function(err, todos){
    if(err){
      res.send(err);
    }
    res.json(todos);
  });
});

app.post('/api/todos', function(req, res){
  console.log(req.params.todo_id);
  Todo.create({
    text:req.body.text,
    done: false
  }, function(err, todo){
    if(err){
      res.send(err);
    }
    Todo.find(function(err, todos){
      if(err){
        res.send(err);
      }
      res.json(todos);
    });
  });
});

app.delete('/api/todos', function(req, res){
  Todo.remove({
    _id : req.params.todo_id
  }, function(err, todo){
      if(err){
        res.send(err);
      }
      Todo.find(function(err, todos){
        if(err){
          res.send(err);
        }
        res.json(todos);
      });
  });
});

// ================================== //
//       LOAD SINGLE VIEW FILE        //
// ================================== //

app.listen(8080);
console.log('App listening on port 8080');