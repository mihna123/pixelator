define(["utils", "shared"], (utils, shared) => {
  class MoveTool {
    constructor(mouseListener) {
      this.mouseListener = mouseListener;
      this.startXY = [0, 0];
      this.endXY = [0, 0];
    }
    SetEvents() {
      this.mouseListener.ClearEvents();
      this.mouseListener.SetOnMouseDown((e) => {
        this.startXY = utils.getEventXY(e, this.mouseListener.canvas);
        this.endXY = utils.getEventXY(e, this.mouseListener.canvas);
      });
      this.mouseListener.SetOnMouseReleased((e) => {
        this.endXY = utils.getEventXY(e, this.mouseListener.canvas);
        const layer = shared.layers[shared.activeLayer];

        // dir is vec2 - vec1 
        const dir = [this.endXY[0] - this.startXY[0],
        this.endXY[1] - this.startXY[1]];
        // Iterate all pixels
        // Determine the iteration order based on the direction
        const [start, end, step] = (dir[1] <= 0 && dir[0] <= 0)
          || (dir[1] < 0 && dir[0] > 0)
          ? [0, layer.width * layer.height, 1]
          : [layer.width * layer.height - 1, -1, -1];

        for (let i = start; i !== end; i += step) {
          const x = i % layer.width;
          const y = Math.floor(i / layer.width);

          // Calculate new coordinates based on the direction
          const newX = x + dir[0];
          const newY = y + dir[1];

          // Check if new coordinates are within the grid
          if (newX >= 0 && newX < layer.width && newY >= 0 && newY < layer.height) {
            const newIdx = newX + newY * layer.width;
            layer.cells[newIdx].value = layer.cells[i].value;
            layer.cells[newIdx].isDirty = true;
          }
        }

        // Clean up old cells
        const remStart = Math.abs(start - (layer.cells.length - 1));
        const remEnd = Math.abs(end - (layer.cells.length - 1)) - 1;
        const remStep = -step;
        for (let i = remStart; i !== remEnd; i += remStep) {
          const x = i % layer.width;
          const y = Math.floor(i / layer.width);
          const shouldRemove = remStep > 0
            ? x < dir[0] || y < dir[1]
            : x > layer.width + dir[0] - 1 || y > layer.height + dir[1] - 1;
          if (shouldRemove) {
            layer.cells[x + y * layer.width].value = "#ffffffff";
            layer.cells[x + y * layer.width].isDirty = true;
          }
          if (i >= layer.cells.length || i < 0) {
            break;
          }
        }
      });
    }
  }

  return MoveTool;
});
