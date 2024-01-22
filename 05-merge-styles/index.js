const path = require('path');
const fs = require('fs');
const pathName = path.join(__dirname, 'styles');
const pathCopy = path.join(__dirname, 'project-dist');
const pathBundle = path.join(pathCopy, 'bundle.css');
async function merge() {
  try {
    fs.mkdir(pathCopy, { recursive: true }, (err) => {
      if (err) {
        console.log(err);
      }
      fs.readdir(pathName, (err, files) => {
        if (err) {
          console.log(err);
        }
        files.forEach((e) => {
          console.log(e);
        });
      });
    });
  } catch (err) {
    if (err) {
      console.log(err);
    }
  }
}
merge();
