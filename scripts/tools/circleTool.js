define(["shared", "utils"], (shared, utils) => {
  return class CircleTool {
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
        const points = getCircle(this.startXY, this.endXY);
        const layer = shared.layers[shared.activeLayer];
        points.forEach((p) => {
          layer.fillCell(p.x, p.y);
        });
      });

      const getCircle = (start, end) => {
        let [x0, y0] = start;
        let [x1, y1] = end;
        let points = [];

        // Calculate center and semi-axes lengths
        const xc = Math.floor((x0 + x1) / 2);
        const yc = Math.floor((y0 + y1) / 2);
        const rx = Math.floor(Math.abs(x1 - x0) / 2);
        const ry = Math.floor(Math.abs(y1 - y0) / 2);

        let x = 0;
        let y = ry;

        // Initial decision parameter of region 1
        let d1 = (ry * ry) - (rx * rx * ry) + (0.25 * rx * rx);
        let dx = 2 * ry * ry * x;
        let dy = 2 * rx * rx * y;

        while (dx < dy) {
          points.push({ x: x + xc, y: y + yc });
          points.push({ x: -x + xc, y: y + yc });
          points.push({ x: x + xc, y: -y + yc });
          points.push({ x: -x + xc, y: -y + yc });

          x++;
          dx += 2 * ry * ry;
          d1 += dx + (ry * ry);

          if (d1 >= 0) {
            y--;
            dy -= 2 * rx * rx;
            d1 -= dy;
          }
        }

        // Decision parameter of region 2
        let d2 = ((ry * ry) * ((x + 0.5) * (x + 0.5))) +
          ((rx * rx) * ((y - 1) * (y - 1))) - (rx * rx * ry * ry);

        while (y >= 0) {
          points.push({ x: x + xc, y: y + yc });
          points.push({ x: -x + xc, y: y + yc });
          points.push({ x: x + xc, y: -y + yc });
          points.push({ x: -x + xc, y: -y + yc });

          y--;
          dy -= 2 * rx * rx;
          d2 += (rx * rx) - dy;

          if (d2 <= 0) {
            x++;
            dx += 2 * ry * ry;
            d2 += dx;
          }
        }

        return points;
      }
    }
  }
});
