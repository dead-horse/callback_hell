
var thunkify = require('thunkify-wrap');
var co = require('co');
var proxy = require('./proxy');

proxy = thunkify(proxy);

function *get() {
  var user = yield proxy.getUser;
  var r = yield [proxy.getPosts(user), proxy.getComments(user)];
  return {
    user: user,
    posts: r[0],
    comments: r[1]
  };
}

co(function *() {
  console.log(yield get);
})();
