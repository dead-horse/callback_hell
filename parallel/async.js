

var async = require('async');
var proxy = require('./proxy');

function getPostsAndComments(user, cb) {
  async.parallel([
    proxy.getPosts.bind(proxy, user),
    proxy.getComments.bind(proxy, user)
  ], cb);
}

function get(callback) {
  async.waterfall([
    proxy.getUser.bind(proxy),
    function (user, cb) {
      var result = {user: user};
      getPostsAndComments(user, function (err, res) {
        if (err) {
          return cb(err);
        }
        result.posts = res[0];
        result.comments = res[1];
        cb(null, result);
      });
    }
  ], callback);
}

get(function (err, res) {
  if (err) {
    return console.error(err);
  }
  console.log(res);
});
