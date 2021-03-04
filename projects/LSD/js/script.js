"use strict";

let scene = "falling"; // State variable

// Asset variables
let song;
let songPlaying = 0;

function preload() {
  song = loadSound(`assets/sounds/songLSD.mp3`);

  youtubeScreen = loadImage(`assets/images/youtube1.png`);
  lrAssets.manOnCouch = loadAnimation(
    `assets/images/home/man1.png`,
    `assets/images/home/man10.png`
  );
  lrAssets.table = loadAnimation(
    `assets/images/home/table1.png`,
    `assets/images/home/table5.png`
  );
  lrAssets.clock = loadAnimation(
    `assets/images/home/clock1.png`,
    `assets/images/home/clock5.png`
  );
  lrAssets.wallWindow = loadAnimation(
    `assets/images/home/window1.png`,
    `assets/images/home/window5.png`
  );
  lrAssets.manOnCouchStill = loadImage(`assets/images/home/man1.png`);
  lrAssets.closeUp = loadAnimation(
    `assets/images/home/closeUp1.png`,
    `assets/images/home/closeUp10.png`
  );
  lrAssets.lsdTab = loadImage(`assets/images/home/lsdTab.png`);
  lrAssets.crackle = loadSound(`assets/sounds/crackle.mp3`);
  lrAssets.clockReal = loadImage(`assets/images/home/clockReal.gif`);
  lrAssets.wallWindowReal = loadImage(`assets/images/home/wallWindowReal.gif`);
  lrAssets.tableReal = loadImage(`assets/images/home/tableReal.png`);
  lrAssets.icecream = loadImage(`assets/images/home/icecream.gif`);

  zipImage = loadImage(`assets/images/zipper/zip.png`);

  flower.petal0 = loadImage(`assets/images/flower/petal0.png`);
  flower.petal1 = loadImage(`assets/images/flower/petal45.png`);
  flower.petal2 = loadImage(`assets/images/flower/petal90.png`);
  flower.petal3 = loadImage(`assets/images/flower/petal135.png`);
  flower.petal4 = loadImage(`assets/images/flower/petal180.png`);
  flower.petal5 = loadImage(`assets/images/flower/petal225.png`);
  flower.petal6 = loadImage(`assets/images/flower/petal270.png`);
  flower.petal7 = loadImage(`assets/images/flower/petal315.png`);
  flower.pistil = loadImage(`assets/images/flower/pistil.png`);
  flower.pistilSad = loadImage(`assets/images/flower/pistilSad.png`);
  flower.stem = loadImage(`assets/images/flower/stem.png`)
  loveAsset.rose = loadImage(`assets/images/flower/rose.png`)
  loveAsset.teddy = loadImage(`assets/images/flower/teddy.png`)
  loveAsset.packet = loadImage(`assets/images/flower/packet.png`)
  loveAsset.tissue = loadImage(`assets/images/flower/tissue.png`)
  loveAsset.bottle = loadImage(`assets/images/flower/bottle.png`)
  loveAsset.knife = loadImage(`assets/images/flower/knife.png`)
  loveAsset.brokenHeart = loadImage(`assets/images/flower/brokenHeart.png`)

  matrixData = loadJSON(`assets/data/matrix.json`);
  buildings = loadImage('assets/images/buildings.gif')

  brain.sect1 = loadImage(`assets/images/brain/sect1.png`)
  brain.sect2 = loadImage(`assets/images/brain/sect2.png`)
  brain.sect3 = loadImage(`assets/images/brain/sect3.png`)
  brain.sect4 = loadImage(`assets/images/brain/sect4.png`)
  brain.sect5 = loadImage(`assets/images/brain/sect5.png`)
  brain.sect6 = loadImage(`assets/images/brain/sect6.png`)
  brain.hammer = loadImage(`assets/images/brain/hammer.png`)
  brain.shatter = loadSound(`assets/sounds/shatter.mp3`)
  icon.health = loadImage(`assets/images/brain/health.png`)
  icon.wealth = loadImage(`assets/images/brain/money.png`)
  icon.dreams = loadImage(`assets/images/brain/dream.png`)
  icon.peace = loadImage(`assets/images/brain/peace.png`)
  icon.social = loadImage(`assets/images/brain/social.png`)
  icon.home = loadImage(`assets/images/brain/home.png`)

  fallingMan.ani = loadAnimation(`assets/images/falling/fall1.png`, `assets/images/falling/fall12.png`)
}

/**
Description of setup
*/
function setup() {
  createCanvas(windowWidth, windowHeight);

  youtubeIntro = new YoutubeIntro(youtubeScreen)
  livingRoom = new LivingRoom(lrAssets);
  zipper = new Zipper(zipImage);
  flowerScene = new Flower(flower, loveAsset)
  matrix = new Matrix(matrixData, buildings);
  juggle = new Juggle(brain, icon)
  starfield = new Starfield()
  falling = new Falling(fallingMan)
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

  flowerScene.setupPetals()
  flowerScene.displayFlower()
  flowerScene.checkDistanceFromPetal()
  flowerScene.changeCursor()
  flowerScene.descendingPetals()
  flowerScene.flowerState()
  flowerScene.sceneDecoration()
  flowerScene.switchScene()

  matrix.setup()
  matrix.displayBuildings()
  matrix.movingWords()
  matrix.switchScene()

  juggle.setupBalls()
  juggle.displayBrain()
  juggle.displayPaddle()
  juggle.responsibilites()
  juggle.displayIcons()
  juggle.displayHammer()

  starfield.setup()
  starfield.displayStarfield()

  falling.moveMan()
  falling.displayMan()
  falling.background1()
  falling.displayOpenedMind()

  // console.log(`x${mouseX}`); //25 913
  // console.log(`y${mouseY}`); //78 574
  // console.log(`Scene is ${scene}`); //25 913
  // console.log(`y${camera.position.y}`); //78 574
}

function mousePressed() {
  youtubeIntro.startSimulation()
  zipper.grabZip();
  juggle.smashBrain()

  console.log(balls)
}

function mouseReleased(){
  flowerScene.pickPetals()
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
