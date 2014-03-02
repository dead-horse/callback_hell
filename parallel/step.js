

var step = require('step');
var proxy = require('./proxy');


function get(callback) {
  var result = {};
  step(function () {
    proxy.getUser(this);
  }, function (err, user) {
    if (err) {
      return callback(err);
    }
    result.user = user;
    proxy.getPosts(user, this.parallel());
    proxy.getComments(user, this.parallel());
  }, function (err, posts, comments) {
    if (err) {
      return callback(err);
    }
    result.posts = posts;
    result.comments = comments;
    callback(null, result);
  });
}

get(function (err, res) {
  if (err) {
    return console.error(err);
  }
  console.log(res);
});
