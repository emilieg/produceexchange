var express= require('express');
var request = require('request');
var bodyParser = require('body-parser');
var app = express();
var path = require('path');
var mongoose = require('mongoose');
var Post = require('./models/post');


mongoose.connect('mongodb://localhost/produce');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/public'));
app.use('/api/post', require('./controllers/api_controller.js'));
app.use('/api/allposts', require('./controllers/api_controller.js'));
//this says to use api_controller for /post route

//API controllers go here

app.get('/*', function(req, res) {
  console.log("hello");
  res.sendFile(path.join(__dirname, 'public/index.html'));
});




app.listen(process.env.PORT || 3000)