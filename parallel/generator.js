
var promisify = require('thenify-all');
var co = require('co');
var proxy = require('./proxy');

proxy = promisify(proxy);


var get = co(function *_get() {
  var user = yield proxy.getUser;
  return yield {
    user: user,
    posts: proxy.getPosts(user),
    comments: proxy.getComments(user)
  };
});

get(function (err, res) {
  err
  ? console.error(err.stack)
  : console.log(res);
});
