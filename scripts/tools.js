define("tools", ["tools/penBrush", "tools/bucketBrush",
  "tools/lineTool", "tools/circleTool", "tools/moveTool"],
  (PenBrush, BucketBrush, LineTool, CircleTool, MoveTool) => {
    class Tools {
      constructor(mouseListener) {
        this.penBrush = new PenBrush(mouseListener);
        this.bucketBrush = new BucketBrush(mouseListener);
        this.lineTool = new LineTool(mouseListener);
        this.circleTool = new CircleTool(mouseListener);
        this.moveTool = new MoveTool(mouseListener);
        this.currentTool = this.penBrush;
      }
    }

    return Tools;
  });
