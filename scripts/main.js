require(["pixelLayer", "shared", "mouseListener", "tools"],
  (PixelLayer, shared, MouseListener, Tools) => {
    console.log("Welcome to pixelator!");

    const canvas = document.getElementById("main-canvas");
    const gridWidth = Number(document.getElementById("width-input").value);
    const gridHeight = Number(document.getElementById("height-input").value);
    canvas.width = canvas.height * (gridWidth / gridHeight);
    const ctx = canvas.getContext("2d");
    const initLayer = new PixelLayer();
    initLayer.active = true;

    shared.layers.push(initLayer);
    const mouseListener = new MouseListener(canvas);
    mouseListener.Listen();

    const tools = new Tools(mouseListener);

    const penBrushBtn = document.getElementById("pen-btn");
    const bucketBrushBtn = document.getElementById("bucket-btn");
    const lineToolBtn = document.getElementById("line-btn");
    const circleToolBtn = document.getElementById("circle-btn");
    const moveToolBtn = document.getElementById("move-btn");
    const selectToolBtn = document.getElementById("select-btn");
    const newBtn = document.getElementById("new-btn");
    const newSpriteForm = document.getElementById("new-sprite-form");
    const newSpriteBtn = document.getElementById("new-sprite-btn");
    const cancelSpriteBtn = document.getElementById("cancel-new-btn");


    cancelSpriteBtn.addEventListener("click", () => {
      newSpriteForm.style["display"] = "none";
    });

    newSpriteBtn.addEventListener("click", () => {
      if (confirm("You will lose your current sprite")) {
        window.location.reload();
      }
    });

    newBtn.addEventListener("click", () => {
      newSpriteForm.style["display"] = "initial";
    });

    selectToolBtn.addEventListener("click", () => {
      tools.currentTool = tools.selectTool;
      tools.currentTool.SetEvents();
    });

    penBrushBtn.addEventListener("click", () => {
      tools.currentTool = tools.penBrush;
      tools.currentTool.SetEvents();
    });

    bucketBrushBtn.addEventListener("click", () => {
      tools.currentTool = tools.bucketBrush;
      tools.currentTool.SetEvents();
    });

    lineToolBtn.addEventListener("click", () => {
      tools.currentTool = tools.lineTool;
      tools.currentTool.SetEvents();
    });

    circleToolBtn.addEventListener("click", () => {
      tools.currentTool = tools.circleTool;
      tools.currentTool.SetEvents();
    });

    moveToolBtn.addEventListener("click", () => {
      tools.currentTool = tools.moveTool;
      tools.currentTool.SetEvents();
    });

    const drawLoop = (ctx, canvas) => {
      const cellWidth = canvas.clientWidth / gridWidth;
      const cellHeight = canvas.clientHeight / gridHeight;

      shared.layers.forEach(layer => {
        if (!layer.active) {
          return;
        }
        for (var i = 0; i < layer.width; i++) {
          for (var j = 0; j < layer.height; j++) {
            const cell = layer.cells[j * layer.width + i];
            if (cell.isDirty) {
              cell.isDirty = false;
              if (cell.value === -1) {
                continue;
              }
              if (cell.value === "#00000000") {
                ctx.clearRect(i * cellWidth, j * cellHeight, cellWidth, cellHeight);
                continue;
              }
              ctx.fillStyle = cell.value;
              ctx.strokeStyle = cell.value;
              ctx.fillRect(i * cellWidth, j * cellHeight, cellWidth, cellHeight);
            }
          }
        }
      });
    }

    setInterval(() => drawLoop(ctx, canvas), 10);
  }
);
