
var thunkify = require('thunkify-wrap');
var co = require('co');
var proxy = require('./proxy');

proxy = thunkify(proxy);

var remove  = co(function *remove() {
  yield proxy.removeUser();
  yield proxy.removePosts();
  yield proxy.removeComments();
});

remove(function (err) {
  err
  ? console.error(err.stack)
  : console.log('remove ok');
});
