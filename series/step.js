
var step = require('step');
var proxy = require('./proxy');

function remove(callback) {
  step(function () {
    proxy.removeUser(this);
  }, function (err) {
    if (err) {
      return callback(err);
    }
    proxy.removePosts(this);
  }, function (err) {
    if (err) {
      return callback(err);
    }
    proxy.removeComments(callback);
  });
}

remove(function (err, res) {
  if (err) {
    return console.error(err);
  }
  console.log('remove ok');
});
