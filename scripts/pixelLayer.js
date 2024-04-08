define("pixelLayer", () => {
  class PixelLayer {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.cells = [];
      this.colorPicker = document.getElementById("color-picker");
      for (var i = 0; i < this.height * this.width; i++) {
        this.cells[i] = { value: "#ffffffff", isDirty: false };
      }
      this.active = false;
    }

    fillCell(x, y) {
      if (x < 0 || y < 0 || x > this.width || y > this.height) {
        return;
      }
      const cell = this.cells[x + y * this.width];
      if (cell === undefined) {
        return;
      }
      if (cell.value != this.colorPicker.value) {
        cell.value = this.colorPicker.value;
        cell.isDirty = true;
      }
    }
  }

  return PixelLayer;
});
