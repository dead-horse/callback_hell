
var fs = require('co-fs');
var path = require('path');
var co = require('co');
var utils = require('./utils');

function *count(dirname) {
  var files = yield fs.readdir(dirname);

  for (var i = 0; i < files.length; i++) {
    var filename = files[i];
    var filepath = path.join(dirname, filename);
    var stat = yield fs.stat(filepath);

    if (!stat.isFile() && utils.validFolder(filename)) {
      yield *count(filepath);
      continue;
    }

    if (utils.isJs(filename)) {
      var content = yield fs.readFile(filepath, 'utf8');
      console.log('%s have %d lines', filepath, content.split('\n').length);
    }
  }
}

co(function*() {
  try {
    yield *count(utils.getDir());
  } catch (err) {
    console.error(err.stack);
  }
})();
