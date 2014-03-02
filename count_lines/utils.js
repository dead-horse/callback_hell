
var path = require('path');

exports.isJs = function (filename) {
  return path.extname(filename) === '.js';
};

exports.validFolder = function (filename) {
  return filename !== 'node_modules' && filename[0] !== '.';
};

exports.getDir = function () {
  return path.resolve(process.argv[2] || __dirname);
};
