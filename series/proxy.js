
exports.removeUser = function (callback) {
  setTimeout(function () {
    console.log('remove user');
    callback(null, true);
  }, 5);
};

exports.removePosts = function (callback) {
  setTimeout(function () {
    console.log('remove posts');
    callback(null, true);
  }, 5);
};

exports.removeComments = function (callback) {
  setTimeout(function () {
    console.log('remove comments');
    callback(null, true);
  }, 5);
};
