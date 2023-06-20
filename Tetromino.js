import { board } from "./src/main.js";
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 600;
const unit = canvas.width / 20;
const typeArray = ["I", "J", "L", "O", "S", "T", "Z"];

export class Tetromino {
  constructor(canvas, color, vx, vy) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.type = typeArray[Math.round(Math.random() * 6)];
    this.shapePath = makeTetromino(this.type);
    this.color = color;
    this.vx = vx;
    this.vy = vy;
  }

  draw() {
    this.ctx.fillStyle = this.color;
    this.ctx.beginPath();
    console.log(this.shapePath);
    this.shapePath.forEach((element) => {
      this.ctx.lineTo(element.x, element.y);
    });
    this.ctx.closePath();
    this.ctx.fill();

    //console.log(this.ctx.getImageData(this.x, this.y, 1, 1).data);
  }

  update() {
    console.log(this.shapePath);
    this.shapePath.maxY = Math.max(
      ...this.shapePath.map((element) => element.y)
    );
    if (this.shapePath.maxY < this.canvas.height) {
      this.shapePath.forEach((element) => {
        element.y += this.vy * unit;
      });
    } else {
      this.vy = 0;
    }
  }

  rotate() {
    const xArray = this.shapePath.map((element) => element.x);
    let averageX = Math.round(
      xArray.reduce((acc, cur) => acc + cur, 0) / this.shapePath.length
    );
    averageX = Math.round(averageX / unit) * unit;

    const yArray = this.shapePath.map((element) => element.y);
    let averageY = Math.round(
      yArray.reduce((acc, cur) => acc + cur, 0) / this.shapePath.length
    );
    averageY = Math.round(averageY / unit) * unit;

    console.log(this.shapePath);
    const pivot = { x: averageX, y: averageY };
    console.log({ pivot });

    const newPath = this.shapePath.map((element) => {
      return rotateAround(element, pivot);
    });

    const minX = Math.min(...newPath.map((element) => element.x));
    const maxX = Math.max(...newPath.map((element) => element.x));
    const maxY = Math.max(...newPath.map((element) => element.y));
    if (minX >= 0 && maxX <= canvas.width && maxY <= canvas.height) {
      this.shapePath = newPath;
    }
  }
  goDown() {
    this.shapePath.maxY = Math.max(
      ...this.shapePath.map((element) => element.y)
    );
    const newPath = this.shapePath.map((element) => {
      if (this.shapePath.maxY > canvas.height - unit) {
        return element;
      } else {
        element.y += unit;
        return element;
      }
    });
    this.shapePath = newPath;
  }
  goLeft() {
    this.shapePath.minX = Math.min(
      ...this.shapePath.map((element) => element.x)
    );

    const newPath = this.shapePath.map((element) => {
      if (this.shapePath.minX < unit) {
        return element;
      } else {
        element.x -= unit;
        return element;
      }
    });

    this.shapePath = newPath;
  }

  goRight() {
    this.shapePath.maxX = Math.max(
      ...this.shapePath.map((element) => element.x)
    );

    const newPath = this.shapePath.map((element) => {
      if (this.shapePath.maxX > canvas.width - unit) {
        return element;
      } else {
        element.x += unit;
        return element;
      }
    });

    this.shapePath = newPath;
  }
}

