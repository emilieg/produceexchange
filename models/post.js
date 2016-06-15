var mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
  title: String,
  description: String,
  img_public_id: String,
  secure_url: String,
  timestamps: { type: Date, default: Date.now},
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

var Post = mongoose.model('Post', postSchema);

// make this available to our other files
module.exports = Post;