

export default class Tetromino {
  constructor(canvas, shapePath, type, color, vx, vy) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.shapePath = [...shapePath];
    //this.type = type; // 0 = I, 1 = J, 2 = L, 3 = O, 4 = S, 5 = T, 6 = Z
    this.color = color;
    this.vx = vx;
    this.vy = vy;
  }

  draw() {
    this.ctx.fillStyle = this.color;
    this.ctx.beginPath();
    this.shapePath.forEach((element) => {
      this.ctx.lineTo(element.x, element.y);
    });
    this.ctx.closePath();
    this.ctx.fill();

    //console.log(this.ctx.getImageData(this.x, this.y, 1, 1).data);
  }
  rotate() {
    this.shapePath = this.shapePath.map((element) => {
      return rotateAround(element, this.shapePath[4]);
    });
    console.log(this.shapePath);
  }
  update() {
    const yArray = this.shapePath.map((element) => element.y);
    const maxY = Math.max(...yArray);
    if (maxY < this.canvas.height) {
      this.shapePath.forEach((element) => {
        console.log(element);
        element.y += this.vy * unit;
      });
    }
    console.log(this.shapePath);
  }
}
function rotateAround({ x: x, y: y }, { x: a, y: b }) {
    const newPoint = {
      x: y - b + a,
      y: x - a + b,
    };
    return newPoint;
  }