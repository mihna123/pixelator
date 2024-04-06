define("events", ["utils", "shared"], (utils, shared) => {

  return {
    canvasClick: (event, canvas) => {
      const bounds = canvas.getBoundingClientRect();
      const x = event.clientX - bounds.left;
      const y = event.clientY - bounds.top;

      let gridX = utils.getGridX(x, canvas);
      let gridY = utils.getGridY(y, canvas);

      shared.layers[shared.activeLayer].fillCell(gridX, gridY);
    }
  }
});
