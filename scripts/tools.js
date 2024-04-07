define("tools", ["penBrush", "bucketBrush"], (PenBrush, BucketBrush) => {
  class Tools {
    constructor(mouseListener) {
      this.penBrush = new PenBrush(mouseListener);
      this.bucketBrush = new BucketBrush(mouseListener);
      this.currentTool = this.penBrush;
    }
  }

  return Tools;
});
