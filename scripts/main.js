require(["pixelLayer", "shared", "constants", "events", "mouseListener"],
  (PixelLayer, shared, consts, events, MouseListener) => {

    console.log("Welcome to pixelator!");

    const canvas = document.getElementById("main-canvas");
    const ctx = canvas.getContext("2d");
    const initLayer = new PixelLayer(consts.GRID_WIDTH, consts.GRID_HEIGHT);
    initLayer.active = true;
    shared.layers.push(initLayer);
    const mouseListener = new MouseListener();
    mouseListener.Listen();

    const drawLoop = (ctx, canvas) => {
      const cellWidth = canvas.clientWidth / consts.GRID_WIDTH;
      const cellHeight = canvas.clientHeight / consts.GRID_HEIGHT;

      shared.layers.forEach(layer => {
        if (!layer.active) {
          return;
        }
        for (var i = 0; i < layer.width; i++) {
          for (var j = 0; j < layer.height; j++) {
            const cell = layer.cells[j * layer.width + i];
            if (cell.isDirty) {
              cell.isDirty = false;
              ctx.fillStyle = cell.value;
              ctx.fillRect(i * cellWidth, j * cellHeight, cellWidth, cellHeight);
            }
          }
        }
      });
    }

    canvas.addEventListener("mousemove", (e) => {
      if (mouseListener.mousePressed) {
        events.canvasClick(e, canvas)
      }
    });
    // draw once a second
    setInterval(() => drawLoop(ctx, canvas), 10);
  }
);
