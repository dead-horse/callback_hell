
var fs = require('co-fs');
var path = require('path');
var co = require('co');

var dirname = path.resolve(process.argv[2] || __dirname);

function *countJs(dirname) {
  var files = yield fs.readdir(dirname);
  for (var i = 0; i < files.length; i++) {
    var filename = files[i];
    var filepath = path.join(dirname, filename);
    var stat = yield fs.stat(filepath);
    if (!stat.isFile() && filename !== 'node_modules' && filename[0] !== '.') {
      yield *countJs(filepath);
    } else if (path.extname(filename) === '.js') {
      var content = yield fs.readFile(filepath, 'utf8');
      console.log('%s have %d lines', filepath, content.split('\n').length);
    }
  }
}
co(function*() {
  try {
    yield *countJs(dirname);
  } catch (err) {
    console.error(err.stack);
  }
})();
