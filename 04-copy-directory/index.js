const fs = require('fs');
const path = require('path');
const pathName = path.join(__dirname, 'files');
const pathCopy = path.join(__dirname, 'files-copy');
async function copyDirrection() {
  try {
    await fs.mkdir(pathCopy, { recursive: true }, (err) => {
      if (err) {
        console.log(err);
      }
    });
    await fs.readdir(pathName, (err, files) => {
      files.forEach((e) => {
        const filePath = path.join(pathName, e);
        const copyPath = path.join(pathCopy, e);
        fs.copyFile(filePath, copyPath, (err) => {
          if (err) {
            console.log(err);
          }
        });
      });
    });
  } catch (err) {
    if (err) {
      console.log(err);
    }
  }
}
copyDirrection();
// fs.readdir(pathName, (err, files) => {
//   fs.mkdir(pathCopy, { recursive: true }, (err) => {
//     if (err) {
//       console.log(err);
//       return;
//     }
//     files.forEach((e) => {
//       fs.copyFile(pathCopy, e);
//     });
//   });
// });
