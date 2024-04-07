define("mouseListener", () => {
  class MouseListener {
    constructor(canvas) {
      this.mousePressed = false;
      this.onMouseDownAndMoving = (e) => { };
      this.onMouseDown = (e) => { };
      this.onMouseReleased = (e) => { };
      this.onMouseClick = (e) => { };
      this.canvas = canvas;
    }

    Listen() {
      document.addEventListener("mousedown", () => this.mousePressed = true);
      document.addEventListener("mouseup", () => this.mousePressed = false);
      document.addEventListener("mouseout", () => this.mousePressed = false);
      document.addEventListener("mouseleave", () => this.mousePressed = false);

      this.canvas.addEventListener("mousemove", (e) => {
        if (this.mousePressed) {
          this.onMouseDownAndMoving(e);
        }
      });
      this.canvas.addEventListener("mousedown", (e) => {
        this.onMouseDown(e);
      });
      this.canvas.addEventListener("click", (e) => {
        this.onMouseClick(e);
      });
      this.canvas.addEventListener("mouseup", (e) => {
        this.onMouseReleased(e);
      })
    }

    SetOnMouseDownAndMoving(func) {
      this.onMouseDownAndMoving = func;
    }
    SetOnMouseDown(func) {
      this.onMouseDown = func;
    }
    SetOnMouseReleased(func) {
      this.onMouseReleased = func;
    }
    SetOnMouseClick(func) {
      this.onMouseClick = func;
    }

    ClearEvents() {
      this.onMouseDownAndMoving = (e) => { };
      this.onMouseDown = (e) => { };
      this.onMouseReleased = (e) => { };
      this.onMouseClick = (e) => { };
    }
  }
  return MouseListener;
});
