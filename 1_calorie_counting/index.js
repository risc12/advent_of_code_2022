const { test } = require('../test');

const readFileContent = function (fileContent) {
  return fileContent.split('\n\n').map(s => s.split('\n').filter(i => i).map(i => parseInt(i)));
}

const sum = arr => arr.reduce((c, e) => c + e, 0)

const getSums = (input) => {
  return new Float64Array(input
    .map(elf => sum(elf))
  )
}

function partOne(fileContent) {
  const input = readFileContent(fileContent);
  return getSums(input).sort().reverse()[0]
}

function partTwo(fileContent) {
  const input = readFileContent(fileContent);
  return sum(getSums(input).sort().reverse().slice(0, 3));
}

test([
  [partOne, 24000, 69795],
  [partTwo, 45000, 208437 ]
])
