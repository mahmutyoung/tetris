import { Tetromino } from "./Tetromino.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const scale = 20;
canvas.width = 20 * scale;
canvas.height = 30 * scale;

export const board = [];

function drawGrid() {
  ctx.strokeStyle = "white";
  ctx.lineWidth = 1;
  ctx.beginPath();
  for (let i = 0; i < canvas.width; i += scale) {
    ctx.moveTo(i, 0);
    ctx.lineTo(i, canvas.height);
  }
  for (let i = 0; i < canvas.height; i += scale) {
    ctx.moveTo(0, i);
    ctx.lineTo(canvas.width, i);
  }
  ctx.stroke();
}

document.addEventListener("keydown", (event) => {
  switch (event.code) {
    case "ArrowLeft":
      event.preventDefault();
      myTetromino.goLeft();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      myTetromino.draw();
      board.forEach((element) => {
        element.draw();
      });
      break;
    case "ArrowRight":
      event.preventDefault();
      myTetromino.goRight();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      myTetromino.draw();
      board.forEach((element) => {
        element.draw();
      });
      break;
    case "ArrowUp":
      event.preventDefault();
      myTetromino.rotate();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      myTetromino.draw();
      board.forEach((element) => {
        element.draw();
      });
      break;
    case "ArrowDown":
      event.preventDefault();
      myTetromino.goDown();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      myTetromino.draw();
      board.forEach((element) => {
        element.draw();
      });
      break;
    default:
      break;
  }
});
let myTetromino = new Tetromino(canvas, "rgb(255, 190, 90,0.7)", 1, 20, 30, 20);
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  myTetromino.draw();
  myTetromino.update();
  Tetromino.collapseRows(board);
  board.forEach((element) => {
    element.draw();
  });

  //drawGrid();
  console.log(board);

  if (myTetromino.vy === 0) {
    console.log(myTetromino);
    const minY = Math.min(...myTetromino.shapePath.map((element) => element.y));
    board.push(myTetromino);
    Tetromino.collapseRows(board);
    board.forEach((element) => {
      element.draw();
    });

    if (minY !== 0) {
      let newTetromino = new Tetromino(canvas, "red", 1, 20, 30, 20);
      myTetromino = newTetromino;

      console.log(myTetromino);
      gameLoop();
    }
  } else {
    setTimeout(gameLoop, 1000);
  }
}

gameLoop();
