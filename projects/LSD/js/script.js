"use strict";

let scene = "intro"; // State variable

let startSimulation = false; // Boolean to trigger the start of the simulation

// Asset variables
let youtubeScreen;
let livingRoom;


function preload() {
  youtubeScreen = loadImage(`assets/images/youtube1.png`);

  manOnCouch = loadAnimation(
    `assets/images/home/man1.png`,
    `assets/images/home/man10.png`
  );
  table = loadAnimation(
    `assets/images/home/table1.png`,
    `assets/images/home/table5.png`
  );
  clock = loadAnimation(
    `assets/images/home/clock1.png`,
    `assets/images/home/clock5.png`
  );
  wallWindow = loadAnimation(
    `assets/images/home/window1.png`,
    `assets/images/home/window5.png`
  );
  closeUp = loadAnimation(`assets/images/home/closeUp1.png`, `assets/images/home/closeUp10.png`)
  crackle = loadSound(`assets/sounds/crackle.mp3`)
}

/**
Description of setup
*/
function setup() {
  createCanvas(windowWidth, windowHeight);

  livingRoom = new LivingRoom(manOnCouch, table, clock, wallWindow, closeUp);
}

/**
Description of draw()
*/
function draw() {
  background(0);
  console.log(scene)
  displayIntro();

  livingRoom.display()
  livingRoom.switchScene()
  

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
        camera.zoom = 1
      }
      if (camera.position.y > 320) {
        // Camera tilting
        camera.position.y = camera.position.y - 1;
      }
    }
  }
}
