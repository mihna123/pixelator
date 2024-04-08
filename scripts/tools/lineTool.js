define(["shared", "utils"], (shared, utils) => {
  return class LineTool {
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
        const points = getLine(this.startXY, this.endXY);
        const layer = shared.layers[shared.activeLayer];
        points.forEach((p) => {
          layer.fillCell(p.x, p.y);
        });
      });


      const getLine = (start, end) => {
        let [x0, y0] = start;
        let [x1, y1] = end;
        let points = [];

        const dx = Math.abs(x1 - x0);
        const dy = Math.abs(y1 - y0);
        const sx = (x0 < x1) ? 1 : -1;
        const sy = (y0 < y1) ? 1 : -1;
        let err = dx - dy;

        while (true) {
          points.push({ x: x0, y: y0 });

          if (x0 === x1 && y0 === y1) break;

          const e2 = 2 * err;
          if (e2 > -dy) {
            err -= dy;
            x0 += sx;
          }
          if (e2 < dx) {
            err += dx;
            y0 += sy;
          }
        }

        return points;
      }

    }
  }
});
