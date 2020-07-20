var copydir = require('copy-dir');
var fs = require('fs');

var dir1 = '../html';
var dir2 = '../html/php';
var dir3 = '../html/lic';
// var dir4 = '../html/LicenceGen';
var dir5 = '../html/sh';

if (!fs.existsSync(dir2)){
    fs.mkdirSync(dir1);
    fs.mkdirSync(dir2);
    // fs.mkdirSync(dir3);
    copydir.sync('./build', dir1, {
      utimes: true,  // keep add time and modify time
      mode: true,    // keep file mode
      cover: true    // cover file when exists, default is true
    });
    copydir.sync('../php', dir2, {
      utimes: true,  // keep add time and modify time
      mode: true,    // keep file mode
      cover: true    // cover file when exists, default is true
    });
    copydir.sync('../lic', dir3, {
      utimes: true,  // keep add time and modify time
      mode: true,    // keep file mode
      cover: true    // cover file when exists, default is true
    });
    // copydir.sync('../LicenceGen', dir4, {
    //   utimes: true,  // keep add time and modify time
    //   mode: true,    // keep file mode
    //   cover: true    // cover file when exists, default is true
    // });
    copydir.sync('../sh', dir5, {
      utimes: true,  // keep add time and modify time
      mode: true,    // keep file mode
      cover: true    // cover file when exists, default is true
    });
}




