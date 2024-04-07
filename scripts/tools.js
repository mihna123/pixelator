define("tools", ["penBrush", "bucketBrush"], (PenBrush, BucketBrush) => {
  const penBrush = new PenBrush();
  const bucketBrush = new BucketBrush();
  let currentBrush = bucketBrush;

  return {
    penBrush: penBrush,
    bucketBrush: bucketBrush,
    currentBrush: currentBrush
  }
})
