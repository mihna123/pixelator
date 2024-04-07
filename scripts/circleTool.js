define("circleTool", ["shared", "utils"], (shared, utils) => {
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
          console.log(p);
          layer.fillCell(p.x, p.y);
        });
      });

      // TODO: fix this broken ahh thrash
      const getCircle = (start, end) => {
        let [x0, y0] = start;
        let [x1, y1] = end;
        let points = [];

        // Calculate center and semi-axes lengths
        const xc = (x0 + x1) / 2;
        const yc = (y0 + y1) / 2;
        const rx = Math.abs(x1 - x0) / 2;
        const ry = Math.abs(y1 - y0) / 2;

        let x = 0;
        let y = ry;

        // Region 1
        let dx = 0;
        let dy = 2 * rx * rx * y;

        let d1 = (ry * ry) - (rx * rx * ry) + (0.25 * rx * rx);
        let deltaE = 2 * ry * ry * (x + 1);
        let deltaSE = 2 * rx * rx * (y - 1);

        while (dx < dy) {
          points.push({ x: x + xc, y: y + yc });
          points.push({ x: -x + xc, y: y + yc });
          points.push({ x: x + xc, y: -y + yc });
          points.push({ x: -x + xc, y: -y + yc });

          x++;
          dx += deltaE;
          d1 += dx + (ry * ry);

          if (d1 >= 0) {
            y--;
            dy -= deltaSE;
            d1 -= dy;
          }
        }

        // Region 2
        let d2 = ((ry * ry) * ((x + 0.5) * (x + 0.5))) + ((rx * rx) * ((y - 1) * (y - 1))) - (rx * rx * ry * ry);

        while (y >= 0) {
          points.push({ x: x + xc, y: y + yc });
          points.push({ x: -x + xc, y: y + yc });
          points.push({ x: x + xc, y: -y + yc });
          points.push({ x: -x + xc, y: -y + yc });

          y--;
          dy -= deltaSE;

          if (d2 > 0) {
            x++;
            dx += deltaE;
            d2 += dx - dy + (rx * rx);
          } else {
            d2 += dx + (rx * rx);
          }
        }

        return points;
      }
    }
  }
});
