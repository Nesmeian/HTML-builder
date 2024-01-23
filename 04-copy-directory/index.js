const fs = require('fs').promises;
const path = require('path');
const pathName = path.join(__dirname, 'files');
const pathCopy = path.join(__dirname, 'files-copy');

function copyDir() {
  return fs
    .rm(pathCopy, { recursive: true, force: true })
    .then(() => fs.mkdir(pathCopy, { recursive: true }))
    .then(() => fs.readdir(pathName, { withFileTypes: true }))
    .then((files) => {
      for (let e of files) {
        const pathFile = path.join(pathName, e.name);
        const pathFileCopy = path.join(pathCopy, e.name);
        fs.copyFile(pathFile, pathFileCopy);
      }
    });
}

copyDir();
