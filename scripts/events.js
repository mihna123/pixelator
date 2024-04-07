define("events", ["utils", "shared", "tools"],
  (utils, shared, tools) => {

    return {
      canvasClick: (event, canvas) => {
        const bounds = canvas.getBoundingClientRect();
        const x = event.clientX - bounds.left;
        const y = event.clientY - bounds.top;

        let gridX = utils.getGridX(x, canvas);
        let gridY = utils.getGridY(y, canvas);
        const layer = shared.layers[shared.activeLayer];

        tools.currentTool.Draw(layer, gridX, gridY);
      }
    }
  });
