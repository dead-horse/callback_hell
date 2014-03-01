
var thunkify = require('thunkify-wrap');
var co = require('co');
var proxy = require('./proxy');

proxy = thunkify(proxy);

function *remove() {
  yield proxy.removeUser();
  yield proxy.removePosts();
  yield proxy.removeComments();
}

co(function *() {
  try {
    yield remove;
  } catch (err) {
    return console.error(err);
  }
  console.log('remove ok');
})();
