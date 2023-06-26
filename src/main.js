import { Tetromino } from "./Tetromino.js";

export let board = [];
let score = 0;
//initialize game
let colors = [
  "rgb(128, 0, 0)",
  "rgb(250, 128, 114)",
  "rgb(0, 128, 45)",
  "rgb(0, 128, 128)",
  "rgb(236, 153, 0)",
  "rgb(62, 0, 128)",
];
const canvas = document.getElementById("canvas-screen");
const ctx = canvas.getContext("2d");
const scale = 40;
const width = 12;
const height = 18;
let vy = 1;
const colorZero = colors[Math.round(Math.random() * 6)];
let myTetromino = new Tetromino(canvas, colorZero, vy, width, height, scale);
let newTetromino, nextTetromino;

gameLoop();

console.log(score);

function setupDisplay(tetromino, score) {
  const canvasDisp = document.getElementById("canvas-displayer");
  canvasDisp.width = 200;
  canvasDisp.height = 600;
  const ctxDisp = canvasDisp.getContext("2d");
  ctxDisp.fillStyle = "White";
  ctxDisp.font = "40px Monospace";
  ctxDisp.fillText("NEXT", 10, 40);

  ctxDisp.fillText("SCORE", 10, 320);

  ctxDisp.fillRect(0, 60, canvasDisp.width, canvasDisp.height / 3);
  ctxDisp.fillRect(0, 340, canvasDisp.width, canvasDisp.height / 3);
  ctxDisp.fillStyle = "black";
  ctxDisp.fillText(`${score}`, 20, 460);
  const newShape = tetromino.shapePath;
  ctxDisp.fillStyle = `${tetromino.color}`;
  newShape.forEach((element) => {
    ctxDisp.fillRect(element.x * 36 - 120, element.y * 30 + 120, 34, 28);
  });
}

document.addEventListener("keydown", (event) => {
  switch (event.code) {
    case "ArrowLeft":
      event.preventDefault();
      myTetromino.goLeft();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      myTetromino.draw();
      board.forEach((element) => drawSquare(element.point, element.color));
      break;
    case "ArrowRight":
      event.preventDefault();
      myTetromino.goRight();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      myTetromino.draw();
      board.forEach((element) => drawSquare(element.point, element.color));
      break;
    case "ArrowUp":
      event.preventDefault();
      myTetromino.rotate();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      myTetromino.draw();
      board.forEach((element) => drawSquare(element.point, element.color));
      break;
    case "ArrowDown":
      event.preventDefault();
      myTetromino.goDown();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      myTetromino.draw();
      board.forEach((element) => drawSquare(element.point, element.color));
      break;
    default:
      break;
  }
});

/**
 * Executes the game loop which updates the tetromino's position and board state,
 * and then clears the canvas and redraws the board and tetromino.
 */

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  myTetromino.draw();
  board.forEach((element) => drawSquare(element.point, element.color));

  myTetromino.update();

  const minY1 = Math.min(...myTetromino.shapePath.map((element) => element.y));

  if (minY1 === 1) {
    const color = colors[Math.round(Math.random() * 6)];
    nextTetromino = new Tetromino(canvas, color, vy, width, height, scale);
    setupDisplay(nextTetromino, score);
  }

  //
  //add the last tetromino to the board as simpler 4 squares(points)
  if (myTetromino.vy === 0) {
    myTetromino.shapePath.forEach((point) =>
      board.push({ point: point, color: myTetromino.color })
    );
    console.log(board);
    //check whether the board is collapsable
    const [filteredArr, newScore] = collapseRows(board, score);
    if (newScore !== undefined) {
      score = newScore;
    }

    if (filteredArr !== undefined) {
      board = filteredArr;
    }
    //draw the board

    newTetromino = nextTetromino;
    //check the game over condition and define the next game state
    const minY = Math.min(...myTetromino.shapePath.map((element) => element.y));
    if (minY !== 0) {
      myTetromino = newTetromino;
      gameLoop();
    }
  } else {
    board.forEach((element) => drawSquare(element.point, element.color));
    setTimeout(gameLoop, 1000 - Math.round(score / 100) * 25);
  }
}

/**
 * Collapse rows in an array if a row contains 12 elements.
 *
 * @param {Array} arr - The array to collapse rows from.
 * @return {Array} The modified array with collapsed rows.
 */
function collapseRows(arr, score) {
  const rowsToDelete = [];

  for (let i = 17; i >= 0; i--) {
    let counter = 0;
    arr.forEach((element) => element.point.y === i && counter++);
    if (counter === 12) {
      rowsToDelete.push(i);
    }
  }
  if (rowsToDelete.length > 0) {
    for (let j = 0; j < rowsToDelete.length; j++) {
      arr = arr.filter((element) => element.point.y !== rowsToDelete[j]);
    }
    arr = arr.map((element) => {
      if (element.point.y < rowsToDelete[rowsToDelete.length - 1]) {
        element.point.y += rowsToDelete.length;
      }
      return element;
    });
  }
  if (rowsToDelete.length > 0) {
    score +=
      rowsToDelete.length * 20 +
      (rowsToDelete.length * rowsToDelete.length - 1) * 5;
  }
  return [arr, score];
}

function drawSquare(point, color) {
  ctx.fillStyle = `${color}`;
  ctx.fillRect(point.x * scale, point.y * scale, scale, scale);
  ctx.strokeStyle = "rgb(255, 255, 255)";
  ctx.lineWidth = 3;
  ctx.strokeRect(point.x * scale, point.y * scale, scale, scale);
}
