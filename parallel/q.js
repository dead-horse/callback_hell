
var Q = require('q');
var proxy = require('./proxy');

var getUser = Q.denodeify(proxy.getUser);
var getPosts = Q.denodeify(proxy.getPosts);
var getComments = Q.denodeify(proxy.getComments);

function get(callback) {
  return getUser()
  .then(function (user) {
    return Q.all([user, getPosts(user), getComments(user)]);
  })
  .spread(function (user, posts, comments) {
    return {
      user: user,
      posts: posts,
      comments: comments
    };
  })
  .nodeify(callback);
}

// get().then(console.log, console.error);
get(function (err, res) {
  if (err) {
    return console.error(err);
  }
  console.log(res);
});
