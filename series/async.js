
var async = require('async');
var proxy = require('./proxy');

function remove(callback) {
  async.series([
    proxy.removeUser.bind(proxy),
    proxy.removePosts.bind(proxy),
    proxy.removeComments.bind(proxy)
  ], callback);
}

remove(function (err, res) {
  if (err) {
    return console.error(err);
  }
  console.log('remove ok');
});
