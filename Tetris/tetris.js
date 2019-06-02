var tetris = document.querySelector('#tetris');
var tData = [];
var cBlock;
var nBlock;
var cTopLeft = [0, 3];
var blocks = [
  {
    name: 's', // square  shaped block
    center: false,
    numCode: 1,
    color: 'red',
    currentShapeIndex: 0,
    shape: [
      [
        [0, 0, 0],
        [0, 1, 1],
        [0, 1, 1],
      ]
    ],
  },
  {
    name: 't', // T shaped block
    center: true,
    numCode: 2,
    color: 'orange',
    currentShapeIndex: 0,
    shape: [
      [
        [0, 0, 0],
        [1, 1, 1],
        [0, 1, 0],
      ],
      [
        [0, 1, 0],
        [1, 1, 0],
        [0, 1, 0],
      ],
      [
        [0, 1, 0],
        [1, 1, 1],
        [0, 0, 0],
      ],
      [
        [0, 1, 0],
        [0, 1, 1],
        [0, 1, 0],
      ],
    ]
  },
  {
    name: 'z', // zigzag shaped block
    center: true,
    numCode: 3,
    color: 'yellow',
    currentShapeIndex: 0,
    shape: [
      [
        [0, 0, 0],
        [1, 1, 0],
        [0, 1, 1],
      ],
      [
        [0, 1, 0],
        [1, 1, 0],
        [1, 0, 0],
      ],
      [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0],
      ],
      [
        [0, 0, 1],
        [0, 1, 1],
        [0, 1, 0],
      ],
    ]
  },
  {
    name: 'r_z', // riversed zigzag shaped block
    center: true,
    numCode: 4,
    color: 'green',
    startRow: 1,
    currentShapeIndex: 0,
    shape: [
      [
        [0, 0, 0],
        [0, 1, 1],
        [1, 1, 0],
      ],
      [
        [1, 0, 0],
        [1, 1, 0],
        [0, 1, 0],
      ],
      [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0],
      ],
      [
        [0, 1, 0],
        [0, 1, 1],
        [0, 0, 1],
      ],
    ]
  },
  {
    name: 'l', // L shaped block
    center: true,
    numCode: 5,
    color: 'blue',
    currentShapeIndex: 0,
    shape: [
      [
        [0, 0, 0],
        [1, 1, 1],
        [1, 0, 0],
      ],
      [
        [1, 1, 0],
        [0, 1, 0],
        [0, 1, 0],
      ],
      [
        [0, 0, 1],
        [1, 1, 1],
        [0, 0, 0],
      ],
      [
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 1],
      ],
    ]
  },
  {
    name: 'r_l', // reversed L shaed block
    center: true,
    numCode: 6,
    color: 'navy',
    currentShapeIndex: 0,
    shape: [
      [
        [0, 0, 0],
        [1, 1, 1],
        [0, 0, 1],
      ],
      [
        [0, 1, 0],
        [0, 1, 0],
        [1, 1, 0],
      ],
      [
        [1, 0, 0],
        [1, 1, 1],
        [0, 0, 0],
      ],
      [
        [0, 1, 1],
        [0, 1, 0],
        [0, 1, 0],
      ],
    ]
  },
  {
    name: 'd', // 1 shaped block
    center: true,
    numCode: 7,
    color: 'violet',
    currentShapeIndex: 0,
    shape: [
      [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
      ],
      [
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
      ],
      [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
      [
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
      ],
    ]
  },
];

const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'navy', 'violet'];

const isActiveBlock = value => (value > 0 && value < 10);
const isInactiveBlock = value => (value === undefined || value >= 10);

function init() {
  const fragment = document.createDocumentFragment();
  [...Array(20).keys()].forEach((col, i) => {
    const tr = document.createElement('tr');
    fragment.appendChild(tr);
    [...Array(10).keys()].forEach((row, j) => {
      const td = document.createElement('td');
      tr.appendChild(td);
    });
    const column = Array(10).fill(0);
    tData.push(column);
  });
  tetris.appendChild(fragment);
}

function draw() {
  console.log('drawed', JSON.parse(JSON.stringify(tData)), JSON.parse(JSON.stringify(cBlock)));
  tData.forEach((col, i) => {
    col.forEach((row, j) => {
      if (row > 0) {
        tetris.children[i].children[j].className = tData[i][j] >= 10 ? colors[tData[i][j] / 10 - 1]: colors[tData[i][j] - 1];
      } else {
        tetris.children[i].children[j].className = '';
      }
    });
  });
}


