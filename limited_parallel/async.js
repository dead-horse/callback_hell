
var async = require('async');
var proxy = require('./proxy');
var users = require('./fakeuser');

//a limited parallel function
function get10UserPost(users, callback) {
  var tasks = users.map(function (user) {
    return async.apply(proxy.getPosts, user);
  });
  async.parallelLimit(tasks, 10, callback);
}


var start = Date.now();
get10UserPost(users, function (err, result) {
  err
  ? console.error(err)
  : console.log(result);

  console.log('total used %d ms', Date.now() - start);
});
