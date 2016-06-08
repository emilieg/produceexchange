//put API controller and place api routes
//this API controller interacts with the database

var express= require('express');
var router = express.Router();
var Post = require('../models/post');

//this is same as /post
router.route('/')
  .post(function(req, res) {
    console.log("req: ", req.body);
    Post.create(req.body, function(err, mypost) {
      console.log("mypost: "+ mypost);
      if (err) return res.status(500).send(err);
      res.send(mypost);
    });
  });


router.route('/')
  .get(function(req, res) {
    Post.find(function(err, posts) {
      if(err) return res.status(500).send(err);
      res.send(posts);
    })
  })  







module.exports = router;