function drawNextBlock() { // function draws next block
  const n_table = document.getElementById('_table');
  n_table.querySelectorAll('tr').forEach((col, i) => {
    Array.from(col.children).forEach((row, j) => {
      if (nBlock.shape[0][i] && nBlock.shape[0][i][j] > 0) {
        n_table.querySelectorAll('tr')[i].children[j].className = colors[nBlock.numCode - 1];
      } else {
        n_table.querySelectorAll('tr')[i].children[j].className = 'white';
      }
    });
  })
}

function generate() { // generate blocks
  if (!cBlock) {
    cBlock = blocks[Math.floor(Math.random() * blocks.length)];
  } else {
    cBlock = nBlock;
  }
  cBlock.currentShapeIndex = 0;
  nBlock = blocks[Math.floor(Math.random() * blocks.length)]; // pre-create next block
  console.log(cBlock);
  drawNextBlock();
  cTopLeft = [-1, 3];
  let isGameOver = false;
  cBlock.shape[0].slice(1).forEach((col, i) => { // decided to game over
    col.forEach((row, j) => {
      if (row && tData[i][j + 3]) {
        isGameOver = true;
      }
    });
  });
  cBlock.shape[0].slice(1).forEach((col, i) => { // generate block data
    console.log(cBlock.shape[0], cBlock.shape[0].slice(1), col);
    col.forEach((row, j) => {
      if (row) {
        tData[i][j + 3] = cBlock.numCode;
      }
    });
  });
  console.log('generate', JSON.parse(JSON.stringify(cBlock)));
  if (isGameOver) {
    clearInterval(int);
    draw();
    alert('game over');
  } else {
    draw();
  }
}

function checkRows() { // check one full row
  const f_Rows = [];
  tData.forEach((col, i) => {
    let count = 0;
    col.forEach((row, j) => {
      if (row > 0) {
        count++;
      }
    });
    if (count === 10) {
      f_Rows.push(i);
    }
  });
  const f_RowsCount = f_Rows.length;
  tData = tData.filter((row, i) => !f_Rows.includes(i));
  for (let i = 0; i < f_RowsCount; i++) {
    tData.unshift([0,0,0,0,0,0,0,0,0,0]);
  }
  console.log(f_Rows, JSON.parse(JSON.stringify(tData)));
  let score = parseInt(document.getElementById('score').textContent, 10);
  score += f_RowsCount ** 2;
  document.getElementById('score').textContent = String(score);
}

function goDown() { // go down one cell
  const nTopLeft = [cTopLeft[0] + 1, cTopLeft[1]];
  const activeBlocks = [];
  let canGoDown = true;
  let cBlockShape = cBlock.shape[cBlock.currentShapeIndex];
  for (let i = cTopLeft[0]; i < cTopLeft[0] + cBlockShape.length; i++) { // if there is a block under
    if (i < 0 || i >= 20) continue;
    for (let j = cTopLeft[1]; j < cTopLeft[1] + cBlockShape.length; j++) {
      console.log(i, j);
      if (isActiveBlock(tData[i][j])) { // if it is currently activce block 
        activeBlocks.push([i, j]);
        if (isInactiveBlock(tData[i + 1] && tData[i + 1][j])) {
          console.log('There is a block below!', i, j, tData[i][j], tData[i + 1] && tData[i + 1][j], JSON.parse(JSON.stringify(tData)));
          canGoDown = false;
        }
      }
    }
  }
  if (!canGoDown) {
    activeBlocks.forEach((blocks) => {
      tData[blocks[0]][blocks[1]] *= 10;
    });
    checkRows(); // check there is row to delete
    generate(); // generate new block
    return false;
  } else if (canGoDown) {
    for (let i = tData.length - 1; i >= 0; i--) {
      const col = tData[i];
      col.forEach((row, j) => {
        if (row < 10 && tData[i + 1] && tData[i + 1][j] < 10) {
          tData[i + 1][j] = row;
          tData[i][j] = 0;
        }
      });
    }
    cTopLeft = nTopLeft;
    draw();
    return true;
  }
}

let int = setInterval(goDown, 2000);
init();
generate();

document.getElementById('stop').addEventListener('click', function() {
  clearInterval(int);
});
document.getElementById('start').addEventListener('click', function() {
  if (int) {
    clearInterval(int);
  }
  int = setInterval(goDown, 2000);
});
document.getElementById('playORmute').addEventListener('click', function() {
  if (document.getElementById('bgm').paused) {
    document.getElementById('bgm').play();
  } else {
    document.getElementById('bgm').pause();
  }
});

