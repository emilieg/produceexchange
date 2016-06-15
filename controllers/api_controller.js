//put API controller and place api routes
//this API controller interacts with the database

var express= require('express');
var Post = require('../models/post');
var User = require ('../models/user');
var jwt = require('jsonwebtoken');
var router = express.Router();
//this is same as /post
router.route('/')
  .post(function(req, res) {
    req.body.user = req.user._doc._id;

    Post.create(req.body, function(err, mypost) {
      // console.log(req.user)
      if (err) return res.status(500).send(err);
      // console.log(req.user._doc.posts)
      // req.user._doc.posts.push(mypost)
      // console.log(req.user._doc.posts)
      User.findOneAndUpdate({_id:req.user._doc._id},{$push:{posts:mypost}},function(err, user){
        console.log(user)
        res.send(mypost);
      })
    });
  });

router.route('/user')
  .get(function(req,res) {
    Post.find({user: req.user._doc._id}).populate('user').exec(function(err,posts) {
      if(err) return res.status(500).send(err);
      res.send(posts);
    })
  })

router.route('/')
  .get(function(req, res) {
    Post.find().populate('user').exec(function(err, posts) {
      if(err) return res.status(500).send(err);
      res.send(posts);
    })
  });

router.route('/:id')
 .delete(function(req, res) {
    Post.findByIdAndRemove(req.params.id, function(err) {
      if (err) return res.status(500).send(err);
      res.send({'message': 'success'});
      console.log(req.params.id);
    });
  });

 router.route('/:id/search')
   .get(function(req, res) {
      Post.find({title: req.params.id}, function(err, post) {
        if (err) return res.status(500).send(err);
        console.log("post: ", post);
        res.send(post);
      });
  })





module.exports = router;

