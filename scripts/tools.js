define("tools", ["penBrush", "bucketBrush"], (PenBrush, BucketBrush) => {
  const penBrush = new PenBrush();
  const bucketBrush = new BucketBrush();
  let currentTool = bucketBrush;

  return {
    penBrush: penBrush,
    bucketBrush: bucketBrush,
    currentTool: currentTool
  }
})
