const canvasSketch = require("canvas-sketch");

const settings = {
  dimensions: [600, 600],
};
function generateRandomColorRgb(brightness = "all") {
  let additional = brightness === "light" ? 1 : 0;
  const divisor = brightness !== "all" ? 2 : 1;
  const red = Math.floor(((additional + Math.random()) * 256) / divisor);
  const green = Math.floor(((additional + Math.random()) * 256) / divisor);
  const blue = Math.floor(((additional + Math.random()) * 256) / divisor);
  return "rgb(" + red + ", " + green + ", " + blue + ")";
}

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = "black";
    context.strokeStyle = "white";
    context.fillRect(0, 0, width, height);

    const w = 60;
    const h = 60;
    const gap = 20;
    let x, y;

    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        x = 100 + (w + gap) * i;
        y = 100 + (h + gap) * j;
        context.beginPath();
        context.rect(x, y, w, h);

        context.stroke();
        if (Math.random() > 0.5) {
          context.beginPath();
          context.fillRect(x + 8, y + 8, w - 16, h - 16);
          context.fillStyle = generateRandomColorRgb("light");
          context.stroke();
        }
      }
    }
  };
};

canvasSketch(sketch, settings);
