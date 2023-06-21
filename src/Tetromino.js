import { board } from "./main.js";

const typeArray = ["I", "J", "L", "O", "S", "T", "Z"];

export class Tetromino {
  constructor(canvas, color, vy, width, height, scale) {
    this.canvas = canvas;
    this.canvas.width = width * scale;
    this.canvas.height = height * scale;
    this.ctx = canvas.getContext("2d");
    this.type = typeArray[Math.round(Math.random() * (typeArray.length - 1))];
    this.shapePath = makeTetromino(this.type);
    this.color = color;
    this.scale = scale;
    this.vy = vy;
  }

  isColliding(board) {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].shapePath.length; j++) {
        for (let k = 0; k < this.shapePath.length; k++) {
          if (
            this.shapePath[k].x === board[i].shapePath[j].x &&
            this.shapePath[k].y === board[i].shapePath[j].y
          ) {
            return true;
          }
        }
      }
    }
    return false;
  }

  draw() {
    this.ctx.fillStyle = this.color;
    console.log(this.shapePath);
    this.shapePath.forEach((element) => {
      this.ctx.fillRect(
        element.x * this.scale,
        element.y * this.scale,
        this.scale,
        this.scale
      );
    });
  }

  update() {
    console.log(this.shapePath);
    this.shapePath.maxY = Math.max(
      ...this.shapePath.map((element) => element.y)
    );
    if (this.shapePath.maxY < this.canvas.height / this.scale - 1) {
      this.shapePath.forEach((element) => {
        element.y += this.vy;
      });
      console.log(this.isColliding(board));
      if (this.isColliding(board)) {
        this.shapePath.forEach((element) => {
          element.y -= this.vy;
        });
        this.vy = 0;
      }
    } else {
      this.vy = 0;
    }
  }

  rotate() {
    const xArray = this.shapePath.map((element) => element.x);
    let averageX = Math.round(
      xArray.reduce((acc, cur) => acc + cur, 0) / this.shapePath.length
    );
    averageX = Math.round(averageX);

    const yArray = this.shapePath.map((element) => element.y);
    let averageY = Math.round(
      yArray.reduce((acc, cur) => acc + cur, 0) / this.shapePath.length
    );
    averageY = Math.round(averageY);

    console.log(this.shapePath);
    const pivot = { x: averageX, y: averageY };
    console.log({ pivot });

    const newPath = this.shapePath.map((element) => {
      return rotateAround(element, pivot);
    });
    const tempShapePath = this.shapePath;

    const minX = Math.min(...newPath.map((element) => element.x));
    const maxX = Math.max(...newPath.map((element) => element.x));
    const maxY = Math.max(...newPath.map((element) => element.y));
    if (
      minX >= 0 &&
      maxX <= this.canvas.width / this.scale - 1 &&
      maxY <= this.canvas.height / this.scale - 1
    ) {
      this.shapePath = newPath;
      if (this.isColliding(board)) {
        this.shapePath = tempShapePath;
      }
    }
  }
  goDown() {
    this.shapePath.maxY = Math.max(
      ...this.shapePath.map((element) => element.y)
    );
    const tempShapePath = this.shapePath;
    const newPath = this.shapePath.map((element) => {
      if (this.shapePath.maxY > this.canvas.height / this.scale - 2) {
        return element;
      } else {
        element.y += 1;
        return element;
      }
    });
    this.shapePath = newPath;
    if (this.isColliding(board)) {
      this.shapePath.forEach((element) => {
        element.y -= 1;
      });
    }
  }
  goLeft() {
    this.shapePath.minX = Math.min(
      ...this.shapePath.map((element) => element.x)
    );

    const newPath = this.shapePath.map((element) => {
      if (this.shapePath.minX < 1) {
        return element;
      } else {
        element.x -= 1;
        return element;
      }
    });

    this.shapePath = newPath;
    if (this.isColliding(board)) {
      this.shapePath.forEach((element) => {
        element.x += 1;
      });
    }
  }

  goRight() {
    this.shapePath.maxX = Math.max(
      ...this.shapePath.map((element) => element.x)
    );

    const newPath = this.shapePath.map((element) => {
      if (this.shapePath.maxX > this.canvas.width / this.scale - 2) {
        return element;
      } else {
        element.x += 1;
        return element;
      }
    });

    this.shapePath = newPath;
    if (this.isColliding(board)) {
      this.shapePath.forEach((element) => {
        element.x -= 1;
      });
    }
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
        { x: 11, y: 0 },
        { x: 11, y: 1 },
        { x: 11, y: 2 },
        { x: 11, y: 3 },
      ];

      break;
    case "J":
      shapePath = [
        { x: 11, y: 0 },
        { x: 11, y: 1 },
        { x: 11, y: 2 },
        { x: 10, y: 2 },
      ];

      break;
    case "L":
      shapePath = [
        { x: 10, y: 0 },
        { x: 10, y: 1 },
        { x: 10, y: 2 },
        { x: 11, y: 2 },
      ];

      break;
    case "O":
      shapePath = [
        { x: 10, y: 0 },
        { x: 11, y: 0 },
        { x: 10, y: 1 },
        { x: 11, y: 1 },
      ];

      break;
    case "S":
      shapePath = [
        { x: 10, y: 0 },
        { x: 11, y: 0 },
        { x: 10, y: 1 },
        { x: 9, y: 1 },
      ];

      break;
    case "T":
      shapePath = [
        { x: 10, y: 0 },
        { x: 11, y: 0 },
        { x: 12, y: 0 },
        { x: 11, y: 1 },
      ];

      break;
    case "Z":
      shapePath = [
        { x: 10, y: 0 },
        { x: 11, y: 0 },
        { x: 10, y: 1 },
        { x: 11, y: 1 },
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
