define("utils", ["constants", "shared"], (constants, shared) => {
  const getGridX = (x, canvas) => {
    const cellWidth = canvas.clientWidth / constants.GRID_WIDTH;
    return Math.floor(x / cellWidth);
  }

  const getGridY = (y, canvas) => {
    const cellHeight = canvas.clientHeight / constants.GRID_HEIGHT;
    return Math.floor(y / cellHeight);
  }

  return {
    getGridX: getGridX,
    getGridY: getGridY,
    canvasClick: (event, canvas) => {
      const bounds = canvas.getBoundingClientRect();
      const x = event.clientX - bounds.left;
      const y = event.clientY - bounds.top;

      let gridX = getGridX(x, canvas);
      let gridY = getGridY(y, canvas);

      shared.layers[shared.activeLayer].fillCell(gridX, gridY);
    }
  }
});
