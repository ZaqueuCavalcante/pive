let r0 = 200, r1 = 75;
let densityDiv;
let densitySlider;

function setup() {
  createCanvas(700, 700, WEBGL);
  angleMode(DEGREES);
  colorMode(HSB);
  stroke(199, 80, 88);
  strokeWeight(2);
  noFill();

  densitySlider = createSlider(1, 102, 50, 1);
}

function draw() {
  background(230, 50, 15);
  orbitControl();

  let density = densitySlider.value();
  for (let theta = 0; theta < 360; theta += 360 / density) {
    beginShape();
    for (let phi = 0; phi < 360; phi += 10) {
      let x = (r0 + r1 * cos(phi)) * cos(theta);
      let y = (r0 + r1 * cos(phi)) * sin(theta);
      let z = r1 * sin(phi);
      vertex(x, y, z);
    }
    endShape(CLOSE);
  }
}
