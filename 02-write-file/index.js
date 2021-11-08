const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '/text.txt');

let newFile = fs.createWriteStream(filePath);

const {stdin, stdout} = process;

stdout.write('Enter your text: \n');
stdin.on('data', data => {
  let text = data.toString();
  if (text.trim() == 'exit') {
    process.exit();
  }
  newFile.write(text)
  ;});

process.on('exit', () => stdout.write('\nThank you for your text! Goodbye!\n'));
process.on('SIGINT', () => process.exit());


