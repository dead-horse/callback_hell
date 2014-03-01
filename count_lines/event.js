
var fs = require('fs');
var path = require('path');
var Eventproxy = require('eventproxy');

var dirname = path.resolve(process.argv[2] || __dirname);

function countJs(dirname) {
  var ep = Eventproxy.create();
  ep.fail(function (err) {
    console.error(err.stack);
  });

  fs.readdir(dirname, ep.doneLater('files'));

  ep.once('files', function (files) {
    files.forEach(function (filename) {
      var filepath = path.join(dirname, filename);
      fs.stat(filepath, ep.doneLater(function (stat) {
        ep.emit('stat', {
          stat: stat,
          filepath: filepath,
          filename: filename
        });
      }));
    });
  });

  ep.on('stat', function (s) {
    var stat = s.stat;
    var filepath = s.filepath;
    var filename = s.filename;
    if (!stat.isFile() && filename !== 'node_modules' && filename[0] !== '.') {
      return countJs(filepath);
    }
    if (path.extname(filename) === '.js') {
      fs.readFile(filepath, 'utf8', ep.doneLater(function (content) {
        ep.emit('content', {
          filepath: filepath,
          content: content
        });
      }));
    }
  });

  ep.on('content', function (c) {
    console.log('%s have %d lines', c.filepath, c.content.split('\n').length);
  });
}

countJs(dirname);
