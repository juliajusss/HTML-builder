const fs = require('fs');
const path = require('path');

const projectDir = path.join(__dirname, 'project-dist');
const templateFile = path.join(__dirname, 'template.html');
const indexFile = path.join(__dirname, 'project-dist/index.html');
const stylesDir = path.join(__dirname, 'styles');
const stylesFile = path.join(__dirname, 'project-dist/style.css');
const assetsDir = path.join(__dirname, 'assets');
const newAssetsDir = path.join(__dirname, 'project-dist/assets');
const componentsDir = path.join(__dirname, 'components');

fs.mkdir(projectDir, {recursive: true}, (err) => {
  if(err) throw err;
});

//create HTML file, replace tags 

fs.copyFile(templateFile, indexFile, (err) => {
  if (err) throw err;
});

let componentsArray = [];

fs.readdir(componentsDir, (err, files) => {
  if (err) throw err;

  files.forEach(file => {
    let componentFile = path.join(componentsDir, file);
      
    fs.stat(componentFile, (err, stats) => {
      if (err) throw err;

      if (stats.isFile()) {
        const extname = path.extname(componentFile);
        const basename = path.basename(componentFile, extname);
        if (extname.substring(1) === 'html') {
          fs.readFile(componentFile, 'utf8', (err, data) => {
            if (err) throw err;
            componentsArray.push({name: basename, data: data});
            fs.readFile(indexFile, 'utf8', (err, indexData) => {
              if (err) throw err;
              if (componentsArray.length > 0) {
                for(let i = 0; i < componentsArray.length; i++) {
                      
                  indexData = indexData.replace(`{{${componentsArray[i].name}}}`, componentsArray[i].data);
                }
                fs.writeFile(indexFile, indexData, 'utf8', (err) => {
                  if (err) throw err;
                });
              }
            });
          });
        }
      }
    });
  });
});      

//merge styles 

fs.readdir(stylesDir, (err, files) => {
  if (err) throw err;
  files.forEach(file => {
      
    let cssFile = path.join(stylesDir, file);
      
    fs.stat(cssFile, (err, stats) => {
      if (err) throw err;
        
      if (stats.isFile() && path.extname(cssFile) === '.css') {
          
        fs.readFile(cssFile, 'utf8', (err, data) => {
          if (err) throw err;
            
          fs.appendFile(stylesFile, data, (err) => {
            if (err) throw err;
          });
        });
      }
    });
  });
});

//copy assets folder 

fs.cp(assetsDir, newAssetsDir, {recursive: true}, (err) => {
  if (err) throw err;
});
