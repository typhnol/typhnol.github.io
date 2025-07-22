function mineSketch(p) {
    function make2DArray(cols, rows) {
        let arr = new Array(cols);
        for (let i = 0; i < arr.length; i++) {
            arr[i] = new Array(rows);
        }
        return arr;
    }

    function Cell(i, j, w) {
        this.i = i;
        this.j = j;
        this.x = i * w;
        this.y = j * w;
        this.w = w;
        this.neighborCount = 0;

        this.mine = false;
        this.revealed = false;
    }

    Cell.prototype.show = function () {
        p.stroke(255);
        p.noFill();
        p.rect(this.x, this.y, this.w, this.w);

        if (this.revealed) {
            if (this.mine) {
                p.stroke(0);
                p.fill(50);
                p.rect(this.x, this.y, this.w, this.w);
                p.stroke(0);
                p.fill(255);
                p.ellipse(this.x + this.w * 0.5, this.y + this.w * 0.5, this.w * 0.5);
            } else {
                p.stroke(0);
                p.fill(50);
                p.rect(this.x, this.y, this.w, this.w);
                if (this.neighborCount > 0) {
                    p.textAlign(p.CENTER);
                    p.fill(0);
                    p.text(this.neighborCount, this.x + this.w * 0.5, this.y + this.w * 0.65);
                }
            }
        }
    }

    Cell.prototype.countMines = function () {
        if (this.mine) {
            this.neighborCount = -1;
            return;
        }

        let total = 0;
        for (let xoff = -1; xoff <= 1; xoff++) {
            for (let yoff = -1; yoff <= 1; yoff++) {
                let i = this.i + xoff;
                let j = this.j + yoff;
                if (i > -1 && i < cols && j > -1 && j < rows) {
                    let neighbor = grid[i][j];
                    if (neighbor.mine) {
                        total++;
                    }
                }
            }
        }
        this.neighborCount = total;
    }

    Cell.prototype.contains = function (x, y) {
        return (x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w);
    }

    Cell.prototype.reveal = function () {
        this.revealed = true;

        if (this.neighborCount == 0) {
            this.floodFill();
        }
    }

    Cell.prototype.floodFill = function () {
        for (let xoff = -1; xoff <= 1; xoff++) {
            for (let yoff = -1; yoff <= 1; yoff++) {
                let i = this.i + xoff;
                let j = this.j + yoff;
                if (i > -1 && i < cols && j > -1 && j < rows) {
                    let neighbor = grid[i][j];
                    if (!neighbor.mine && !neighbor.revealed) {
                        neighbor.reveal();
                    }
                }
            }
        }
    }

    let grid;
    let cols;
    let rows;
    let w = 30;
    let totalMines = 20;
    let firstClick = true;
    let gameIsOver = false;

    function startGame() {
        cols = p.floor(p.width / w);
        rows = p.floor(p.height / w);
        grid = make2DArray(cols, rows);

        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                grid[i][j] = new Cell(i, j, w);
            }
        }
    }

    function placeMines(safeX, safeY) {
        let safeCells = [];

        for (let xoff = -1; xoff <= 1; xoff++) {
            for (let yoff = -1; yoff <= 1; yoff++) {
                let i = safeX + xoff;
                let j = safeY + yoff;
                if (i >= 0 && i < cols && j >= 0 && j < rows) {
                    safeCells.push([i, j]);
                }
            }
        }

        let options = [];
        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                let isSafe = safeCells.some(([safeI, safeJ]) => safeI === i && safeJ === j);
                if (!isSafe) {
                    options.push([i, j]);
                }
            }
        }

        for (let n = 0; n < totalMines; n++) {
            if (options.length === 0) break;
            let index = p.floor(p.random(options.length));
            let [i, j] = options[index];
            options.splice(index, 1);
            grid[i][j].mine = true;
        }

        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                grid[i][j].countMines();
            }
        }
    }

    p.setup = function () {
        let mineCanvas = p.createCanvas(300, 300);
        mineCanvas.parent('minesweeper');

        startGame();
    }

    function gameOver() {
        gameIsOver = true;
        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                grid[i][j].reveal();
            }
        }
        setTimeout(() => {
            gameIsOver = false;
            firstClick = true;
            startGame();
            console.log('restarted');
        }, 1500);
    }

    p.mousePressed = function () {
        if (gameIsOver) return;

        let cellX = p.int(p.mouseX / w);
        let cellY = p.int(p.mouseY / w);

        if (firstClick) {
            firstClick = false;
            placeMines(cellX, cellY);
            grid[cellX][cellY].reveal();
            return;
        }

        grid[cellX][cellY].reveal();

        if (grid[cellX][cellY].mine) {
            gameOver();
        }
    }

    p.draw = function () {
        p.background(0);
        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                grid[i][j].show();
            }
        }
    }
}

new p5(mineSketch);