var block = true;
exports.getPosts = function (user, callback) {
  setTimeout(function () {
    callback(null, {name: user});
  }, block ? 100 : 5);
  block = false;
};
