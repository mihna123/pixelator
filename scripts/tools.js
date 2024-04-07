define("tools", ["penBrush", "bucketBrush", "lineTool"],
  (PenBrush, BucketBrush, LineTool) => {
    class Tools {
      constructor(mouseListener) {
        this.penBrush = new PenBrush(mouseListener);
        this.bucketBrush = new BucketBrush(mouseListener);
        this.lineTool = new LineTool(mouseListener);
        this.currentTool = this.penBrush;
      }
    }

    return Tools;
  });