function rotateAround(point, pivot) {
  const x = point.x - pivot.x;
  const y = point.y - pivot.y;
  const newX = y + pivot.x;
  const newY = -x + pivot.y;

  return { x: newX, y: newY };
}
function makeTetromino(type) {
  let shapePath = [];
  switch (type) {
    case "I":
      shapePath = [
        { x: 11 * unit, y: 0 },
        { x: 12 * unit, y: 0 },
        { x: 12 * unit, y: 1 * unit },
        { x: 12 * unit, y: 2 * unit },
        { x: 12 * unit, y: 3 * unit },
        { x: 12 * unit, y: 4 * unit },
        { x: 11 * unit, y: 4 * unit },
        { x: 11 * unit, y: 3 * unit },
        { x: 11 * unit, y: 2 * unit },
        { x: 11 * unit, y: 1 * unit },
      ];

      break;
    case "J":
      shapePath = [
        { x: 11 * unit, y: 0 },
        { x: 12 * unit, y: 0 },
        { x: 12 * unit, y: 1 * unit },
        { x: 12 * unit, y: 2 * unit },
        { x: 12 * unit, y: 3 * unit },
        { x: 11 * unit, y: 3 * unit },
        { x: 10 * unit, y: 3 * unit },
        { x: 10 * unit, y: 2 * unit },
        { x: 11 * unit, y: 2 * unit },
        { x: 11 * unit, y: 1 * unit },
      ];

      break;
    case "L":
      shapePath = [
        { x: 10 * unit, y: 0 },
        { x: 11 * unit, y: 0 },
        { x: 11 * unit, y: 1 * unit },
        { x: 11 * unit, y: 2 * unit },
        { x: 12 * unit, y: 2 * unit },
        { x: 12 * unit, y: 3 * unit },
        { x: 11 * unit, y: 3 * unit },
        { x: 10 * unit, y: 3 * unit },
        { x: 10 * unit, y: 2 * unit },
        { x: 10 * unit, y: 1 * unit },
      ];

      break;
    case "O":
      shapePath = [
        { x: 10 * unit, y: 0 },
        { x: 11 * unit, y: 0 },
        { x: 12 * unit, y: 0 },
        { x: 12 * unit, y: 1 * unit },
        { x: 12 * unit, y: 2 * unit },
        { x: 11 * unit, y: 2 * unit },
        { x: 10 * unit, y: 2 * unit },
        { x: 10 * unit, y: 1 * unit },
      ];

      break;
    case "S":
      shapePath = [
        { x: 13 * unit, y: 0 },
        { x: 12 * unit, y: 0 },
        { x: 11 * unit, y: 0 },
        { x: 11 * unit, y: 1 * unit },
        { x: 10 * unit, y: 1 * unit },
        { x: 10 * unit, y: 2 * unit },
        { x: 11 * unit, y: 2 * unit },
        { x: 12 * unit, y: 2 * unit },
        { x: 12 * unit, y: 1 * unit },
        { x: 13 * unit, y: 1 * unit },
      ];

      break;
    case "T":
      shapePath = [
        { x: 10 * unit, y: 0 },
        { x: 11 * unit, y: 0 },
        { x: 12 * unit, y: 0 },
        { x: 13 * unit, y: 0 },
        { x: 13 * unit, y: 1 * unit },
        { x: 12 * unit, y: 1 * unit },
        { x: 12 * unit, y: 2 * unit },
        { x: 11 * unit, y: 2 * unit },
        { x: 11 * unit, y: 1 * unit },
        { x: 10 * unit, y: 1 * unit },
      ];

      break;
    case "Z":
      shapePath = [
        { x: 10 * unit, y: 0 },
        { x: 11 * unit, y: 0 },
        { x: 12 * unit, y: 0 },
        { x: 12 * unit, y: 1 * unit },
        { x: 13 * unit, y: 1 * unit },
        { x: 13 * unit, y: 2 * unit },
        { x: 12 * unit, y: 2 * unit },
        { x: 11 * unit, y: 2 * unit },
        { x: 11 * unit, y: 1 * unit },
        { x: 10 * unit, y: 1 * unit },
      ];

      break;

    default:
      console.log("error");
  }
  return shapePath;
}
function checkIntersection(path, pathArray) {
  // Loop through all the points on path1 and check if they fall inside path2
  for (let i = 0; i < path.length; i++) {
    const point = path[i];
    for (let j = 0; j < pathArray.length; j++) {
      const path2 = pathArray[j];
      if (path2.ctx.isPointInPath(path2, point.x, point.y, "nonzero")) {
        return true; // Paths intersect
      }
    }
  }

  // Loop through all the points on path2 and check if they fall inside path1
  for (let i = 0; i < pathArray.length; i++) {
    for (let j = 0; j < pathArray[i].shapePath.length; j++) {
      const point = pathArray[i].ctx;
      if (ctx.isPointInPath(path, point.x, point.y, "nonzero")) {
        return true; // Paths intersect
      }
    }

    // No intersections found
  }
  return false;
}
