
var Eventproxy = require('eventproxy');
var Bagpipe = require('bagpipe');
var proxy = require('./proxy');
var fakeuser = require('./fakeuser');
var users = require('./fakeuser');

function get10UserPost(users, callback) {
  var queue = new Bagpipe(10);
  var ep = Eventproxy.create();
  ep.fail(callback);
  ep.after('post', users.length, callback.bind(null, null));
  users.forEach(function (user) {
    proxy.getPosts(user, ep.group('post'));
  });
}

var start = Date.now();
get10UserPost(users, function (err, result) {
  err
  ? console.error(err)
  : console.log(result);

  console.log('total used %d ms', Date.now() - start);
});
