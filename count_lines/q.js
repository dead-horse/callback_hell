
var fs = require('fs');
var path = require('path');
var Q = require('q');
var utils = require('./utils');

var readdir = Q.denodeify(fs.readdir);
var stat = Q.denodeify(fs.stat);
var readFile = Q.denodeify(fs.readFile);

function count(dirname) {
  var files;
  readdir(dirname)
    .then(statFiles)
    .then(checkFiles)
    .then(countFiles)
    .fail(console.error);

  function statFiles(f) {
    files = f;
    return Q.all(files.map(function (file) {
      var pathname = path.join(dirname, file);
      return stat(pathname);
    }));
  }

  function checkFiles(stats) {
    var filepaths = [];
    var countFiles = [];
    stats.forEach(function (s, index) {
      var filename = files[index];
      var filepath = path.join(dirname, filename);
      if (!s.isFile() && utils.validFolder(filename)) {
        return count(filepath);
      }
      if (utils.isJs(filename)) {
        filepaths.push(filepath);
        countFiles.push(readFile(filepath, 'utf8'));
      }
    });
    countFiles.unshift(filepaths); // pass the filepaths
    return Q.all(countFiles);
  }

  function countFiles(contents) {
    var filepaths = contents.shift();
    for (var i = 0; i < filepaths.length; i++) {
      console.log('%s has %d lines', filepaths[i],
          contents[i].split('\n').length);
    }
  }
}

count(utils.getDir());
