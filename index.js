var express= require('express');
var request = require('request');
var bodyParser = require('body-parser');
var expressJWT = require('express-jwt');
var jwt = require('jsonwebtoken');
var path = require('path');
var mongoose = require('mongoose');
var Post = require('./models/post');
var User = require('./models/user');
var app = express();

// mongoose.connect('mongodb://'+process.env.MONGO_USER+':'+process.env.MONGO_PASS+'@ds011314.mlab.com:11314/produce');
mongoose.connect('mongodb://localhost/produce');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/public'));
app.use('/api/post', require('./controllers/api_controller.js'));
app.use('/api/allposts', require('./controllers/api_controller.js'));
app.use('/api/users', require('./controllers/api_controller.js'));

// The following section implents JWT authentication:
var secret = "produceexchangejwtsecret";
// Check every request to /api/users for a token that matches 
// the ecryption of "secret"
// unless the user is signing up for an account (post request)
app.use('/api/users', expressJWT({secret: secret})
  .unless({path: ['/api/users'], method: 'post'}));

// Check every error occuring on the server for name "UnauthorizedError" and 
// attach a more specific message
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send({
      message: 'You need an authorization token to view this information.'
    });
  }
});

//Routes
app.post('/api/authenticate', function(req, res) {
  User.findOne({email: req.body.email}, function(err, user) {
    if (err || !user) {
      return res.status(401).send({
        message: 'No account found for this email address.'
      });
    }
    user.authenticated(req.body.password, function(err, result) {
      if (err || !result) {
        return res.status(401).send({
          message: 'The password entered does not match account for this email address.'
        });
      }
      var token = jwt.sign(user, secret);
      res.send({user: user, token: token});
    });
  });
});

app.get('/*', function(req, res) {
  console.log("hello");
  res.sendFile(path.join(__dirname, 'public/index.html'));
});




app.listen(process.env.PORT || 3000)