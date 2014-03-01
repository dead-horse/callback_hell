
exports.getUser = function (callback) {
  setTimeout(function () {
    callback(null, {name: 'foo'});
  }, 5);
};

exports.getPosts = function (user, callback) {
  setTimeout(function () {
    callback(null, []);
  }, 5);
};

exports.getComments = function (user, callback) {
  setTimeout(function () {
    callback(null, []);
  }, 5);
};
