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
        let startPos;
        let di; // This is iteration direction
        let isNotDone = (i) => false;

        // Check if direction is up or down
        // down
        if (dir[1] < 0) {
          startPos = layer.width * layer.height;
          di = -1;
          isNotDone = (i) => i >= 0;
        }
        // up
        else if (dir[1] > 0) {
          startPos = 0;
          di = 1;
          isNotDone = (i) => i < layer.width * layer.height;
        }
        //TODO
        else {

        }
        // Iterate all pixels
        for (let i = startPos; isNotDone(i); i += di) {
          const cellCor = i + dir[0] + dir[1] * layer.width;
          if (cellCor < 0 || cellCor >= layer.width * layer.height) {
            continue;
          }
          const cellToChange = layer.cells[cellCor];
          cellToChange.value = layer.cells[i].value;
          cellToChange.isDirty = true;
        }
      });
    }
  }

  return MoveTool;
});
