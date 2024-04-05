const GRID_WIDTH = 60;
const GRID_HEIGHT = 40;
let ctx;

const main = () => {
  console.log("Welcome to pixelator!");

  canvas = document.getElementById("main-canvas");
  ctx = canvas.getContext("2d");

  canvas.addEventListener("mousedown", canvasClick);
}

const canvasClick = (event) => {
  const bounds = canvas.getBoundingClientRect();
  const x = event.clientX - bounds.left;
  const y = event.clientY - bounds.top;

  let gridX = getGridX(x);
  let gridY = getGridY(y);

  ctx.fillRect(gridX, gridY, 10, 10);
}

const getGridX = (x) => {
  const cellWidth = canvas.clientWidth / GRID_WIDTH;
  return Math.floor(x / cellWidth) * cellWidth;
}

const getGridY = (y) => {
  const cellHeight = canvas.clientHeight / GRID_HEIGHT;
  return Math.floor(y / cellHeight) * cellHeight;
}

document.addEventListener("DOMContentLoaded", main)
