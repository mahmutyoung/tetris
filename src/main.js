import { Tetromino } from "./Tetromino.js";

export let board = [];
let score = 0;
//initialize game

const canvas = document.getElementById("canvas-screen");
const ctx = canvas.getContext("2d");
const scale = 40;
const width = 12;
const height = 18;
let vy = 1;
const colorZero = getRandom6Colors()[Math.round(Math.random() * 6)];
let myTetromino = new Tetromino(canvas, colorZero, vy, width, height, scale);
let newTetromino, nextTetromino;

gameLoop();

console.log(score);

function setupDisplay(Tetromino, score) {
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
  ctxDisp.fillText(`${Tetromino.type}`, 50, 200);
  ctxDisp.fillText(`${score}`, 20, 460);

  const newShape = Tetromino.shapePath.map((element) => {
    return {
      x: element.x,
      y: element.y,
    };
  });
  ctxDisp.fillStyle = "red";
  newShape.forEach((element) => {
    ctxDisp.fillRect(element.x * 50, element.y * 40, 50, 40);
  });
  /*
  ctxDisp.fillRect(10, 75, 30, 25);
  ctxDisp.fillRect(10, 100, 30, 25);
  ctxDisp.fillRect(10, 125, 30, 25);
  ctxDisp.fillRect(34, 125, 30, 25);
  ctxDisp.strokeStyle = "black";
  ctxDisp.lineWidth = 1;
  newShape.forEach((element) => {
    ctxDisp.strokeRect(element.x + 60, element.y + 80, 50, 30);
  });
  */
}

document.addEventListener("keydown", (event) => {
  //if (myTetromino.vy !== 0) {
    switch (event.code) {
      case "ArrowLeft":
        event.preventDefault();
        myTetromino.goLeft();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        myTetromino.draw();
        board.forEach((element) => drawSquare(element));
        break;
      case "ArrowRight":
        event.preventDefault();
        myTetromino.goRight();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        myTetromino.draw();
        board.forEach((element) => drawSquare(element));
        break;
      case "ArrowUp":
        event.preventDefault();
        myTetromino.rotate();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        myTetromino.draw();
        board.forEach((element) => drawSquare(element));
        break;
      case "ArrowDown":
        event.preventDefault();
        myTetromino.goDown();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        myTetromino.draw();
        board.forEach((element) => drawSquare(element));
        break;
      default:
        break;
    }
 // }
});

/**
 * Executes the game loop which updates the tetromino's position and board state,
 * and then clears the canvas and redraws the board and tetromino.
 */

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  board.forEach((element) => drawSquare(element));
  myTetromino.draw();
  myTetromino.update();
 

  const minY1 = Math.min(...myTetromino.shapePath.map((element) => element.y));

  if (minY1 ===1) {
    let color = getRandom6Colors()[Math.round(Math.random() * 6)];
    nextTetromino = new Tetromino(canvas, color, vy, width, height, scale);
    setupDisplay(nextTetromino, score);
  }

  //
  //add the last tetromino to the board as simpler 4 squares(points)
  if (myTetromino.vy === 0) {
    myTetromino.shapePath.forEach((element) => board.push(element));

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
    board.forEach((element) => drawSquare(element));
    setTimeout(gameLoop, 1000);
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
    arr.forEach((element) => element.y === i && counter++);
    if (counter === 12) {
      rowsToDelete.push(i);
    }
  }
  if (rowsToDelete.length > 0) {
    for (let j = 0; j < rowsToDelete.length; j++) {
      arr = arr.filter((element) => element.y !== rowsToDelete[j]);
    }
    arr = arr.map((element) => {
      if (element.y < rowsToDelete[rowsToDelete.length - 1]) {
        element.y += rowsToDelete.length;
      }
      return element;
    });
  }
  score += rowsToDelete.length * 20;
  return [arr, score];
}

function drawSquare(point) {
  ctx.fillStyle = "rgba(255, 70, 83)";
  ctx.fillRect(point.x * scale, point.y * scale, scale, scale);
  ctx.strokeStyle = "rgb(255, 255, 255)";
  ctx.lineWidth = 3;
  ctx.strokeRect(point.x * scale, point.y * scale, scale, scale);
}

/**
 * Generates an array of 6 random RGB colors.
 *
 * @return {Array} An array of 6 random RGB colors in string format.
 */
function getRandom6Colors() {
  const colors = [];
  for (let i = 0; i < 6; i++) {
    colors.push(getRandomColor());
  }
  return colors;
}
function getRandomColor() {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);
  let color = `rgb(${red}, ${green}, ${blue})`;
  return color;
}
