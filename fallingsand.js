function make2DArray() {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
    for (let j = 0; j < arr[i].length; j++) {
      arr[i][j] = 0;
    }
  }
  return arr;
}

let button;
let slider;

let grid;
let w = 5;
let cols, rows;

function inCols(i) {
  return i >= 0 && i <= cols - 1;
}

function inRows(j) {
  return j >= 0 && j <= rows - 1;
}

function setup() {
  let myCanvas = createCanvas(400, 400);
  myCanvas.parent('sand');
  cols = width / w;
  rows = height / w;
  grid = make2DArray(cols, rows);
  
  button = createButton('Reset');
  button.mouseClicked(resetCanvas);
  button.position(0, 0);
  button.parent('sand');
  
  slider = createSlider(1, 10, 1, 1);
  slider.position(50, 0);
  slider.size(200);
  slider.parent('sand');
}

function resetCanvas() {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = 0;
    }
  }
}

function draw() {
  if (mouseIsPressed) {
    let mouseCol = floor(mouseX / w);
    let mouseRow = floor(mouseY / w);

    let matrix = slider.value();
    let spread = floor(matrix/2);
    for (let i = -spread; i <= spread; i++){
      for (let j = -spread; j <= spread; j++){
        if (random(1) < 0.75) {
          let colOf = mouseCol + j;
          let rowOf = mouseRow + i;
          if (inCols(colOf) && inRows(rowOf)) {
            grid[colOf][rowOf] = 1;
          }
        }
      }
    }
  }
  
  background(0);
  
  for (let i = 0; i < cols; i++){
    for (let j = 0; j < rows; j++){
      noStroke();
      if (grid[i][j] == 1) {
        fill(255);
        let x = i * w;
        let y = j * w;
        square(x,y,w);
      }
    }
  }
  
  let nextGrid = make2DArray(cols, rows);
  for (let i = 0; i < cols; i++){
    for (let j = 0; j < rows; j++){
      let state = grid[i][j];
      if (state === 1) {
        let below = grid[i][j+1];
        let dir = random([-1, 1]);
        let belowA = -1;
        let belowB = -1;
        
        if (inCols(i+dir)){
          belowA = grid[i+dir][j+1];
        }
        if (inCols(i-dir)){
          belowB = grid[i-dir][j+1];
        }
        
        if (below === 0) {
          nextGrid[i][j+1] = state;
        } else if (belowA === 0) {
          nextGrid[i+dir][j+1] = state;
        } else if (belowB === 0) {
          nextGrid[i-dir][j+1] = state;
        } else {
          nextGrid[i][j] = state;
        }
      }
    }
  }
  
  grid = nextGrid;
}