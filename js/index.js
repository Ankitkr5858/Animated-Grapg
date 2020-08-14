//
// Click the graph to randomize the points
//

// Set points y coordinates (from the top)
// points = [100, 200, 150];
let points = [], desiredPoints = [];

const canvas = document.getElementById('canv');
const ctx = canvas.getContext('2d');

// scale of the transform speed
const scale = 0.03;

// width of the curve stroke
const curveWidth = 10;

// radius of the point
const pointRadius = 14;

// number of random points
const pointsAmmount = 10;

// max transition time
const maxTransitionTime = 3000; // 3 seconds

// graph padding
const sideOffset = 25;

// colors
const curveColor = '#b3e5fc';
const pointColor = '#82b3c9';
const backgroundColor = '#fafafa';

const point = (x, y) => {
  ctx.beginPath();
  ctx.arc(x, y, pointRadius, 0, 2 * Math.PI);
  ctx.fillStyle = pointColor;
  ctx.fill();
};
const curve = (x1, y1, x2, y2) => {
  const halfway = (x1 + x2) / 2;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.bezierCurveTo(halfway, y1, halfway, y2, x2, y2);
  ctx.strokeStyle = curveColor;
  ctx.lineWidth = curveWidth;
  ctx.stroke();
};
const updateSize = () => {
  const cw = canvas.parentElement.clientWidth;
  const ch = canvas.parentElement.clientHeight;
  canvas.width = cw*2;
  canvas.height = ch*2;
  canvas.style.width = cw+'px';
  canvas.style.height = ch+'px';
};

let currentTimeout = undefined;
canvas.onclick = () => {
shouldUpdate = true;
  if(!!currentTimeout) clearTimeout(currentTimeout);
  currentTimeout = setTimeout(()=>shouldUpdate=false, maxTransitionTime);
  desiredPoints = desiredPoints.map(() => canvas.height * 0.25 + Math.random() * (canvas.height * 0.5));
};
canvas.parentElement.onresize = () => updateSize();
updateSize();

let shouldUpdate = false;

// Create random points
for (let i = 0; i < pointsAmmount; i++) {
  points.push(canvas.height * 0.25 + Math.random() * (canvas.height * 0.5));
}
desiredPoints = points;

ctx.scale(window.devicePixelRatio,window.devicePixelRatio);

const draw = () => {
  ctx.translate(0.5, 0.5);
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  const pointOffset = (canvas.width - sideOffset*2) / (points.length - 1);
  for (let i = 0; i < points.length; i++) {
    if (!!points[i + 1]) curve(sideOffset + i * pointOffset, points[i], sideOffset + (i + 1) * pointOffset, points[i + 1]);
    point(sideOffset + i * pointOffset, points[i]);
  }
  if(shouldUpdate)
    points = points.map((e, i) => e + (desiredPoints[i] - e) * scale);
  ctx.translate(-0.5, -0.5);
  requestAnimationFrame(draw);
};
draw();