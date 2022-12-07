const fs = require('fs');

const getInput = function (fileName) {
  const fileToRead = fileName || process.argv[2] || './input.txt';
  const fileContent = fs.readFileSync(fileToRead).toString();

  return fileContent;
}

const testCase = (fn, type, expected, skip = false, exampleNumber) => {
  if (skip) return { part: fn.name, type: 'input', expected: 'SKIPPED', actual: 'SKIPPED', match: 'SKIPPED' }

  const input = getInput(`${type === 'example' ? `example${exampleNumber !== undefined ? exampleNumber : ''}_` : ''}input.txt`);

  console.time(`${fn.name} - ${type}`);
  const actual = fn(input);
  console.timeEnd(`${fn.name} - ${type}`);

  const match = expected === actual ? '✅' : '❌'

  return {
    part: fn.name,
    type: type === 'example' ? `example${exampleNumber !== undefined ? exampleNumber : ''}` : 'input',
    expected,
    actual,
    match,
  }
}

const test = (cases, { skipRealCases } = {}) => {
  const results = cases.flatMap(([fn, expectedForExample, expectedForInput, additionalExamples = []]) => [
    testCase(fn, 'example', expectedForExample),
    testCase(fn, 'real', expectedForInput, skipRealCases),
    ...additionalExamples.map((expected, exampleNumber) => testCase(fn, 'example', expected, false, exampleNumber))
  ]);
  

  console.table(results);
}

module.exports = { test };
