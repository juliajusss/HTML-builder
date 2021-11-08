const fs = require('fs');
const path = require('path');

const stylesDir = path.join(__dirname, 'styles');
const bundlePath = path.join(__dirname, 'project-dist/bundle.css');

fs.readdir(stylesDir, (err, files) => {
  if (err) throw err;
  files.forEach(file => {
    
    let cssFile = path.join(stylesDir, file);
    
    fs.stat(cssFile, (err, stats) => {
      if (err) throw err;
      
      if (stats.isFile() && path.extname(cssFile) === '.css') {
        
        fs.readFile(cssFile, 'utf8', (err, data) => {
          if (err) throw err;
          
          fs.appendFile(bundlePath, data, (err) => {
            if (err) throw err;
          });
        });
      }
    });
  });
});
