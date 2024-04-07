define("utils", ["constants"], (constants) => {
  const getGridX = (x, canvas) => {
    const cellWidth = canvas.clientWidth / constants.GRID_WIDTH;
    return Math.floor(x / cellWidth);
  }

  const getGridY = (y, canvas) => {
    const cellHeight = canvas.clientHeight / constants.GRID_HEIGHT;
    return Math.floor(y / cellHeight);
  }

  const getEventXY = (e, canvas) => {
    const bounds = canvas.getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const y = e.clientY - bounds.top;

    let gridX = getGridX(x, canvas);
    let gridY = getGridY(y, canvas);
    return [gridX, gridY];
  }

  return {
    getGridX: getGridX,
    getGridY: getGridY,
    getEventXY: getEventXY
  }
});
