const GRID_WIDTH = 60;
const GRID_HEIGHT = 40;
const layers = [];
let canvas;

const main = () => {
  console.log("Welcome to pixelator!");

  canvas = document.getElementById("main-canvas");
  const ctx = canvas.getContext("2d");
  const initLayer = new PixelLayer(GRID_WIDTH, GRID_HEIGHT);
  initLayer.active = true;
  layers.push(initLayer);

  canvas.addEventListener("mousedown", canvasClick);
  // draw once a second
  const loop = setInterval(() => drawLoop(ctx), 1000);
}

const canvasClick = (event) => {
  const bounds = canvas.getBoundingClientRect();
  const x = event.clientX - bounds.left;
  const y = event.clientY - bounds.top;

  let gridX = getGridX(x);
  let gridY = getGridY(y);

  layers[0].fillCell(gridX, gridY);
}

const getGridX = (x) => {
  const cellWidth = canvas.clientWidth / GRID_WIDTH;
  return Math.floor(x / cellWidth);
}

const getGridY = (y) => {
  const cellHeight = canvas.clientHeight / GRID_HEIGHT;
  return Math.floor(y / cellHeight);
}

const drawLoop = (ctx) => {
  const cellWidth = canvas.clientWidth / GRID_WIDTH;
  const cellHeight = canvas.clientHeight / GRID_HEIGHT;

  layers.forEach(layer => {
    if (!layer.active) {
      return;
    }
    for (var i = 0; i < layer.width; i++) {
      for (var j = 0; j < layer.height; j++) {
        if (layer.cells[j * layer.width + i] === 1) {
          ctx.fillRect(i * cellWidth, j * cellHeight, cellWidth, cellHeight);
        }
      }
    }
  });
}

class PixelLayer {
  width;
  height;
  cells = [];
  active;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    for (var i = 0; i < this.height * this.width; i++) {
      this.cells[i] = 0;
    }
    this.active = false;
  }

  fillCell(x, y) {
    if (x < 0 || y < 0 || x > this.width || y > this.height) {
      return;
    }
    // TODO: Add color info eventualy
    this.cells[x + y * this.width] = 1;
  }
}

document.addEventListener("DOMContentLoaded", main)
