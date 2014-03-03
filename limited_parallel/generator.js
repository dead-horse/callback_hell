var co = require('co');
var proxy = require('./proxy');
var fakeuser = require('./fakeuser');
var parallel = require('co-parallel');
var thunkify = require('thunkify-wrap');


var users = require('./fakeuser');
var getPost = thunkify(proxy.getPosts);


function *post(user){
  // console.log(('GET ' + user + ' post'));
  return (yield getPost(user));
}



co(function *(){
  var tasks = users.map(post);
  var res = yield parallel(tasks, 10);
  console.log(res);
})();
