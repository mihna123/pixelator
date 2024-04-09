define("tools", ["tools/penBrush", "tools/bucketBrush",
  "tools/lineTool", "tools/circleTool", "tools/moveTool", "tools/selectTool"],
  (PenBrush, BucketBrush, LineTool, CircleTool, MoveTool, SelectTool) => {
    class Tools {
      constructor(mouseListener) {
        this.penBrush = new PenBrush(mouseListener);
        this.bucketBrush = new BucketBrush(mouseListener);
        this.lineTool = new LineTool(mouseListener);
        this.circleTool = new CircleTool(mouseListener);
        this.moveTool = new MoveTool(mouseListener);
        this.selectTool = new SelectTool(mouseListener);
        this.currentTool = this.penBrush;
      }
    }

    return Tools;
  });
