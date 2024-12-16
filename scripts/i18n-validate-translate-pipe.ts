import fs from 'fs';
import { glob } from 'glob';

const errors = [];

function isPipeIgnored(lines: string[], index: number): boolean {
  if (index === 0) {
    return false;
  }

  while (index > 0) {
    if (lines[index].includes('<')) {
      return lines[index - 1]?.includes('ignore-translate-pipe-error');
    }
    index -= 1;
  }

  return false;
}

function validateFile(filePath: string) {
  const data = fs.readFileSync(filePath, 'utf-8');
  if (!data.includes('| translate')) {
    return;
  }

  let isFileValid = true;
  const lines = data.split('\n');

  lines.forEach((line, index) => {
    if (line.includes('| translate') && !isPipeIgnored(lines, index)) {
      isFileValid = false;
    }
  });

  if (!isFileValid) {
    console.log(filePath);
    errors.push(filePath);
  }
}

const getDirectories = (src: string) => {
  glob(`${src}/**/*.html`).then((paths) => {
    paths.forEach(filePath => validateFile(filePath));
    if (errors.length) {
      throw new Error('There are files using translate pipe');
    }
  });
};

getDirectories('./src');
