define("pixelLayer", () => {
  class PixelLayer {
    constructor() {
      this.width = Number(document.getElementById("width-input").value);
      this.height = Number(document.getElementById("height-input").value);
      this.cells = [];
      this.colorPicker = document.getElementById("color-picker");
      for (var i = 0; i < this.height * this.width; i++) {
        this.cells[i] = { value: "#ffffffff", isDirty: false };
      }
      this.active = false;
      this.offset = [0, 0];
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

    SetSize(w, h) {
      this.width = w;
      this.height = h;
    }
  }

  return PixelLayer;
});
