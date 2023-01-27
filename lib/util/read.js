const fs = require('fs');
let bufs = [];
module.exports = (f) => {
  return new Promise((resolve) => {
    let stream = fs.createReadStream(f);
    let output = "";
    
    stream.on('data', (chunk) => bufs.push(chunk));
    stream.on('end', () => resolve(Buffer.concat(bufs)));
  });
}
