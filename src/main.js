const canvas = document.getElementById("canvas");
canvas.width = 400;
canvas.height = 600;
unit = canvas.width/20;

class Tetromino {
  /* constructor(shapePath, type, color, canMove) {
    this.shapePath = shapePath;
    this.type = type;
    this.color = color;
    this.canMove = canMove;
  }
  */
  constructor(canvas, x, y, width, height, color, velocity) {
    this.width = width;
    this.x = x;
    this.y = y;
    this.height = height;
    this.canvas = canvas;
    this.color = color;
    this.velocity = velocity;
    this.ctx = canvas.getContext("2d");
  }

  draw() {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
    console.log(this.ctx.getImageData(this.x, this.y, 1, 1).data);
  }
  rotateLShape() {
    this.ctx.translate(50, 50);
    this.ctx.rotate((90 * Math.PI) / 180);
    this.ctx.translate(-50, -50);
    this.ctx.fillStyle = "red";
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
  }
  update() {
    this.y += this.velocity.y;
  }
}

const myTetromino = new Tetromino(canvas, 10*unit, 3*unit,unit, unit*4, "red");

myTetromino.draw();

document.addEventListener(
  "keydown",
  (event) => {
    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
    if (event.code === "ArrowUp") {
      event.preventDefault();
      myTetromino.rotateShape();
    }
  },
  { capture: true }
);
