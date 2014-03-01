
var fs = require('fs');
var path = require('path');

var dirname = path.resolve(process.argv[2] || __dirname);

// count the total lines of js files

function countJs(dirname) {
  fs.readdir(dirname, function (err, files) {
    if (err) {
      return console.error(err.stack);
    }
    files.forEach(function (filename) {
      var filepath = path.join(dirname, filename);
      fs.stat(filepath, function (err, stat) {
        if (err) {
          return console.error(err.stack);
        }
        if (!stat.isFile() && filename !== 'node_modules' && filename[0] !== '.') {
          return countJs(filepath);
        }
        if (path.extname(filename) === '.js') {
          fs.readFile(filepath, 'utf8', function (err, content) {
            if (err) {
              return console.error(err.stack);
            }
            console.log('%s have %d lines', filepath, content.split('\n').length);
          });
        }
      });
    });
  });
}

countJs(dirname);
