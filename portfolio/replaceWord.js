import fs from 'fs';
import path from 'path';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const directoryPath = path.join(process.cwd(), 'src'); // Adjust the path to your source directory

const replaceWordInFile = (filePath, wordToReplace, replacementWord) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading file ${filePath}:`, err);
      return;
    }
    const result = data.replace(new RegExp(wordToReplace, 'g'), replacementWord);
    fs.writeFile(filePath, result, 'utf8', (err) => {
      if (err) {
        console.error(`Error writing file ${filePath}:`, err);
      } else {
        console.log(`Replaced "${wordToReplace}" with "${replacementWord}" in ${filePath}`);
      }
    });
  });
};

const traverseDirectory = (dir, wordToReplace, replacementWord) => {
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
          traverseDirectory(filePath, wordToReplace, replacementWord);
        } else if (filePath.endsWith('.jsx') || filePath.endsWith('.js') || filePath.endsWith('.md')) {
          replaceWordInFile(filePath, wordToReplace, replacementWord);
        }
      });
    });
  });
};

// Prompt the user for input
rl.question('Enter the word to replace: ', (wordToReplace) => {
  rl.question('Enter the replacement word: ', (replacementWord) => {
    traverseDirectory(directoryPath, wordToReplace, replacementWord);
    rl.close();
  });
});
