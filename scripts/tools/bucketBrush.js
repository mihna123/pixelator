define(["utils", "shared"], (utils, shared) => {
  class BucketBrush {
    constructor(mouseListener) {
      this.mouseListener = mouseListener;
    }

    SetEvents() {
      this.mouseListener.ClearEvents();
      this.mouseListener.SetOnMouseClick((e) => {
        const [gridX, gridY] = utils.getEventXY(e, this.mouseListener.canvas);
        const layer = shared.layers[shared.activeLayer];
        this.Draw(layer, gridX, gridY);
      });

    }
    // TODO: optimize this is very bad
    Draw(layer, x, y) {
      const initVal = layer.cells[x + y * layer.width].value;

      const inside = (x, y) => {
        return x >= 0 && x < layer.width && y >= 0 && y < layer.height &&
          layer.cells[x + y * layer.width].value === initVal;
      }

      const stack = [];
      stack.push([x, x, y, 1]);
      stack.push([x, x, y - 1, -1]);

      while (stack.length !== 0) {
        const top = stack.shift();
        let x1 = top[0];
        const x2 = top[1];
        const y = top[2];
        const dy = top[3];
        let newX = x1;

        if (inside(newX, y)) {
          while (inside(newX - 1, y)) {
            layer.fillCell(newX - 1, y);
            newX--;
          }
          if (newX < x1) {
            stack.push([newX, x1 - 1, y - dy, -dy]);
          }
        }

        while (x1 <= x2) {
          while (inside(x1, y)) {
            layer.fillCell(x1, y);
            x1++;
          }
          if (x1 > newX) {
            stack.push([newX, x1 - 1, y + dy, dy]);
          }
          if (x1 - 1 > x2) {
            stack.push([x2 + 1, x1 - 1, y - dy, -dy]);
          }
          x1++;
          while (x1 < x2 && !inside(x1, y)) {
            x1++;
          }
          newX = x1;
        }
      }
    }
  }

  return BucketBrush;
});
