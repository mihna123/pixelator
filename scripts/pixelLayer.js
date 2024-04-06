define("pixelLayer", () => {
  class PixelLayer {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.cells = [];
      for (var i = 0; i < this.height * this.width; i++) {
        this.cells[i] = { value: 0, isDirty: true };
      }
      this.active = false;
    }

    fillCell(x, y) {
      if (x < 0 || y < 0 || x > this.width || y > this.height) {
        return;
      }
      // TODO: Add color info eventualy
      this.cells[x + y * this.width] = { value: 1, isDirty: true };
    }
  }

  return PixelLayer;
});
