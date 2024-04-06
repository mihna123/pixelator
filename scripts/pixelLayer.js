define("pixelLayer", () => {
  class PixelLayer {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.cells = [];
      this.colorPicker = document.getElementById("color-picker");
      for (var i = 0; i < this.height * this.width; i++) {
        this.cells[i] = { value: 0, isDirty: false };
      }
      this.active = false;
    }

    fillCell(x, y) {
      if (x < 0 || y < 0 || x > this.width || y > this.height) {
        return;
      }
      this.cells[x + y * this.width] = {
        value: this.colorPicker.value,
        isDirty: true
      };
    }
  }

  return PixelLayer;
});
