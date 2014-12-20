
var co = require('co');
var proxy = require('./proxy');
var fakeuser = require('./fakeuser');
var parallel = require('co-parallel');
var promisify = require('thenify-all');
var users = require('./fakeuser');

proxy = promisify(proxy);

var get10UserPost = co(function *(users) {
  var tasks = users.map(function *(user) {
    return yield proxy.getPosts(user);
  });
  return yield parallel(tasks, 10);
});

var start = Date.now();
get10UserPost(users, function(err, res) {
  err
  ? console.error(err)
  : console.log(res);

  console.log('total used %d ms', Date.now() - start);
});
