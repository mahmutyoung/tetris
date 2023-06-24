import { Tetromino } from "./Tetromino.js";

export let board = [];

//initialize game
const canvas = document.getElementById("canvas-screen");
const ctx = canvas.getContext("2d");
const scale = 40;
const width = 12;
const height = 18;
const color = getRandomColor();
let vy = 1;
let myTetromino = new Tetromino(canvas, color, vy, width, height, scale);

gameLoop();

document.addEventListener("keydown", (event) => {
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
});

/**
 * Executes the game loop which updates the tetromino's position and board state,
 * and then clears the canvas and redraws the board and tetromino.
 */
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  myTetromino.draw();
  myTetromino.update();
  board.forEach((element) => drawSquare(element));
  //
  //add the last tetromino to the board as simpler 4 squares(points)
  if (myTetromino.vy === 0) {
    myTetromino.shapePath.forEach((element) => board.push(element));
    //check whether the board is collapsable
    const filteredArr = collapseRows(board);
    if (filteredArr !== undefined) {
      board = filteredArr;
    }
    //draw the board
    board.forEach((element) => drawSquare(element));

    //check the game over condition and define the next game state
    const minY = Math.min(...myTetromino.shapePath.map((element) => element.y));
    if (minY !== 0) {
      const color = getRandom6Colors()[Math.round(Math.random() * 6)];
      let newTetromino = new Tetromino(canvas, color, vy, width, height, scale);
      myTetromino = newTetromino;
      gameLoop();
    }
  } else {
    setTimeout(gameLoop, 1000);
  }
}

/**
 * Collapse rows in an array if a row contains 20 elements.
 *
 * @param {Array} arr - The array to collapse rows from.
 * @return {Array} The modified array with collapsed rows.
 */
function collapseRows(arr) {
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
  return arr;
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
