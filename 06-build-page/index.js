const fs = require('fs');
const path = require('path');
const components = path.join(__dirname, 'components');
const styles = path.join(__dirname, 'styles');
const createDir = path.join(__dirname, 'project-dist');
const templateHtml = path.join(__dirname, 'template.html');

console.log(templateHtml);
function createHtml() {
  fs.mkdir(createDir, { recursive: true }, (err) => {
    if (err) {
      console.log(err);
    }
  });
  fs.readFile(templateHtml, (err, data) => {
    if (err) {
      console.log(err);
    }
    dataContent = data.toString();
    fs.readdir(components, (err, files) => {
      if (err) {
        console.log(err);
      }
      files = files.filter((e) => path.extname(e) === '.html');
    });
  });
}

createHtml();
