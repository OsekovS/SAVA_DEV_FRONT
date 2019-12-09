var copydir = require('copy-dir');
var fs = require('fs');

var dir1 = '../html/php';
var dir2 = '../html';

if (!fs.existsSync(dir2)){
    fs.mkdirSync(dir2);
    fs.mkdirSync(dir1);
    copydir.sync('../php', dir1, {
      utimes: true,  // keep add time and modify time
      mode: true,    // keep file mode
      cover: true    // cover file when exists, default is true
    });
    copydir.sync('./build', dir2, {
      utimes: true,  // keep add time and modify time
      mode: true,    // keep file mode
      cover: true    // cover file when exists, default is true
    });
}




