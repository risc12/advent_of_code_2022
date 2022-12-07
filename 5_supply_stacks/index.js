const { test } = require('../test');

function readFileContent(fileContent) {
  const sections = fileContent
    .split('\n\n')

  const stacks = [];

  sections[0].split('\n').slice(0, -1).forEach(l => {
    const chars = l.split('');

    for(let i = 0; i < chars.length; i = i + 4) {
      const crate = chars.slice(i, i + 4)[1];
      const stackNumber = (i / 4) + 1;

      if (!Array.isArray(stacks[stackNumber])) {
        stacks[stackNumber] = [];
      }

      if (crate !=' ')
        stacks[stackNumber].unshift(crate)
    }
  });

  const procedures = sections[1].split('\n').filter(l => l).map(l => {
    const r = /move ([0-9]+) from ([0-9]+) to ([0-9]+)/
    const [, q , from, to] = l.match(r);

    return { q: parseInt(q), from: parseInt(from), to: parseInt(to)};
  })

  return { stacks, procedures };
}

function partOne(fileContent) {
  const {stacks, procedures} = readFileContent(fileContent);

  procedures.forEach(({q, from, to}) => {
    // console.log({stacks, q, from ,to});

    for(let i = 0; i < q; i++) {
      stacks[to].push(stacks[from].pop());
    }
  })

  return stacks.map(s => Array.isArray(s) ? s.pop() : '').join('');
}

function partTwo(fileContent) {
  const {stacks, procedures} = readFileContent(fileContent);

  procedures.forEach(({q, from, to}) => {
    const items = stacks[from].splice(-q, q);
    stacks[to].push(...items);
  })

  return stacks.map(s => Array.isArray(s) ? s.pop() : '').join('');
}


test([
  [partOne, 'CMZ', 'SBPQRSCDF'],
  [partTwo, 'MCD', 'RGLVRCQSB'],
], { skipRealCases: false });
