const fs = require('fs');
const path = require('path');
const pathName = path.join(__dirname, 'text.txt');
const { stdout, stdin } = process;
const writeS = fs.createWriteStream(pathName, 'utf-8');
stdout.write('Gretings Friend\n');

stdin.on('data', (data) => {
  if (data.toString().trim() === 'exit') {
    process.exit();
  } else {
    writeS.write(data, 'utf-8');
  }
});
process.on('SIGINT', () => {
  process.exit();
});

process.on('exit', () => {
  console.log('Bye friend.');
});
