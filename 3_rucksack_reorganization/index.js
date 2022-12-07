const { test } = require('../test');

function readFileContent(fileContent) {
  // Every line is a rucksack, every character is an item in the rucksack.
  return fileContent.split('\n').map(rucksack => rucksack.split('')).filter(r => r.length);
}

function getPriority(character) {
  const charCode = character.charCodeAt(0);

  if(charCode >= 97 && charCode <= 122) {
    return charCode - 96;
  }

  if(charCode >= 65 && charCode <= 90) {
    return charCode - 64 + 26; // Offset to get to one, but then offset to get to 27
  }
}
// To validate that stuff:
console.assert(
  'abcdefghijklmnopqrstuvwxyz'.split('').map(c => getPriority(c)).join('') === '1234567891011121314151617181920212223242526', "GET PRIORITY IS BROKEN"
);
console.assert(
  'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(c => getPriority(c)).join('') === '2728293031323334353637383940414243444546474849505152', "GET PRIORITY IS BROKEN"
);

function findOverlap(arr1, arr2, arr3) {
  if (arr3) return findOverlap(findOverlap(arr1, arr2), arr3);

  const overlap = new Set();

  arr1.forEach(item => {
    if (arr2.some(i => i === item)) overlap.add(item);
  });

  return [...overlap];
}

function splitInHalf(arr) {
  return [arr.slice(0, Math.ceil(arr.length / 2)), arr.slice(Math.ceil(arr.length / 2))];
}

function partOne(fileContent) {
  const rucksacks = readFileContent(fileContent);

  const overlapInCompartments = rucksacks.flatMap(rucksack => {
    const [compartmentOne, compartmentTwo ] = splitInHalf(rucksack);

    return findOverlap(compartmentOne, compartmentTwo);
  })

  return overlapInCompartments.reduce((acc, item) => acc + getPriority(item), 0)
}

function partTwo(fileContent) {
  const rucksacks = readFileContent(fileContent);

  // Create groups of three rucksacks
  const groups = rucksacks.reduce((acc, rucksack) => {
    const lastGroup = acc[acc.length - 1];

    if (lastGroup.length < 3) {
      lastGroup.push(rucksack);
    } else {
      acc.push([rucksack]);
    }

    return acc;
  }, [[]])

  const overlapInGroups = groups.flatMap(group => findOverlap(...group));

  return overlapInGroups.reduce((acc, badge) => acc + getPriority(badge), 0);
}

test([
  [partOne, 157, 7903],
  [partTwo, 70, 2548]
], { skipRealCases: false });
