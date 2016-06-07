var express= require('express');
var request = require('request');
var bodyParser = require('body-parser');
var app = express();
var path = require('path');


app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/public'));


//API controllers go here


app.get('/*', function(req, res) {
  console.log("hello");

  res.sendFile(path.join(__dirname, 'public/index.html'));
  // res.send('');
});




app.listen(process.env.PORT || 3000)