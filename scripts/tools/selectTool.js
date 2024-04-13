define(["shared", "utils", "pixelLayer"], (shared, utils, PixelLayer) => {
  class SelectTool {
    constructor(mouseListener) {
      this.mouseListener = mouseListener;
      this.startXY = [0, 0];
      this.endXY = [0, 0];
      this.selection = new PixelLayer();
    }

    SetEvents() {
      this.mouseListener.ClearEvents();
      this.mouseListener.SetOnMouseDown((e) => {
        this.startXY = utils.getEventXY(e, this.mouseListener.canvas);
        this.endXY = utils.getEventXY(e, this.mouseListener.canvas);
      });
      this.mouseListener.SetOnMouseReleased((e) => {
        this.endXY = utils.getEventXY(e, this.mouseListener.canvas);

        // Making sure that start is top left corner and end is bottom right
        const [x1, x2] = this.startXY[0] < this.endXY[0]
          ? [this.startXY[0], this.endXY[0]]
          : [this.endXY[0], this.startXY[0]];
        const [y1, y2] = this.startXY[1] < this.endXY[1]
          ? [this.startXY[1], this.endXY[1]]
          : [this.endXY[1], this.startXY[1]];
        this.startXY = [x1, y1];
        this.endXY = [x2, y2];
        console.log(this.selection);

        this.fillSelection();
        this.selection.active = true;
        shared.layers[shared.activeLayer].active = false;
        shared.layers.push(this.selection);
        shared.activeLayer++;
        this.drawSelectionOuline();
        // TODO: make tools work with these selection layers
        // Incorporate layer offsets into all tools to make the math work
      });
    }

    fillSelection() {
      const layer = shared.layers[shared.activeLayer];
      const [width, height] = [layer.width, layer.height];
      const [startX, endX] = [this.startXY[0], this.endXY[0]];
      const [startY, endY] = [this.startXY[1], this.endXY[1]];
      for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {
          const cor = i + j * width;
          const selCell = this.selection.cells[cor];
          if (i < startX || i > endX || j < startY || j > endY) {
            selCell.value = -1;
            continue;
          }
          const layCell = layer.cells[cor];
          selCell.value = layCell.value;
          selCell.isDirty = false;
          console.log("val");
        }
      }
    }

    drawSelectionOuline() {
      const canvas = document.getElementById("main-canvas");
      const gridWidth = Number(document.getElementById("width-input").value);
      const gridHeight = Number(document.getElementById("height-input").value);
      const cellWidth = canvas.clientWidth / gridWidth;
      const cellHeight = canvas.clientHeight / gridHeight;
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "#000000ff";
      const [x1, y1] = this.startXY;
      const [x2, y2] = this.endXY;

      ctx.strokeRect(x1 * cellWidth, y1 * cellHeight,
        (x2 - x1) * cellWidth, (y2 - y1) * cellHeight);
    }
  }
  return SelectTool;
});
