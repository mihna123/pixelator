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
        this.selection.offset = [x1, y1];
        const width = this.endXY[0] - this.startXY[0];
        const height = this.endXY[1] - this.startXY[1];
        this.selection.SetSize(width, height);
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
      for (let i = 0; i < this.selection.width; i++) {
        for (let j = 0; j < this.selection.height; j++) {
          const selCor = i + j * this.selection.width;
          const layCor = this.startXY[0] + i + (this.startXY[1] + j) * layer.width;

          const selCell = this.selection.cells[selCor];
          const layCell = layer.cells[layCor];
          selCell.value = layCell.value;
          selCell.isDirty = false;
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
      const [x, y] = this.startXY;

      ctx.strokeRect(x * cellWidth, y * cellHeight,
        this.selection.width * cellWidth, this.selection.height * cellHeight);
    }
  }
  return SelectTool;
});
