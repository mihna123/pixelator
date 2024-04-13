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
        if (dir[0] == 0 && dir[1] === 0) {
          return;
        }
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
        const delPoinX = (dir[0] + layer.width) % layer.width;
        const delPoinY = (dir[1] + layer.height) % layer.height;
        let shouldRemove; //= 
        if (dir[0] >= 0 && dir[1] < 0) {
          shouldRemove = (i, j) => (i < delPoinX) || (j >= delPoinY);
        }
        else if (dir[0] > 0 && dir[1] >= 0) {
          shouldRemove = (i, j) => (i < delPoinX) || (j < delPoinY);
        }
        else if (dir[0] < 0 && dir[1] > 0) {
          shouldRemove = (i, j) => (i >= delPoinX) || (j < delPoinY);
        }
        else if (dir[0] < 0 && dir[1] < 0) {
          shouldRemove = (i, j) => (i >= delPoinX) || (j >= delPoinY);
        }
        else if (dir[0] < 0 && dir[1] === 0) {
          shouldRemove = (i, _) => (i >= delPoinX);
        }
        else if (dir[0] === 0 && dir[1] > 0) {
          shouldRemove = (_, j) => (j <= delPoinY);
        }
        console.log({ delPoinX, delPoinY, dir });
        for (let i = 0; i < layer.width; i++) {
          for (let j = 0; j < layer.height; j++) {
            if (shouldRemove(i, j)) {
              // TODO removing val should be cell value of the layer maybe
              layer.cells[i + j * layer.width].value = "#00000000";
              layer.cells[i + j * layer.width].isDirty = true;
            }
          }
        }
      });
    }
  }

  return MoveTool;
});
