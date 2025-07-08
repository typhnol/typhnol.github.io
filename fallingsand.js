function sandSketch(p) {
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
  let w = 3;
  let cols, rows;

  function inCols(i) {
    return i >= 0 && i <= cols - 1;
  }

  function inRows(j) {
    return j >= 0 && j <= rows - 1;
  }

  p.setup = function() {
    let sandCanvas = p.createCanvas(300, 300);
    sandCanvas.parent('sand');
    cols = p.width / w;
    rows = p.height / w;
    grid = make2DArray(cols, rows);
    
    button = p.createButton('Reset');
    button.mouseClicked(resetCanvas);
    button.position(0, 0);
    button.parent('sand');
    
    slider = p.createSlider(1, 10, 1, 1);
    slider.position(60, 0);
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

  p.draw = function() {
    if (p.mouseIsPressed) {
      let mouseCol = p.floor(p.mouseX / w);
      let mouseRow = p.floor(p.mouseY / w);

      let matrix = slider.value();
      let spread = p.floor(matrix/2);
      for (let i = -spread; i <= spread; i++){
        for (let j = -spread; j <= spread; j++){
          if (p.random(1) < 0.75) {
            let colOf = mouseCol + j;
            let rowOf = mouseRow + i;
            if (inCols(colOf) && inRows(rowOf)) {
              grid[colOf][rowOf] = 1;
            }
          }
        }
      }
    }
    
    p.background(0);
    
    for (let i = 0; i < cols; i++){
      for (let j = 0; j < rows; j++){
        p.noStroke();
        if (grid[i][j] == 1) {
          p.fill(255);
          let x = i * w;
          let y = j * w;
          p.square(x,y,w);
        }
      }
    }
    
    let nextGrid = make2DArray(cols, rows);
    for (let i = 0; i < cols; i++){
      for (let j = 0; j < rows; j++){
        let state = grid[i][j];
        if (state === 1) {
          let below = grid[i][j+1];
          let dir = p.random([-1, 1]);
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
}

new p5(sandSketch);