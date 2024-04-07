define("penBrush", () => {
  class PenBrush {
    constructor() {
      this.size = 1;
    }

    Draw(layer, x, y) {
      layer.fillCell(x, y);
    }
  }

  return PenBrush;
});
