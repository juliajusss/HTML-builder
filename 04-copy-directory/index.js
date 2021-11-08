const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'files');
const newDir = path.join(__dirname, 'files-copy');


fs.mkdir(newDir, {recursive: true}, (err) => {
  if(err) throw err;
});

fs.readdir(newDir, (err, files) => {
  if (err) throw err;
  files.forEach(file => {
    fs.unlink((path.join(newDir, file)), (err) => {
      if (err) throw err;
    });
  });
});

fs.readdir(dir, (err, files) => {
  if (err) throw err;
  files.forEach(file => {
    fs.copyFile((path.join(dir, file)), (path.join(newDir, file)), (err) => {
      if (err) throw err;
    });
  });
});


