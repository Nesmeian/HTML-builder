const path = require('path');
const fs = require('fs').promises;
const pathName = path.join(__dirname, 'styles');
const pathCopy = path.join(__dirname, 'project-dist');
const pathBundle = path.join(pathCopy, 'bundle.css');

async function merge() {
  try {
    await fs.mkdir(pathCopy, { recursive: true });
    const files = await fs.readdir(pathName);
    const cssFiles = files.filter((file) => path.extname(file) === '.css');
    let styles = '';
    for (const file of cssFiles) {
      const filePath = path.join(pathName, file);
      const fileStyles = await fs.readFile(filePath, 'utf-8');
      styles += fileStyles;
    }
    fs.writeFile(pathBundle, styles, (err) => {
      if (err) {
        console.log(err);
      }
    });
  } catch (err) {
    console.error(err);
  }
}

merge();
