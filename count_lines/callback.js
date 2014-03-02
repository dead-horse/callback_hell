
var fs = require('fs');
var path = require('path');
var utils = require('./utils');

// count the total lines of js files

function count(dirname) {
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

        if (!stat.isFile() && utils.validFolder(filename)) {
          return count(filepath);
        }

        if (utils.isJs(filename)) {
          fs.readFile(filepath, 'utf8', function (err, content) {
            if (err) {
              return console.error(err.stack);
            }
            console.log('%s has %d lines', filepath, content.split('\n').length);
          });
        }
      });
    });
  });
}

count(utils.getDir());
