
var Eventproxy = require('eventproxy');
var proxy = require('./proxy');

function get(callback) {
  var ep = Eventproxy.create();
  ep.fail(callback);

  proxy.getUser(ep.done('user'));
  ep.once('user', function (user) {
    proxy.getPosts(user, ep.done('posts'));
    proxy.getComments(user, ep.done('comments'));
  });

  ep.all('user', 'posts', 'comments',
    function (user, posts, comments) {
    callback(null, {
      user: user,
      posts: posts,
      comments: comments
    });
  });
}

get(function (err, res) {
  err
  ? console.error(err.stack)
  : console.log(res);
});
