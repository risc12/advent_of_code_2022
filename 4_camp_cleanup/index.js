const { test } = require('../test');

function readFileContent(fileContent) {
  return fileContent
    .split('\n')
    .filter(l => l)
    .map(l => l.split(',')
               .map(range => range.split('-')
                                 .map(id => parseInt(id))
                   )
        );
}

function partOne(fileContent) {
  const pairs = readFileContent(fileContent);

  let amountOfPairsWithFullyContainedRanges = 0;

  // Input is 2 arrays both with a start- and end-ID
  const fullyContains = ([as, ae], [bs, be]) => (as >= bs) && (ae <= be);

  pairs.forEach(pair => {
    const [rangeA, rangeB] = pair;

    if (fullyContains(rangeA, rangeB) || fullyContains(rangeB, rangeA))
      amountOfPairsWithFullyContainedRanges++
  })

  return amountOfPairsWithFullyContainedRanges;
}

function partTwo(fileContent) {
  const pairs = readFileContent(fileContent);

  let amountOfPairsWithAnyOverlap = 0;

  // Input is 2 arrays both with a start- and end-ID
  // Returns true when either the beginning of b is in the range, or the end of b is in the range
  const overlaps = ([as, ae], [bs, be]) => (as <= bs && ae >= bs) || (as <= be && ae >= be);

  pairs.forEach(pair => {
    const [rangeA, rangeB] = pair;

    if (overlaps(rangeA, rangeB) || overlaps(rangeB, rangeA)) {
      amountOfPairsWithAnyOverlap++
    }
  })

  return amountOfPairsWithAnyOverlap;
}

test([
  [partOne, 2, 560],
  [partTwo, 4, 839],
], { skipRealCases: false });
