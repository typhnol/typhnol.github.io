function snakeSketch(p) {
    var snake;
    var scl = 15;
    var food;
    var gameRunning = false;
    let details = navigator.userAgent;
    let regexp = /android|iphone|kindle|ipad/i;
    let isMobileDevice = regexp.test(details);

    function Snake() {
        this.x = 120;
        this.y = 120;
        this.xspeed = 0;
        this.yspeed = 0;
        this.total = 0;
        this.tail = [];
        
        this.reset = function() {
            this.x = 120;
            this.y = 120;
            this.xspeed = 0;
            this.yspeed = 0;
            this.total = 0;
            this.tail = [];
            gameRunning = false;
        }
        
        this.dir = function(x, y) {
            if (this.xspeed + x !== 0 || this.yspeed + y !== 0) {
                this.xspeed = x;
                this.yspeed = y;
            }
        }
        
        this.eat = function(pos) {
            var d = p.dist(this.x, this.y, pos.x, pos.y);
            if(d < 1) {
                this.total++;
            return true;
            } else {
                return false;
            }
        }
        
        this.death = function() {
            if (this.x < 0 || this.x >= p.width || this.y < 0 || this.y >= p.height) {
                this.reset();
                return;
            }
            
            for(var i = 0; i < this.tail.length; i++) {
                var pos = this.tail[i];
                var d = p.dist(this.x, this.y, pos.x, pos.y);
                if(d < 1) {
                    this.reset();
                    return;
                }
            }
        }
        
        this.update = function() {
            if(this.total === this.tail.length) {
                for(var i = 0; i < this.tail.length-1; i++) {
                    this.tail[i] = this.tail[i+1];
                }
            }
            this.tail[this.total-1] = p.createVector(this.x, this.y);
            
            this.x += this.xspeed * scl;
            this.y += this.yspeed * scl;
        }
        
        this.show = function() {
            p.fill(0, 255, 0);
            for(var i = 0; i < this.tail.length; i++) {
                p.rect(this.tail[i].x, this.tail[i].y, scl, scl);
            }
            p.rect(this.x, this.y, scl, scl);
        }
    }

    p.setup = function() {
        let snakeCanvas = p.createCanvas(300, 300);
        snakeCanvas.parent('snake');
        p.frameRate(8);
        snake = new Snake();
        
        pickLocation();
    }

    function pickLocation() {
        var cols = p.floor(p.width/scl);
        var rows = p.floor(p.height/scl);
        food = p.createVector(p.floor((p.random(cols))), p.floor((p.random(rows))));
        food.mult(scl);
    }

    p.keyPressed = function() {
        if (p.keyCode === p.UP_ARROW && snake.yspeed !== 1) {
            snake.dir(0, -1);
        } else if (p.keyCode === p.DOWN_ARROW && snake.yspeed !== -1) {
            snake.dir(0, 1);
        } else if (p.keyCode === p.LEFT_ARROW && snake.xspeed !== 1) {
            snake.dir(-1, 0);
        } else if (p.keyCode === p.RIGHT_ARROW && snake.xspeed !== -1) {
            snake.dir(1, 0);
        }
    }

    if(isMobileDevice) {
        p.mousePressed = function() {
            if(p.mouseX >= 0 && p.mouseX <= 30 && p.mouseY >= 80 && p.mouseY <= 220) {
                snake.dir(-1, 0);
            } else if(p.mouseY >= 0 && p.mouseY <= 30 && p.mouseX >= 80 && p.mouseX <= 220) {
                snake.dir(0, -1);
            } else if(p.mouseX >= 270 && p.mouseX <= 300 && p.mouseY >= 80 && p.mouseY <= 220) {
                snake.dir(1, 0);
            } else if(p.mouseY >= 270 && p.mouseY <= 300 && p.mouseX >= 80 && p.mouseX <= 220) {
                snake.dir(0, 1);
            }
        }
    }

    p.draw = function() {
        if(gameRunning === false) {
            p.background(0);
            snake.show();
            p.fill(255, 0, 0);
            p.rect(food.x, food.y, scl, scl);
            
            p.fill('rgba(255, 255, 255, 0.4)');
            p.rect(0, 0, 300, 300);
            p.fill(0);
            p.textSize(25);
            p.textAlign(p.CENTER);
            
            if(isMobileDevice) {
                p.noStroke();
                p.fill('rgba(255, 255, 255, 0.4)');
                p.triangle(0, 150, 30, 80, 30, 220);
                p.triangle(150, 0, 80, 30, 220, 30);
                p.triangle(300, 150, 270, 80, 270, 220);
                p.triangle(150, 300, 80, 270, 220, 270);
                p.fill(0);
                p.stroke(0);
                p.text('PRESS ANY ARROW (gameplay SUCKS on mobile please play on PC for better experience)', 30, 80, 250, 300);
                
                if(p.mouseX >= 0 && p.mouseX <= 30 && p.mouseY >= 80 && p.mouseY <= 220 && p.mouseIsPressed) {
                    gameRunning = true;
                    snake.dir(-1, 0);
                } else if(p.mouseY >= 0 && p.mouseY <= 30 && p.mouseX >= 80 && p.mouseX <= 220 && p.mouseIsPressed) {
                    gameRunning = true;
                    snake.dir(0, -1);
                } else if(p.mouseX >= 270 && p.mouseX <= 300 && p.mouseY >= 80 && p.mouseY <= 220 && p.mouseIsPressed) {
                    gameRunning = true;
                    snake.dir(1, 0);
                } else if(p.mouseY >= 270 && p.mouseY <= 300 && p.mouseX >= 80 && p.mouseX <= 220 && p.mouseIsPressed) {
                    gameRunning = true;
                    snake.dir(0, 1);
                }
            } else {
                p.text('PRESS ANY ARROW KEY', 50, 120, 200, 300);
            }

            if (p.keyIsDown(p.LEFT_ARROW) && !p.keyIsDown(p.RIGHT_ARROW) && !p.keyIsDown(p.UP_ARROW) && !p.keyIsDown(p.DOWN_ARROW) && snake.xspeed !== 1) {
                gameRunning = true;
                snake.dir(-1, 0);
            } else if (p.keyIsDown(p.RIGHT_ARROW) && !p.keyIsDown(p.LEFT_ARROW) && !p.keyIsDown(p.UP_ARROW) && !p.keyIsDown(p.DOWN_ARROW) && snake.xspeed !== -1) {
                gameRunning = true;
                snake.dir(1, 0);
            } else if (p.keyIsDown(p.UP_ARROW) && !p.keyIsDown(p.LEFT_ARROW) && !p.keyIsDown(p.RIGHT_ARROW) && !p.keyIsDown(p.DOWN_ARROW) && snake.yspeed !== 1) {
                gameRunning = true;
                snake.dir(0, -1);
            } else if (p.keyIsDown(p.DOWN_ARROW) && !p.keyIsDown(p.LEFT_ARROW) && !p.keyIsDown(p.RIGHT_ARROW) && !p.keyIsDown(p.UP_ARROW) && snake.yspeed !== -1) {
                gameRunning = true;
                snake.dir(0, 1);
            }
        } else {
            p.background(0);
            snake.death();
            snake.update();
            snake.show();

            if(snake.eat(food)) {
                pickLocation();
            }

            p.fill(255, 0, 0);
            p.rect(food.x, food.y, scl, scl);

            if(isMobileDevice) {
                p.fill('rgba(255, 255, 255, 0.4)');
                p.triangle(0, 150, 30, 80, 30, 220);
                p.triangle(150, 0, 80, 30, 220, 30);
                p.triangle(300, 150, 270, 80, 270, 220);
                p.triangle(150, 300, 80, 270, 220, 270);
            }
        }
    }
}

new p5(snakeSketch);