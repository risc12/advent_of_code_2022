const { test } = require('../test');

function readFileContent(fileContent) {
  return fileContent.split('\n').map(s => s.split(' ')).filter(e => e.length === 2);
}

const ROCK = 'ROCK';
const PAPER = 'PAPER';
const SCISSORS = 'SCISSORS';

const WIN = 'WIN';
const DRAW = 'DRAW';
const LOSE = 'LOSE';

const COMBINATIONS = [
  { action: ROCK,     reaction: ROCK,     outcome: DRAW },
  { action: ROCK,     reaction: PAPER,    outcome: WIN  },
  { action: ROCK,     reaction: SCISSORS, outcome: LOSE },
  { action: PAPER,    reaction: ROCK,     outcome: LOSE },
  { action: PAPER,    reaction: PAPER,    outcome: DRAW },
  { action: PAPER,    reaction: SCISSORS, outcome: WIN  },
  { action: SCISSORS, reaction: ROCK,     outcome: WIN  },
  { action: SCISSORS, reaction: PAPER,    outcome: LOSE },
  { action: SCISSORS, reaction: SCISSORS, outcome: DRAW },
];

const SCORES = {
  ROCK: 1,
  PAPER: 2,
  SCISSORS: 3,
  WIN: 6,
  DRAW: 3,
  LOSE: 0,
}

const getScore = combination => SCORES[combination.reaction] + SCORES[combination.outcome];

function partOne(fileContent) {
  const input = readFileContent(fileContent);

  const MEANING = {
    A: 'ROCK',
    B: 'PAPER',
    C: 'SCISSORS',
    X: 'ROCK',
    Y: 'PAPER',
    Z: 'SCISSORS',
  }

  const steps = input
    .map(([a, r]) => [MEANING[a], MEANING[r]])
    .map(([action, reaction]) => getScore(COMBINATIONS.find(combination => combination.action === action && combination.reaction === reaction)));

  console.log(steps);

  const sum = steps.reduce((acc, el) => acc + el, 0);

  return sum
}

function partTwo(fileContent) {
  const input = readFileContent(fileContent);

  const MEANING = {
    A: 'ROCK',
    B: 'PAPER',
    C: 'SCISSORS',
    X: 'LOSE',
    Y: 'DRAW',
    Z: 'WIN',
  }

  const steps = input
    .map(([a, r]) => [MEANING[a], MEANING[r]])
    .map(([action, outcome]) => getScore(COMBINATIONS.find(combination => combination.action === action && combination.outcome === outcome)));

  console.log(steps);

  const sum = steps.reduce((acc, el) => acc + el, 0);

  return sum
}

test([
  [partOne, 15, 13009],
  [partTwo, 12, 10398],
])

