define("events", ["utils", "shared", "brushes"], (utils, shared, brushes) => {

  return {
    canvasClick: (event, canvas) => {
      const bounds = canvas.getBoundingClientRect();
      const x = event.clientX - bounds.left;
      const y = event.clientY - bounds.top;

      let gridX = utils.getGridX(x, canvas);
      let gridY = utils.getGridY(y, canvas);
      const layer = shared.layers[shared.activeLayer];

      brushes.currentBrush.Draw(layer, gridX, gridY);
    }
  }
});
