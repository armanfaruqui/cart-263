"use strict";

let scene = "scene2"; // State variable

let startSimulation = false; // Boolean to trigger the start of the simulation

// Asset variables
let youtubeScreen;
let song;

function preload() {
  song = loadSound(`assets/sounds/songLSD.mp3`)

  youtubeScreen = loadImage(`assets/images/youtube1.png`);
lrConfig.manOnCouch = loadAnimation(
  `assets/images/home/man1.png`,
  `assets/images/home/man10.png`
);
lrConfig.table = loadAnimation(
    `assets/images/home/table1.png`,
    `assets/images/home/table5.png`
  );
  lrConfig.clock = loadAnimation(
    `assets/images/home/clock1.png`,
    `assets/images/home/clock5.png`
  );
  lrConfig.wallWindow = loadAnimation(
    `assets/images/home/window1.png`,
    `assets/images/home/window5.png`
  );
  lrConfig.manOnCouchStill = loadImage(`assets/images/home/man1.png`)
  lrConfig.closeUp = loadAnimation(`assets/images/home/closeUp1.png`, `assets/images/home/closeUp10.png`)
  lrConfig.lsdTab = loadImage(`assets/images/home/lsdTab.png`)
  lrConfig.crackle = loadSound(`assets/sounds/crackle.mp3`)
  lrConfig.clockReal = loadImage(`assets/images/home/clockReal.gif`)
  lrConfig.wallWindowReal = loadImage(`assets/images/home/wallWindowReal.gif`)
  lrConfig.tableReal = loadImage(`assets/images/home/tableReal.png`)
  lrConfig.icecream = loadImage(`assets/images/home/icecream.gif`)

  s2Config.zip = loadImage(`assets/images/scene2/zip.png`)
}

/**
Description of setup
*/
function setup() {
  createCanvas(windowWidth, windowHeight);

  livingRoom = new LivingRoom(lrConfig);
  scene2 = new Scene2(s2Config);
}

/**
Description of draw()
*/
function draw() {
  background(0);
  // console.log(scene)
  displayIntro();

  livingRoom.display()
  livingRoom.switchScene()
  livingRoom.moveAcidTab()
  livingRoom.startTrip()
  livingRoom.changeFurniture()

  // scene2.display()
    scene2.zipperTeeth()

  // console.log(`x${mouseX}`); //25 913
  // console.log(`y${mouseY}`); //78 574
  // console.log(`x${camera.position.x}`); //25 913
  // console.log(`y${camera.position.y}`); //78 574

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
  // console.log(`tab${tab.x}`); //25 913
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
        camera.zoom = 1 // Resets the camera zoom
        camera.position.x = 684 // Resets the camera's x position
        camera.position.y = 401 // Resets the camera's x position
      }
      if (camera.position.y > 320) {
        // Camera tilting
        camera.position.y = camera.position.y - 1;
      }
    }
  }
}

// Plays a section of a song when called
function playSong(millisecondsToPause){
  if(!song.isPlaying()){
    song.play()
  }
  setTimeout(function () {song.stop()}, millisecondsToPause) // Since this function is called within draw, this stops it from looping
}