window.addEventListener('keydown', (e) => {
  switch (e.code) {
    case 'ArrowLeft': { // left key = go left
      const nTopLeft = [cTopLeft[0], cTopLeft[1] - 1];
      let isMovable = true;
      let cBlockShape = cBlock.shape[cBlock.currentShapeIndex];
      for (let i = cTopLeft[0]; i < cTopLeft[0] + cBlockShape.length; i++) { // check left side space
        if (!isMovable) break;
        for (let j = cTopLeft[1]; j < cTopLeft[1] + cBlockShape.length; j++) {
          if (!tData[i] || !tData[i][j]) continue;
          if (isActiveBlock(tData[i][j]) && isInactiveBlock(tData[i] && tData[i][j - 1])) {
            console.log(i, j, tData[i][j], tData[i][j-1]);
            isMovable = false;
          }
        }
      }
      console.log('left', 'isMovable', isMovable);
      if (isMovable) {
        cTopLeft = nTopLeft;
        tData.forEach((col, i) => {
          for (var j = 0; j < col.length; j++) {
            const row = col[j];
            if (tData[i][j - 1] === 0 && row < 10) {
              console.log(row, tData[i][j - 1], i, j);
              tData[i][j - 1] = row;
              tData[i][j] = 0;
            }
          }
        });
        draw();
      }
      break;
    }
    case 'ArrowRight': { // right key = go right
      const nTopLeft = [cTopLeft[0], cTopLeft[1] + 1];
      let isMovable = true;
      let cBlockShape = cBlock.shape[cBlock.currentShapeIndex];
      for (let i = cTopLeft[0]; i < cTopLeft[0] + cBlockShape.length; i++) { // check right side space
        if (!isMovable) break;
        for (let j = cTopLeft[1]; j < cTopLeft[1] + cBlockShape.length; j++) {
          if (!tData[i] || !tData[i][j]) continue;
          if (isActiveBlock(tData[i][j]) && isInactiveBlock(tData[i] && tData[i][j + 1])) {
            console.log(i, j);
            isMovable = false;
          }
        }
      }
      console.log('right', 'isMovable', isMovable);
      if (isMovable) {
        cTopLeft = nTopLeft;
        tData.forEach((col, i) => {
          for (var j = col.length - 1; j >= 0; j--) {
            const row = col[j];
            if (tData[i][j + 1] === 0 && row < 10) {
              tData[i][j + 1] = row;
              tData[i][j] = 0;
            }
          }
        });
        draw();
      }
      break;
    }
    case 'ArrowDown': { // down key = go down
      goDown();
    }
  }
});

window.addEventListener('keyup', (e) => {
  switch (e.code) {
    case 'ArrowUp': { // change the direction
      let cBlockShape = cBlock.shape[cBlock.currentShapeIndex];
      let isChangeable = true;
      const nextShapeIndex = cBlock.currentShapeIndex + 1 === cBlock.shape.length
        ? 0
        : cBlock.currentShapeIndex + 1;
      const nBlockShape = cBlock.shape[nextShapeIndex];
      for (let i = cTopLeft[0]; i < cTopLeft[0] + cBlockShape.length; i++) { // check space after change the direction
        if (!isChangeable) break;
        for (let j = cTopLeft[1]; j < cTopLeft[1] + cBlockShape.length; j++) {
          if (!tData[i]) continue;
          if (nBlockShape[i - cTopLeft[0]][j - cTopLeft[1]] > 0 && isInactiveBlock(tData[i] && tData[i][j])) {
            console.log(i, j);
            isChangeable = false;
          }
        }
      }
      console.log('isChangeable', isChangeable);
      if (isChangeable) {
        console.log('isChangeable', JSON.parse(JSON.stringify(cBlock)), nBlockShape);
        while (cTopLeft[0] < 0) {
          goDown();
        }
        for (let i = cTopLeft[0]; i < cTopLeft[0] + cBlockShape.length; i++) { // check space after change the direction
          for (let j = cTopLeft[1]; j < cTopLeft[1] + cBlockShape.length; j++) {
            if (!tData[i]) continue;
            let nBlockShapeCell = nBlockShape[i - cTopLeft[0]][j - cTopLeft[1]];
            if (nBlockShapeCell > 0 && tData[i][j] === 0) {
              // no current column with next block 
              tData[i][j] = cBlock.numCode;
            } else if (nBlockShapeCell === 0 && tData[i][j] && tData[i][j] < 10) {
              // current column without next block 
              tData[i][j] = 0;
            }
          }
        }
        cBlock.currentShapeIndex = nextShapeIndex;
      }
      draw();
      break;
    }
    case 'Space': // drop at once
      while (goDown()) {}
      break;
  }
});