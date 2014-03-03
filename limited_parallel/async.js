var async = require('async');
var proxy = require('./proxy');
var users = require('./fakeuser')

//a limited parallel function
function get10UserPost(users, cbk){
	var tasks = users.map(function(user){
		return async.apply(proxy.getPosts, user);
	})
	async.parallelLimit(tasks, 10, cbk);
}


// test it
get10UserPost(users, function (err, result) {
	if (err){
		return console.log(err);
	}
	console.log(result);
})
