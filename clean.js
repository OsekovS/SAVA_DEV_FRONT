var fs = require('fs');
var copydir = require('copy-dir');
 


function deleteFolderRecursive(path) {
  if (fs.existsSync(path) && fs.lstatSync(path).isDirectory()) {
    fs.readdirSync(path).forEach(function(file, index){
      var curPath = path + "/" + file;

      if (fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });

    console.log('Deleting directory "${path}"...');
    fs.rmdirSync(path);
  }
};

console.log("Save php...");
copydir.sync('../html/php', '../php', {
  utimes: true,  // keep add time and modify time
  mode: true,    // keep file mode
  cover: true    // cover file when exists, default is true
});
console.log("Successfully save php");
// console.log("Save LicenceGen...");
// copydir.sync('../html/LicenceGen', '../LicenceGen', {
//   utimes: true,  // keep add time and modify time
//   mode: true,    // keep file mode
//   cover: true    // cover file when exists, default is true
// });
console.log("Successfully save LicenceGen");

copydir.sync('../html/sh', '../sh', {
  utimes: true,  // keep add time and modify time
  mode: true,    // keep file mode
  cover: true    // cover file when exists, default is true
});
console.log("Successfully save  sh...");


console.log("Save lic...");
copydir.sync('../html/lic', '../lic', {
  utimes: true,  // keep add time and modify time
  mode: true,    // keep file mode
  cover: true    // cover file when exists, default is true
});
console.log("Successfully save lic");
console.log("Cleaning working tree...");

deleteFolderRecursive("../html");

console.log("Successfully cleaned working tree!");