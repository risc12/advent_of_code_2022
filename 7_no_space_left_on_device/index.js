const { test } = require('../test');

function readFileContent(fileContent) {
  return fileContent.split('\n').filter(l => l);
}

class File {
  constructor(name, parent, size) {
    this.name = name;
    this.parent = parent;
    this.size = parseInt(size);
  }
}

class Directory {
  constructor(name, parent) {
    this.name = name;
    this.parent = parent;

    this.children = [];
    this.childrenByName = {};
  }

  get path() {
    let path = [this];
    let parent = this.parent;

    if (parent) {
      path.push(parent);
    }

    while(parent && parent.parent) {
      parent = parent.parent;
      path.push(parent);
    }

    return path.reverse().map(p => p.name || '').join('/') || '/';
  }

  get size() {
    return this.children.reduce((acc, el) => acc + el.size, 0);
  }

  addChild(type, name, size) {
    let child;

    if (type === 'directory') child = new Directory(name, this);
    if (type === 'file') child = new File(name, this, size);

    this.childrenByName[name] = child
    this.children.push(child);
  }
}

class Terminal {
  constructor() {
    this.root = new Directory('', undefined)

    this.cursor = this.root;
  }

  get directoryString() {
    return this.cursor.path;
  }

  cd(directory) {
    // console.log(`${this.directoryString} $ cd ${directory}`)

    if (directory === '/') return;

    if (directory === '..') {
      this.cursor = this.cursor.parent;
    } else {
      this.cursor = this.cursor.childrenByName[directory];
    }
  }

  ls() {
    // console.log(`${this.directoryString} $ ls`)
  }

  appendOutput(output) {
    const [sizeOrDir, name] = output.split(' ');

    const isDir = sizeOrDir === 'dir';
    const size = !isDir && sizeOrDir;

    // console.log(isDir ? '📂 ' : '📄 ' , name, size || '');

    this.cursor.addChild(isDir ? 'directory' : 'file', name, size);
  }
}

function partOne(fileContent) {
  const input = readFileContent(fileContent);

  const terminal = new Terminal();

  for(let i = 0; i < input.length; i++) {
    const currentLine = input[i];

    if (currentLine.startsWith('$')) {
      const [, command, data] = currentLine.split(' ');

      if (command === 'cd') terminal.cd(data);
      if (command === 'ls') terminal.ls();
    } else {
      terminal.appendOutput(currentLine);
    }
  }

  // console.dir(terminal.root, { depth: null })

  const TRESHOLD = 100_000;

  const dirsBelowTreshold = [];

  function collectDirsBelowThousand(dir) {
    dir.children.forEach(child => {
      if(child instanceof Directory) {
        if(child.size < TRESHOLD) {
          dirsBelowTreshold.push(child);
        }

        collectDirsBelowThousand(child);
      }
    })
  }

  collectDirsBelowThousand(terminal.root);

  // console.log(dirsBelowTreshold);

  return dirsBelowTreshold.reduce((acc, el) => acc + el.size, 0);
}

function partTwo(fileContent) {
  const input = readFileContent(fileContent);

  return 0;
}


test([
  [partOne, 95437, 1444896],
  // [partTwo],
], { skipRealCases: false });
