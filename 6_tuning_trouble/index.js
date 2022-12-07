const { test } = require('../test');

function readFileContent(fileContent) {
  return fileContent.split('')
}

function findFirstDistinctCharacters(amtOfCharacters, characters) {
  const buffer = [];

  for (let i = 0; i < characters.length; i++) {
    buffer.push(characters[i]);

    if(buffer.length < amtOfCharacters) continue;

    if ((new Set(buffer)).size === amtOfCharacters) {
      return i + 1
    }

    buffer.shift();
  }
}

function partOne(fileContent) {
  const input = readFileContent(fileContent);

  return findFirstDistinctCharacters(4, input);
}

function partTwo(fileContent) {
  const input = readFileContent(fileContent);

  return findFirstDistinctCharacters(14, input);
}


test([
  [partOne, 7, 1034, [5, 6, 10, 11]],
  [partTwo, 19, 2472, [23, 23, 29, 26]],
], { skipRealCases: false });
