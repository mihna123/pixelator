define("utils", ["constants"], (constants) => {
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
  }
});
