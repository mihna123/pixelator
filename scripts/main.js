require(["pixelLayer", "shared", "constants", "mouseListener", "tools"],
  (PixelLayer, shared, consts, MouseListener, Tools) => {
    console.log("Welcome to pixelator!");

    const canvas = document.getElementById("main-canvas");
    const ctx = canvas.getContext("2d");
    const initLayer = new PixelLayer(consts.GRID_WIDTH, consts.GRID_HEIGHT);
    initLayer.active = true;

    shared.layers.push(initLayer);
    const mouseListener = new MouseListener(canvas);
    mouseListener.Listen();

    const tools = new Tools(mouseListener);

    const penBrushBtn = document.getElementById("pen-btn");
    const bucketBrushBtn = document.getElementById("bucket-btn");

    penBrushBtn.addEventListener("click", () => {
      tools.currentTool = tools.penBrush;
      tools.currentTool.SetEvents();
    });

    bucketBrushBtn.addEventListener("click", () => {
      tools.currentTool = tools.bucketBrush;
      tools.currentTool.SetEvents();
    });

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
    // draw once a second
    setInterval(() => drawLoop(ctx, canvas), 10);
  }
);
