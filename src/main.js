import { Tetromino } from "./Tetromino.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const scale = 20;
canvas.width = 20 * scale;
canvas.height = 30 * scale;

export let board = [];
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
        drawSquare(element);
      });
      break;
    case "ArrowRight":
      event.preventDefault();
      myTetromino.goRight();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      myTetromino.draw();
      board.forEach((element) => {
        drawSquare(element);
      });
      break;
    case "ArrowUp":
      event.preventDefault();
      myTetromino.rotate();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      myTetromino.draw();
      board.forEach((element) => {
        drawSquare(element);
      });
      break;
    case "ArrowDown":
      event.preventDefault();
      myTetromino.goDown();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      myTetromino.draw();
      board.forEach((element) => {
        drawSquare(element);
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
  console.log(myTetromino);
  board.forEach((element) => {
    drawSquare(element);
  });

  //drawGrid();
  console.log(board);

  if (myTetromino.vy === 0) {
    console.log(myTetromino);
    const minY = Math.min(...myTetromino.shapePath.map((element) => element.y));

    myTetromino.shapePath.forEach((element) => {
      board.push(element);
    });
    console.log(board);
    const filteredArr = collapseRows(board);

    console.log(filteredArr);
    if (filteredArr !== undefined) {
      board = filteredArr;
    }
    board.forEach((element) => {
      drawSquare(element);
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

function collapseRows(arr) {
  let filteredArr;
  for (let i = 29; i >= 0; i--) {
    let counter = 0;
    arr.forEach((element) => {
      if (element.y === i) {
        counter++;
        console.log({ i, counter });
      }
    });

    if (counter === 20) {
      filteredArr = arr.filter((element) => {
        return element.y !== i;
      });
    }
  }
  return filteredArr;
}

function drawSquare(point) {
  ctx.fillStyle = "rgba(255, 70, 83)";
  ctx.fillRect(point.x * scale, point.y * scale, scale, scale);
  ctx.strokeStyle = "white";
  ctx.lineWidth = 2;
  ctx.strokeRect(point.x * scale, point.y * scale, scale, scale);
}
