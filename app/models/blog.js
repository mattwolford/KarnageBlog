var mongoose = require('mongoose');

// define mongo model =================
// http://mongoosejs.com/docs/guide.html
module.exports = mongoose.model('BlogPost', {
                      title: String,
                      body: String,
                      username: String,
                      date: { type: Date, default: Date.now }
});

