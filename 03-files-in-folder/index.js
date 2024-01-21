const path = require('path');
const fs = require('fs');
const { stdout } = process;
const pathName = path.join(__dirname, 'secret-folder');
fs.readdir(pathName, { withFileTypes: true }, (err, files) => {
  files.forEach((e) => {
    if (e.isFile()) {
      const pathToFile = path.join(pathName, e.name);
      const name = path.parse(pathToFile).name;
      const ext = path.parse(pathToFile).ext;
      let result = `${name} ${ext} `;
      fs.stat(pathToFile, (err, stats) => {
        stdout.write(`${result} ${stats.size / 1000}\n `);
      });
    }
  });
});
