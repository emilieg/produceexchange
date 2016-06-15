var express = require('express');
var User = require('../models/user');
var router = express.Router();
var expressJWT = require('express-jwt');
var jwt = require('jsonwebtoken');

var secret = "produceexchangejwtsecret";

router.route('/')
  .get(function(req, res) {
    User.find(function(err, users) {
      if (err) return res.status(500).send(err);
      res.send(users);
    });
  })
  .post(function(req, res) {
    User.create(req.body, function(err, user) {
      if (err) return res.status(500).send(err);
      // res.send(user);

      var token = jwt.sign(user, secret);
      res.send({user: user, token: token});
    });
  });

router.get('/:id', function(req, res) {
  User.findById(req.params.id, function(err, user) {
    if (err) return res.status(500).send(err);
    res.send(user);
  });
});

module.exports = router;