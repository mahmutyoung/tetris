const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 600;
const unit = canvas.width / 20;

class Tetromino {
  /* constructor(shapePath, type, color, canMove) {
    this.shapePath = shapePath;
    this.type = type;
    this.color = color;
    this.canMove = canMove;
  }
  */
  constructor(canvas, x, y, width, height, color, vx, vy) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.vx = vx;
    this.vy = vy;
  }

  draw() {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
    this.ctx.font = "16px Arial";
    this.ctx.fillStyle = "white";
    this.ctx.fillText("L", this.x + 10, this.y + 15);
    //console.log(this.ctx.getImageData(this.x, this.y, 1, 1).data);
  }
  rotateShape() {
    let newCoordinates = {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
    };
    this.x -= newCoordinates.height;
    this.y -= newCoordinates.width;
    this.width = newCoordinates.height;
    this.height = newCoordinates.width;
    //this.ctx.fillStyle = "red";
    //this.ctx.fillRect(this.x, this.y, this.width, this.height);
    console.log(myTetromino);
  }
  update() {
    if (this.y < canvas.height - this.height) {
      this.y += this.vy;
    }

    console.log(this.y);
  }
}

const myTetromino = new Tetromino(
  canvas,
  10 * unit,
  3 * unit,
  unit,
  unit * 4,
  "red",
  0,
  1
);

myTetromino.draw();
console.log(myTetromino);

document.addEventListener("keydown", (event) => {
  //canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
  if (event.code === "ArrowUp") {
    event.preventDefault();
    myTetromino.rotateShape();
  }
});

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  myTetromino.draw();
  myTetromino.update();

  console.log("game loop");
  console.log(myTetromino);
  requestAnimationFrame(gameLoop);
}

//gameLoop();
