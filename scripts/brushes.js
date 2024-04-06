define("brushes", ["penBrush"], (PenBrush) => {
  const penBrush = new PenBrush();
  let currentBrush = penBrush;

  return {
    penBrush: penBrush,
    currentBrush: currentBrush
  }
})
