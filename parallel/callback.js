
var proxy = require('./proxy');

function get(callback) {
  proxy.getUser(function (err, user) {
    if (err) {
      return callback(err);
    }
    proxy.getPosts(user, function (err, posts) {
      if (err) {
        return callback(err);
      }
      proxy.getComments(user, function (err, comments) {
        if (err) {
          return callback(err);
        }
        callback(null, {
          user: user,
          posts: posts,
          comments: comments
        });
      });
    });
  });
}

get(function (err, res) {
  if (err) {
    return console.error(err);
  }
  console.log(res);
});
