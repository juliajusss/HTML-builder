const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'secret-folder');

fs.readdir(filePath, (err, files) => {
  if(err) {
    throw err;
  } else {
    files.forEach(file => {
      let f = path.join(filePath, file);
      fs.stat(f, (err, stats) => {
        if (stats.isFile()) {
          console.log(`${path.basename(f, path.extname(f))} - ${path.extname(f).substring(1)} - ${stats['size']/1000}kb`);
        } 
      });
    });
  }
});
