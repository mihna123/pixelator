define("utils", () => {

  const gridWidth = Number(document.getElementById("width-input").value);
  const gridHeight = Number(document.getElementById("height-input").value);
  const getGridX = (x, canvas) => {
    const cellWidth = canvas.clientWidth / gridWidth;
    return Math.floor(x / cellWidth);
  }

  const getGridY = (y, canvas) => {
    const cellHeight = canvas.clientHeight / gridHeight;
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
