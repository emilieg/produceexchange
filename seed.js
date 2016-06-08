var mongoose = require('mongoose');
var Post = require('./models/post');
mongoose.connect('mongodb://localhost/produce');

var newPost = Post({
  title: "Artichokes",
  description: "free artichokes! Come get them.",
  contact_name: "Emilie",
  email: "emiliegerberharris@gmail.com",
  img_public_id: "  lznggy0gyikupgottrcs",
  secure_url: " https://res.cloudinary.com/dia36odnd/image/upload/v1465316205/lznggy0gyikupgottrcs.png",
  date: { type: Date, default: Date.now },
});

// save the event
newPost.save(function(err) {
  if (err) console.log(err);
  console.log('Event created!');
});

//to seed:  in CLI run node seed.js