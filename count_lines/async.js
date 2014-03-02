
var fs = require('fs');
var path = require('path');
var async = require('async');
var utils = require('./utils');

function count(dirname) {
  async.waterfall([
    fs.readdir.bind(fs, dirname),
    checkFiles,
    countFiles
  ], console.error);

  function checkFiles(files, cb) {
    var jsFiles = [];
    var filepaths = files.map(function (file) {
      return path.join(dirname, file);
    });

    async.map(filepaths, fs.stat, function (err, stats) {
      if (err) {
        return cb(err);
      }
      var jsFiles = [];

      files.filter(function (filename, i) {
        var filepath = filepaths[i];
        var stat = stats[i];

        if (!stat.isFile() && utils.validFolder(filename)) {
          count(filepath);
          return;
        }
        utils.isJs(filename) && jsFiles.push(filepath);
      });
      cb(null, jsFiles);
    });
  }

  function countFiles(files, cb) {
    async.map(files, fs.readFile, function (err, contents) {
      if (err) {
        return cb(err);
      }
      contents.forEach(function (content, i) {
        console.log('%s has %d lines', files[i],
          content.toString().split('\n').length);
      });
    });
  }
}

count(utils.getDir());
