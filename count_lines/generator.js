
var fs = require('mz/fs');
var path = require('path');
var co = require('co');
var utils = require('./utils');

function *_count(dirname) {
  var files = yield fs.readdir(dirname);

  for (var i = 0; i < files.length; i++) {
    var filename = files[i];
    var filepath = path.join(dirname, filename);
    var stat = yield fs.stat(filepath);

    if (!stat.isFile() && utils.validFolder(filename)) {
      // do not wait, just count the subdir
      count(filepath, function (err) {
        err && console.error(err.stack);
      });
      continue;
    }

    if (utils.isJs(filename)) {
      var content = yield fs.readFile(filepath, 'utf8');
      console.log('%s has %d lines', filepath, content.split('\n').length);
    }
  }
}
var count = co(_count);

count(utils.getDir(), function (err) {
  err && console.error(err.stack);
});
