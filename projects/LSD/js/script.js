"use strict";

let scene = "intro"; // State variable
let startSimulation = false; // Boolean to trigger the start of the simulation

// Asset variables
let youtubeScreen;
let song;
let songPlaying = 0;

function preload() {
  song = loadSound(`assets/sounds/songLSD.mp3`);

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
  lrConfig.manOnCouchStill = loadImage(`assets/images/home/man1.png`);
  lrConfig.closeUp = loadAnimation(
    `assets/images/home/closeUp1.png`,
    `assets/images/home/closeUp10.png`
  );
  lrConfig.lsdTab = loadImage(`assets/images/home/lsdTab.png`);
  lrConfig.crackle = loadSound(`assets/sounds/crackle.mp3`);
  lrConfig.clockReal = loadImage(`assets/images/home/clockReal.gif`);
  lrConfig.wallWindowReal = loadImage(`assets/images/home/wallWindowReal.gif`);
  lrConfig.tableReal = loadImage(`assets/images/home/tableReal.png`);
  lrConfig.icecream = loadImage(`assets/images/home/icecream.gif`);

  s2Config.zip = loadImage(`assets/images/scene2/zip.png`);
  matrixData = loadJSON(`assets/data/matrix.json`)
}

/**
Description of setup
*/
function setup() {
  createCanvas(windowWidth, windowHeight);

  youtubeIntro = new YoutubeIntro(youtubeScreen)
  livingRoom = new LivingRoom(lrConfig);
  scene2 = new Scene2(s2Config);
  matrix = new Matrix(matrixData);
}

/**
Description of draw()
*/
function draw() {
  background(0);

  youtubeIntro.display();

  livingRoom.display();
  livingRoom.switchScene();
  livingRoom.moveAcidTab();
  livingRoom.startTrip();
  livingRoom.changeFurniture();
  livingRoom.simulateCameraTilt();

  if (scene === "scene2") {
    scene2.zipperTeeth();
    scene2.displayZip();
    scene2.openZip();
  }
  matrix.setup()
  matrix.movingWords()

  // console.log(`x${mouseX}`); //25 913
  // console.log(`y${mouseY}`); //78 574
  console.log(`y${scene}`); //25 913
  // console.log(`y${camera.position.y}`); //78 574
}

function mousePressed() {
  youtubeIntro.startSimulation()
  console.log(`x${mouseX}`);
  console.log(`y${mouseY}`);
}

// Plays a section of a song when called
function playSong(millisecondsToPause) {
  if (!song.isPlaying()) {
    song.play();
    songPlaying = 1;
  }
  if (songPlaying === 1) {
    setTimeout(function () {
      song.stop();
    }, millisecondsToPause); // Since this function is called within draw, this stops it from looping
    songPlaying = 2;
  }
}
