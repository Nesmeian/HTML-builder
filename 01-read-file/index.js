const fs = require('fs');
const path = require('path');
const pathName = path.join(__dirname, 'text.txt');
const readableStream = fs.createReadStream(pathName);
readableStream.on('data', (chunk) => console.log(chunk.toString()));
