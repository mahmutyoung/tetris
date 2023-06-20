import { Tetromino } from "./Tetromino.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 600;
const unit = canvas.width / 20;
export const board = [];

function drawGrid() {
  ctx.strokeStyle = "white";
  ctx.lineWidth = 1;
  ctx.beginPath();
  for (let i = 0; i < canvas.width; i += unit) {
    ctx.moveTo(i, 0);
    ctx.lineTo(i, canvas.height);
  }
  for (let i = 0; i < canvas.height; i += unit) {
    ctx.moveTo(0, i);
    ctx.lineTo(canvas.width, i);
  }
  ctx.stroke();
}

/*
const myTetromino = new Tetromino(canvas,  "red", 0, 1);
const myTetromino1 = new Tetromino(canvas, "red", 0, 1);
console.log(myTetromino,myTetromino1);
myTetromino.draw();
myTetromino1.draw();
*/
document.addEventListener("keydown", (event) => {
  switch (event.code) {
    case "ArrowLeft":
      event.preventDefault();
      myTetromino.goLeft();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      myTetromino.draw();
      break;
    case "ArrowRight":
      event.preventDefault();
      myTetromino.goRight();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      myTetromino.draw();
      break;
    case "ArrowUp":
      event.preventDefault();
      myTetromino.rotate();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      myTetromino.draw();
      break;
    case "ArrowDown":
      event.preventDefault();
      myTetromino.goDown();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      myTetromino.draw();
      break;
    default:
      break;
  }
});
let myTetromino = new Tetromino(canvas, "red", 0, 1);
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  myTetromino.update();
  myTetromino.draw();
  board.forEach((element) => {
    element.draw();
  });
  drawGrid();
  console.log(board);

  console.log(
    "🚀 ~ file: main.js:88 ~ gameLoop ~ myTetromino:",
    myTetromino.vy
  );
  if (myTetromino.vy === 0) {
    console.log(
      "🚀 ~ file: main.js:88 ~ gameLoop ~ myTetromino:",
      myTetromino.vy
    );
    board.push(myTetromino);

    console.log("🚀 ~ file: main.js:88 ~ gameLoop ~ board:", board);
    let newTetromino = new Tetromino(canvas, "red", 0, 1);
    myTetromino = newTetromino;
    gameLoop();
  } else {
    setTimeout(gameLoop, 1000);
  }
}

gameLoop();
