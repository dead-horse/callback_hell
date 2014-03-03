
var async = require('async');
var proxy = require('./proxy');

function remove(callback) {
  async.series([
    proxy.removeUser,
    proxy.removePosts,
    proxy.removeComments
  ], callback);
}

remove(function (err, res) {
  err
  ? console.error(err.stack)
  : console.log('remove ok');
});
