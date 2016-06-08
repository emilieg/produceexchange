var mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
  title: String,
  description: String,
  contact_name: String,
  email: String,
  img_public_id: String,
  secure_url: String,
  timestamps: { type: Date, default: Date.now}
});

var Post = mongoose.model('Post', postSchema);

// make this available to our other files
module.exports = Post;