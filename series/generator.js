
var promisify = require('thenify-all');
var co = require('co');
var proxy = require('./proxy');

proxy = promisify(proxy);

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
