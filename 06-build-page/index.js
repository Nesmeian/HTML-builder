const fs = require('fs').promises;
const path = require('path');

const projectLocate = path.join(__dirname, 'project-dist');
const projectHtml = path.join(projectLocate, 'index.html');
const components = path.join(__dirname, 'components');
const styleFile = path.join(projectLocate, 'style.css');
const templatePath = path.join(__dirname, 'template.html');
const styles = path.join(__dirname, 'styles');
const mainAssets = path.join(projectLocate, 'assets');
const assets = path.join(__dirname, 'assets');
function makeDir() {
  fs.mkdir(projectLocate, { recursive: true }, (err) => {
    if (err) {
      console.log(err);
    }
  });
}
async function makeHtml() {
  const templateContent = await fs.readFile(templatePath, 'utf-8');
  const tagRegex = /{{([^}]+)}}/g;
  const tags = templateContent.match(tagRegex) || [];

  let modifiedTemplate = templateContent;

  for (const tag of tags) {
    const tagName = tag.slice(2, -2);
    const componentPath = path.join(components, `${tagName}.html`);

    const componentContent = await fs.readFile(componentPath, 'utf-8');
    modifiedTemplate = modifiedTemplate.replace(tag, componentContent);
  }
  fs.writeFile(projectHtml, modifiedTemplate);
}

async function mergeStyles() {
  const files = await fs.readdir(styles);
  for (const style of files) {
    const pathToStyle = path.join(styles, style);
    const styleContnet = await fs.readFile(pathToStyle);
    await fs.appendFile(styleFile, styleContnet);
  }
}

async function copyAssets(mk1, mk2) {
  const topLevel = await fs.readdir(mk1, { withFileTypes: true });
  await fs.mkdir(mk2, { recursive: true });
  for (let elem of topLevel) {
    const path1 = path.join(mk1, elem.name);
    const path2 = path.join(mk2, elem.name);
    if (elem.isDirectory()) {
      copyAssets(path1, path2);
    } else {
      fs.copyFile(path1, path2);
    }
  }
}

async function makePage() {
  makeDir();
  makeHtml();
  mergeStyles();
  copyAssets(assets, mainAssets);
}

makePage();
