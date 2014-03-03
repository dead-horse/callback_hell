
var proxy = require('./proxy');

function remove(callback) {
  proxy.removeUser(function (err, res) {
    if (err) {
      return callback(err);
    }
    proxy.removePosts(function (err, res) {
      if (err) {
        return callback(err);
      }
      proxy.removeComments(callback);
    });
  });
}

remove(function (err, res) {
  err
  ? console.error(err.stack)
  : console.log('remove ok');
});
