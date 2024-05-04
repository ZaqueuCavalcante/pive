let pointLocation;
let locationStore;

function setup() {
  createCanvas(800, 800);

  angleMode(DEGREES);
  colorMode(HSB, 360, 100, 100, 100);
  textFont('Helvetica Neue', 14);
  textAlign(CENTER, CENTER);

  stroke(199, 80, 88, 100);
  fill(199, 80, 88, 100);
  strokeWeight(1);

  pointLocation = createVector(width / 4, - height / 4);
  locationStore = pointLocation;
}

function draw() {
  background(230, 50, 15, 100);
  translate(width / 2, height / 2);

  setupShadow();
  drawAxes();

  if (mouseIsPressed) {
    pointLocation.x = mouseX - width / 2;
    pointLocation.y = mouseY - height / 2;
    locationStore = pointLocation;
  } else {
    pointLocation.x = locationStore.x;
    pointLocation.y = locationStore.y;
  }

  polar(pointLocation.x, pointLocation.y);

  fill(32, 18, 99, 100);
  ellipse(pointLocation.x, pointLocation.y, 12, 12);
}

// ------------------------------------------------------------------------------------------------ //

function setupShadow() {
  drawingContext.shadowOffsetX = 5;
  drawingContext.shadowOffsetY = -5;
  drawingContext.shadowBlur = 8;
  drawingContext.shadowColor = 'rgba(39, 49, 51, 100)';
}

function drawAxes() {
  text('0', -10, 15);

  line(-width / 2, 0, width / 2, 0);
  for (let x = -width / 2 + 50; x <= width / 2 - 50; x += 50) {
    line(x, -5, x, 5);
  }

  line(0, -height / 2, 0, height / 2);
  for (let y = -height / 2 + 50; y <= height / 2 - 50; y += 50) {
    line(-5, y, 5, y);
  }
}

function polar(x, y) {
  drawingContext.setLineDash([1, 8]);
  line(x, 0, x, y);
  line(0, y, x, y);
  drawingContext.setLineDash([4, 3]);
  line(0, 0, x, y);

  drawPoints();

  let theta = atan2(y, x);
  let radius = sqrt(pow(x, 2) + pow(y, 2));

  fill(32, 18, 99, 20);
  arc(0, 0, radius / 1.3, radius / 1.3, theta, 0);
  drawingContext.setLineDash([0, 0]);

  let rLocation = createVector(radius / 2 * cos(theta), radius / 2 * sin(theta) - 15);
  text('r = ' + nf(radius, 1, 1), rLocation.x, rLocation.y);

  if (theta >= 0 && theta <= 180) {
    let mappedTheta = map(theta, 180, 0, -90, -180);
    let thetaLocation = createVector((radius + 60) / 6 * cos(mappedTheta), (radius + 60) / 6 * sin(mappedTheta));
    let diaplayedTheta = map(theta, 180, 0, 180, 360);
    text("θ = " + nf(diaplayedTheta, 1, 1) + " °", thetaLocation.x, thetaLocation.y);
  } else {
    let thetaLocation = createVector((radius + 60) / 6 * cos(theta / 2), (radius + 60) / 6 * sin(theta / 2));
    let diaplayedTheta = map(theta, -180, 0, 180, 0);
    text("θ = " + nf(diaplayedTheta, 1, 1) + " °", thetaLocation.x, thetaLocation.y);
  }

  text("r.cosθ = " + nf(radius * cos(theta), 1, 1), x / 2, y - 20);
  text("r.sinθ = " + nf(-radius * sin(theta), 1, 1), x + 30, y / 2);
}

function drawPoints() {
  let offset = map(mouseX, 0, width, 0, 360);
  strokeWeight(2.5);
  for (let r = 0; r < width / 2; r += 50) {
    for (let theta = 0+offset; theta < 360+offset; theta += 20) {
      let px = r * cos(theta);
      let py = r * sin(theta);
      point(px, py);
    }
  }
  strokeWeight(1);
}
