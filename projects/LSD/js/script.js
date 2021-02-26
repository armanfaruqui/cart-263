"use strict";

let scene = "flower"; // State variable
let startSimulation = false; // Boolean to trigger the start of the simulation

// Asset variables
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

  zipImage = loadImage(`assets/images/zipper/zip.png`);
  matrixData = loadJSON(`assets/data/matrix.json`);

  petal.up = loadImage(`assets/images/flower/petal0.png`);
  petal.upRight = loadImage(`assets/images/flower/petal45.png`);
  petal.right = loadImage(`assets/images/flower/petal90.png`);
  petal.downRight = loadImage(`assets/images/flower/petal135.png`);
  petal.down = loadImage(`assets/images/flower/petal180.png`);
  petal.downLeft = loadImage(`assets/images/flower/petal225.png`);
  petal.left = loadImage(`assets/images/flower/petal270.png`);
  petal.upLeft = loadImage(`assets/images/flower/petal315.png`);
  petal.pistil = loadImage(`assets/images/flower/pistil.png`);
  petal.stem = loadImage(`assets/images/flower/stem.png`)
}

/**
Description of setup
*/
function setup() {
  createCanvas(windowWidth, windowHeight);

  youtubeIntro = new YoutubeIntro(youtubeScreen)
  livingRoom = new LivingRoom(lrConfig);
  zipper = new Zipper(zipImage);
  matrix = new Matrix(matrixData);
  flower = new Flower(petal)
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

  zipper.zipperTeeth();
  zipper.displayZip();
  zipper.openZip();

  matrix.setup()
  matrix.movingWords()

  flower.displayFlower()

  // console.log(`x${mouseX}`); //25 913
  // console.log(`y${mouseY}`); //78 574
  console.log(`Scene is ${scene}`); //25 913
  // console.log(`y${camera.position.y}`); //78 574
}

function mousePressed() {
  youtubeIntro.startSimulation()
  zipper.grabZip();

  console.log(`x ${mouseX}`)
  console.log(`y ${mouseY}`)
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
