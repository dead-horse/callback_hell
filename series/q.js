
var proxy = require('./proxy');
var Q = require('q');

function remove(callback) {
  return Q.ninvoke(proxy.removeUser)
    .then(Q.ninvoke(proxy.removePosts))
    .then(Q.ninvoke(proxy.removeComments))
    .nodeify(callback);
}

remove().done(function () {
  console.log('remove ok');
}, console.error);
