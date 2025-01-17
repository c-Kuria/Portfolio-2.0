import fs from 'fs';
import path from 'path';

const directoryPath = path.join(process.cwd(), 'src'); // Adjust the path to your source directory

const replaceWordInFile = (filePath) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading file ${filePath}:`, err);
      return;
    }
    const result = data.replace(/Ekizr/g, 'c-Kuria');
    fs.writeFile(filePath, result, 'utf8', (err) => {
      if (err) {
        console.error(`Error writing file ${filePath}:`, err);
      } else {
        console.log(`Replaced "Ekizr" with "c-Kuria" in ${filePath}`);
      }
    });
  });
};

const traverseDirectory = (dir) => {
  fs.readdir(dir, (err, files) => {
    if (err) {
      console.error(`Error reading directory ${dir}:`, err);
      return;
    }
    files.forEach((file) => {
      const filePath = path.join(dir, file);
      fs.stat(filePath, (err, stat) => {
        if (err) {
          console.error(`Error getting stats for file ${filePath}:`, err);
          return;
        }
        if (stat.isDirectory()) {
          traverseDirectory(filePath);
        } else if (filePath.endsWith('.jsx') || filePath.endsWith('.js') || filePath.endsWith('.md')) {
          replaceWordInFile(filePath);
        }
      });
    });
  });
};

traverseDirectory(directoryPath);
