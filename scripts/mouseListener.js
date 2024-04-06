define("mouseListener", () => {
  class MouseListener {
    constructor() {
      this.mousePressed = false;
    }
    Listen() {
      document.addEventListener("mousedown", () => this.mousePressed = true);
      document.addEventListener("mouseup", () => this.mousePressed = false);
      document.addEventListener("mouseout", () => this.mousePressed = false);
      document.addEventListener("mouseleave", () => this.mousePressed = false);
    }
  }
  return MouseListener;
});
