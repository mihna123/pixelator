define(["utils", "shared"], (utils, shared) => {
  class PenBrush {
    constructor(mouseListener) {
      this.mouseListener = mouseListener;
      this.size = 1;
    }

    SetEvents() {
      this.mouseListener.ClearEvents();
      this.mouseListener.SetOnMouseDownAndMoving((e) => {
        const [gridX, gridY] = utils.getEventXY(e, this.mouseListener.canvas);
        const layer = shared.layers[shared.activeLayer];
        this.Draw(layer, gridX, gridY);
      });
      this.mouseListener.SetOnMouseClick((e) => {
        const [gridX, gridY] = utils.getEventXY(e, this.mouseListener.canvas);
        const layer = shared.layers[shared.activeLayer];
        this.Draw(layer, gridX, gridY);
      });
    }

    Draw(layer, x, y) {
      layer.fillCell(x, y);
    }
  }

  return PenBrush;
});
