
exports.getPosts = function (user, callback) {
  setTimeout(function () {
    callback(null, {name: user});
  }, 5);
};
