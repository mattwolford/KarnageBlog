// routes.js -  for the Express app's REST api
// load the BlogPot model
var BlogPost = require('./models/blog');

module.exports = function(app) {

  // get all posts
  app.get('/api/posts', function(req, res) {

      // use mongoose to get all posts in the database 
      //http://stackoverflow.com/questions/5825520/in-mongoose-how-do-i-sort-by-date-node-js#answer-15081087
      BlogPost.find().sort({date: 'descending'}).exec(function(err, posts) {

          // if there is an error retrieving, send the error.
          // nothing after res.send(err) will execute
          if (err)
              res.send(err)
          // return all blogposts in JSON format
          res.json(posts);
      });
  });

  // create new blogpost and send back all posts after creation
  app.post('/api/posts', function(req, res) {
      BlogPost.create({
          title : req.body.title,
          body : req.body.body,
          username: req.body.username,
          done : false
      }, function(err, blogpost) {
          if (err)
              res.send(err);

          // now, return all the blogposts (includes the new one)
          BlogPost.find(function(err, posts) {
              if (err)
                  res.send(err)
              res.json(posts);
          });
      });

  });
  
  app.delete('/api/posts/:blogpost_id', function(req, res) {
    BlogPost.remove({
      _id : req.params.blogpost_id
    }, function(err, blogpost) {
      if (err)
        res.send(err);
      BlogPost.find(function(err, posts) {
        if (err)
          res.send(err)
        res.json(posts);
      });
    });
  });
  
};
