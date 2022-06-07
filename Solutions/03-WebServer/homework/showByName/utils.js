var fs  = require('fs');

function PromisifiedReadFile(filename) {
  return new Promise(function(resolve, reject) {
    fs.readFile(filename, function(err, data) {
      if (err) return reject(err);
      resolve([filename, data]);
    });
  });
};

function PromisifiedReadDir(dir) {
  return new Promise(function(resolve, reject) {
    fs.readdir(dir, function (err, files) {
      if (err) return reject(err);
      resolve(files);
    });
  });
}

module.exports = {
  PromisifiedReadFile,
  PromisifiedReadDir
}
