const canvasSketch = require("canvas-sketch");
const utils = require("../../Coding/custom_elements/script");
const random = require("canvas-sketch-util/random");
const math = require("canvas-sketch-util/math");
const { generateRandomColor } = require("../../Coding/custom_elements/script");

const settings = {
  dimensions: [1080, 1080],
  animate: true,
};

const sketch = (context, width, height) => {
  
  let points = [];
  for (i = 0; i < random.range(40, 100); i++) {
    points.push(new Agent(random.range(0, width), random.range(0, height)));
  }

  return ({ context, width, height }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    for (let i = 0; i < points.length; i++) {
      const point = points[i];
      for (let j = i + 1; j < points.length; j++) {
        const other = points[j];

        const dist = point.pos.getDistance(other.pos);
        if (dist > 250) continue;

        context.lineWidth = math.mapRange(dist, 0, 250, 5, 0.5);
        context.beginPath();
        context.moveTo(point.pos.x, point.pos.y);
        context.lineTo(other.pos.x, other.pos.y);

        context.stroke();
      }
    }

    points.forEach((point) => {
      point.update();
      point.draw(context);

      point.wrap(width, height);
    });
  };
};
class Agent {
  constructor(x, y) {
    this.pos = new Vector(x, y);
    this.vel = new Vector(random.range(0, 1), random.range(0, 1));
    this.radius = random.range(4, 40);
    this.color = utils.generateRandomColor("light");
  }
  update() {
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  }
  bounce(width, height) {
    if (this.pos.x <= 0 || this.pos.x >= width) this.vel.x *= -1;
  }
  wrap(width, height) {
    if (this.pos.x > width) this.pos.x = 0;
    if (this.pos.x < 0) this.pos.x = width;
    if (this.pos.y <= 0 || this.pos.y >= height) this.vel.y *= -1;
  }
  draw(context) {
    context.save();
    context.beginPath();
    context.translate(this.pos.x, this.pos.y);
    context.arc(0, 0, this.radius, 0, Math.PI * 2);
    context.fillStyle = this.color;

    context.fill();
    context.lineWidth = 1;
    context.stroke();
    context.restore();
  }
}
class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  getDistance(v) {
    const dx = this.x - v.x;
    const dy = this.y - v.y;
    return Math.sqrt(dx * dx + dy * dy);
  }
}

canvasSketch(sketch, settings);
