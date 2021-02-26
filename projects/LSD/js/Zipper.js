let zipper; // Object variable
let zipImage // Asset variable

let zip = {
  y: 80,
  width: 20,
  height: 8,
  x1: 684 - 10,
  x2: 684 + 10,
  teethY: 20,
  clicked: false,
};

class Zipper {
  constructor(zipImage) {}

  displayZip() {
    if (scene === "zipper") {
      camera.position.y = 401; // Resets the camera's y position

      push();
      // Displays the curved lines which connect to the zipper
      noFill();
      stroke(255);
      strokeWeight(3);
      beginShape(); // Left curve
      curveVertex(0, height);
      curveVertex(200, 0);
      curveVertex(width / 2, zip.y - 60); // Connects it to the zip
      curveVertex(width / 2, height);
      endShape();
      beginShape(); // Right curve
      curveVertex(width, height);
      curveVertex(width - 200, 0);
      curveVertex(width / 2, zip.y - 60); // Connects it to the zip
      curveVertex(width / 2, height);
      endShape();
      // Displays the zipper
      imageMode(CENTER);
      image(zipImage, width / 2, zip.y);
      pop();

      let d = dist(mouseX, mouseY, width / 2, zip.y);
      if (d < 50){
        cursor('grab');
      }
      else {
        cursor(ARROW)
      }
    }
  }
  // Dsiplays the alternating 'teeth' of the zipper
  zipperTeeth() {
    push();
    fill(107, 0, 0);
    rectMode(CENTER);
    if (scene === "zipper") {
      for (let i = zip.teethY; i < height; i += zip.teethY) {
        // Prints 2 rows of rectangles going down the middle of the screen
        if (zip.clicked === true && mouseY > i) {
          // The if statement prevents the teeth which have been opened by the zip from being displayed
        } else {
          rect(zip.x1, i, zip.width, zip.height);
          rect(zip.x2, i + zip.height, zip.width, zip.height);
        }
      }
    }
    pop();
  }
  // Makes the zip movable when clicked near
  grabZip() {
    if (scene === "zipper") {
      let d = dist(mouseX, mouseY, width / 2, zip.y);
      if (d < 50) {
        zip.clicked = true;
      }
    }
  }
  // Allows the user to 'open' the zip by dragging the mouse down
  openZip() {
    if (zip.clicked === true && scene === "zipper") {
      zip.y = mouseY;
      if (zip.y > height - 150) {
        scene = "matrixSetup"; // Switches scenes when the zip has been opened enough
      }
    }
  }
}
