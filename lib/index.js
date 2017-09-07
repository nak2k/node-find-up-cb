const { dirname, resolve } = require('path');
const { access } = require('fs');
const locatePath = require('locate-path-cb');

module.exports = (files, options, callback) => {
  if (!callback) {
    [options, callback] = [{}, options];
  }

  let {
    cwd,
  } = options;

  if (cwd === undefined) {
    cwd = process.cwd();
  } else {
    cwd = resolve(cwd);
  }

  files = [].concat(files);

  find(cwd, files, callback);
};

function find(cwd, files, callback) {
  locatePath(files, { cwd }, (err, path) => {
    if (!err) {
      return callback(null, resolve(cwd, path));
    }

    if (cwd === '/') {
      return callback(err, null);
    }

    find(dirname(cwd), files, callback);
  });
}
