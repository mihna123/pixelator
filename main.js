let canvas;
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

  ctx.fillRect(x - 5, y - 5, 10, 10);
}

document.addEventListener("DOMContentLoaded", main)
