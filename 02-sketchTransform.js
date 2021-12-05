const canvasSketch = require("canvas-sketch");
const math = require("canvas-sketch-util/math");
const random = require("canvas-sketch-util/random");

const settings = {
  dimensions: [1080, 1080],
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
    context.fillRect(0, 0, width, height);
    const cx = width * 0.5;
    const cy = height * 0.5;
    let x, y;
    const w = width * 0.01;
    const h = height * 0.1;
    const num = random.range(25, 50);
    const radius = width * random.range(0.1, 0.5);
    for (let i = 0; i < num; i++) {
      const slice = math.degToRad(360 / num);
      const angle = slice * i;

      x = cx + radius * Math.sin(angle);
      y = cy + radius * Math.cos(angle);
      context.save();
      context.fillStyle = generateRandomColorRgb("light");
      context.translate(x, y);
      context.rotate(-angle);
      context.scale(random.range(0.3, 3), random.range(0.3));
      context.beginPath();
      context.rect(w * 0.5, random.range(0, h * 0.3), w, h);
      context.fill();
      context.restore();

      context.save();
      context.translate(cx, cy);
      context.rotate(angle);
      context.beginPath();
      context.lineWidth = random.range(1, 15);
      context.arc(
        0,
        0,
        random.range(radius * 0.8, radius * 1.3),
        slice * random.range(-1, -8),
        slice * random.range(2, 8)
      );
      context.strokeStyle = "white";
      context.stroke();
      context.restore();
    }
  };
};

canvasSketch(sketch, settings);
