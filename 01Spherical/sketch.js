let r = 200;

let densityDiv;
let densitySlider;

function setup() {
  createCanvas(700, 700, WEBGL);

  angleMode(DEGREES);
  colorMode(HSB);

  stroke(199, 80, 88);
  strokeWeight(3);
  noFill();

  densitySlider = createSlider(3, 42, 20, 1);
}

function draw() {
  background(230, 50, 15);
  orbitControl();

  rotateY(90);
  rotateZ(65);

  // pointsSphere();
  linesSphere();
}

// ------------------------------------------------------------------------------------------------ //

function pointsSphere() {
  for (let phi = 0; phi < 180; phi += 14) {
    for (let theta = 0; theta < 360; theta += 14) {
      let x = r * cos(phi);
      let y = r * sin(phi) * sin(theta);
      let z = r * sin(phi) * cos(theta);
      point(x, y, z);
    }
  }
}

function linesSphere() {
  let density = densitySlider.value();

  for (let phi = 0; phi < 180; phi += 180/density) {
    beginShape();
    for (let theta = 0; theta < 360; theta += 360/density) {
      let x = r * cos(phi);
      let y = r * sin(phi) * sin(theta);
      let z = r * sin(phi) * cos(theta);
      vertex(x, y, z);
    }
    endShape(CLOSE);
  }
}
