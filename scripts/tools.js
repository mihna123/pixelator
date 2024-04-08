define("tools", ["penBrush", "bucketBrush", "lineTool", "circleTool"],
  (PenBrush, BucketBrush, LineTool, CircleTool) => {
    class Tools {
      constructor(mouseListener) {
        this.penBrush = new PenBrush(mouseListener);
        this.bucketBrush = new BucketBrush(mouseListener);
        this.lineTool = new LineTool(mouseListener);
        this.circleTool = new CircleTool(mouseListener);
        this.currentTool = this.penBrush;
      }
    }

    return Tools;
  });
