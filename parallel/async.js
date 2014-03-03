

var async = require('async');
var proxy = require('./proxy');


function get(callback) {
  async.waterfall([
    proxy.getUser,
    getPostsAndComments
  ], callback);

  function getPostsAndComments(user, cb) {
    async.parallel([
      proxy.getPosts.bind(proxy, user),
      proxy.getComments.bind(proxy, user)
    ], function (err, res) {
      if (err) {
        return cb(err);
      }
      cb(null, {
        user: user,
        posts: res[0],
        comments: res[1]
      });
    });
  }
}

get(function (err, res) {
  err
  ? console.error(err.stack)
  : console.log(res);
});
