
var fs = require('fs');
var path = require('path');
var step = require('step');
var utils = require('./utils');

function count(dirname) {
  step(
    readdir,
    statFiles,
    checkFiles,
    countFiles
  );

  var files;
  function readdir() {
    fs.readdir(dirname, this);
  }

  function statFiles(err, r) {
    if (err) {
      return console.error(err);
    }

    files = r;
    for (var i = 0; i < files.length; i++) {
      var filename = files[i];
      var filepath = path.join(dirname, filename);
      fs.stat(filepath, this.parallel());
    }
  }

  function checkFiles(err) {
    if (err) {
      return console.error(err);
    }
    var stats = [].slice.apply(arguments);
    stats.shift();
    var jsFiles = [];
    for (var i = 0; i < stats.length; i++) {
      var stat = stats[i];
      var filename = files[i];
      var filepath = path.join(dirname, filename);

      if (!stat.isFile() && utils.validFolder(filename)) {
        count(filepath);
        continue;
      }

      if (utils.isJs(filename)) {
        fs.readFile(filepath, 'utf8', this.parallel());
      }
    }
  }

  function countFiles(err) {
    if (err) {
      return console.error(err);
    }
    var contents = [].slice.apply(arguments);
    contents.shift();  //pop error

    for (var i = 0; i < contents.length; i++) {
      var content = contents[i];
      console.log('%s has %d lines', path.join(dirname, files[i]),
          content.split('\n').length);
    }
  }
}

count(utils.getDir());
