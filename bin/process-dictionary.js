import fs from 'fs';

const file = fs.readFileSync('dictionary.txt').toString();

const lines = file.split("\n");
const linesFixed = lines.map((line) => `"${line}",`);
const textFixed = linesFixed.join("\n");

fs.writeFile('dictionary.ts', textFixed, (error) => {
  console.log(error);
});