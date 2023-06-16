import Tetromino from "./Tetromino.js";
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 600;
const unit = canvas.width / 20;

let arr = [1, 2, 3];

const arr1 = arr.map((item) => {
  return item + 1;
});

console.log(arr);
console.log(arr1);

const myTetromino = new Tetromino(
  canvas,
  [
    { x: 11 * unit, y: unit },
    { x: 13 * unit, y: unit },
    { x: 13 * unit, y: 2 * unit },
    { x: 14 * unit, y: 2 * unit },
    { x: 14 * unit, y: 3 * unit },
    { x: 12 * unit, y: 3 * unit },
    { x: 12 * unit, y: 2 * unit },
    { x: 11 * unit, y: 2 * unit },
  ],
  "Z",
  "red",
  0,
  1
);

myTetromino.draw();

document.addEventListener("keydown", (event) => {
  //canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (event.code === "ArrowUp") {
    event.preventDefault();
    myTetromino.rotate();
  }
  if (event.code === "ArrowDown") {
    event.preventDefault();
    myTetromino.shapePath.forEach((element) => {
      element.y += unit;
    });
  }
  myTetromino.draw();
  console.log(myTetromino);
});

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  myTetromino.draw();
  myTetromino.update();

  console.log("game loop");
  console.log(myTetromino);
}

const idX = setInterval(gameLoop, 1000);
() => clearInterval(idX);
