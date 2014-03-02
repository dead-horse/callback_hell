
var Eventproxy = require('eventproxy');
var proxy = require('./proxy');

function remove(callback) {
  var ep = Eventproxy.create();
  ep.fail(callback);
  proxy.removeUser(ep.doneLater('user'));
  ep.once('user', function (res) {
    proxy.removePosts(ep.done('post'));
  });
  ep.once('post', function (res) {
    proxy.removeComments(callback);
  });
}

remove(function (err, res) {
  if (err) {
    return console.error(err);
  }
  console.log('remove ok');
});
