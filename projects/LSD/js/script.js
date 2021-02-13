"use strict";

let scene = "intro"; // State variable

let startSimulation = false; // Boolean to trigger the start of the simulation

// Asset variables
let youtubeScreen;

let livingRoom;


function preload() {
  youtubeScreen = loadImage(`assets/images/youtube1.png`);

  manOnCouch = loadAnimation(
    `assets/images/home/man1`,
    `assets/images/home/man5`
  );
  table = loadAnimation(
    `assets/images/home/table1`,
    `assets/images/home/table5`
  );
  clock = loadAnimation(
    `assets/images/home/clock1`,
    `assets/images/home/clock5`
  );
  wallWindow = loadAnimation(
    `assets/images/home/window1`,
    `assets/images/home/window5`
  );
}

/**
Description of setup
*/
function setup() {
  createCanvas(windowWidth, windowHeight);

  livingRoom = new LivingRoom(manOnCouch, table, clock, wallWindow);
}

/**
Description of draw()
*/
function draw() {
  background(0);

  displayIntro();
  if (scene === "livingRoom"){
    livingRoom.display()
  }

}

function mousePressed() {
  // Assigns true to startSimulation to begin the zoom effect
  if (
    scene === "intro" &&
    mouseX > 25 &&
    mouseX < 913 &&
    mouseY > 78 &&
    mouseY < 574
  ) {
    startSimulation = true;
  }

  console.log(`x${mouseX}`); //25 913
  console.log(`y${mouseY}`); //78 574
}
// Displays the youtube screen. Zooms into the video when true is assigned to start simulation
function displayIntro() {
  if (scene === "intro") {
    image(youtubeScreen, 0, 0, windowWidth, windowHeight);
    if (startSimulation === true) {
      if (camera.zoom < 1.8) {
        camera.zoom = camera.zoom + 0.009; // Camera zooming
      }
      if (camera.position.x > 480) {
        camera.position.x = camera.position.x - 2.3; // Camera panning
      } else {
        scene = "livingRoom"; // Switches scene once the zooming and panning is finished
      }
      if (camera.position.y > 320) {
        // Camera tilting
        camera.position.y = camera.position.y - 1;
      }
    }
  }
}
