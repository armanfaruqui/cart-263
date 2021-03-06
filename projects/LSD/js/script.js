"use strict";

let scene = "intro"; // Checks which scene should be displayed

// Variables used to store the song
let songSection1;
let songSection2;

let playSong = true; // Variable used to run the code which plays the song once

function preload() {
  // Song assets
  songSection1 = loadSound(`assets/sounds/songSection1.mp3`);
  songSection2 = loadSound(`assets/sounds/songSection2.mp3`);

  youtubeScreen = loadImage(`assets/images/youtube1.png`); // Intro screenshot

  // Living Room Assets
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

  zipImage = loadImage(`assets/images/zipper/zip.png`); // Image of zip

  // Flower scene assets
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

  // Matrix scene assets
  matrixData = loadJSON(`assets/data/matrix.json`);
  buildings = loadImage('assets/images/buildings.gif')

  // Juggling scene assets
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

  // Falling scene assets
  fallingMan.ani = loadAnimation(`assets/images/falling/fall1.png`, `assets/images/falling/fall12.png`)
  sea.rock = loadImage(`assets/images/falling/seaRock.png`)
  sea.fish1 = loadImage(`assets/images/falling/fish1.png`)
  sea.fish2 = loadImage(`assets/images/falling/fish2.png`)
  sea.fish3 = loadImage(`assets/images/falling/fish3.png`)

  manOnCouch = loadAnimation(
    `assets/images/home/man1.png`,
    `assets/images/home/man10.png`
  ); // Duplicate man on couch loaded for starfield. Calling the entire lrAssets object in new Starfield was causing immense lag
}

// Initializes objects for each scene
function setup() {
  createCanvas(windowWidth, windowHeight);

  youtubeIntro = new YoutubeIntro(youtubeScreen)
  livingRoom = new LivingRoom(lrAssets);
  zipper = new Zipper(zipImage);
  flowerScene = new Flower(flower, loveAsset)
  matrix = new Matrix(matrixData, buildings);
  juggle = new Juggle(brain, icon)
  starfield = new Starfield(lrAssets)
  falling = new Falling(fallingMan, sea)
}

// Calls the functions within each scene
function draw() {
  displayBackground();

  youtubeIntro.display(); // Intro

  // Living room + close up
  livingRoom.display();
  livingRoom.switchScene();
  livingRoom.moveAcidTab();
  livingRoom.startTrip();
  livingRoom.changeFurniture();
  livingRoom.simulateCameraTilt();

  // Zipper scene
  zipper.zipperTeeth();
  zipper.displayZip();
  zipper.openZip();

  // Flower Scene
  flowerScene.setupPetals()
  flowerScene.displayFlower()
  flowerScene.checkDistanceFromPetal()
  flowerScene.changeCursor()
  flowerScene.descendingPetals()
  flowerScene.flowerState()
  flowerScene.sceneDecoration()
  flowerScene.switchScene()

  // Matrix scene
  matrix.setup()
  matrix.displayBuildings()
  matrix.movingWords()
  matrix.switchScene()

  // Juggling scene
  juggle.setupBalls()
  juggle.displayBrain()
  juggle.displayPaddle()
  juggle.responsibilites()
  juggle.displayIcons()
  juggle.displayHammer()

  // Starfield scene
  starfield.setup()
  starfield.displayStarfield()
  starfield.switchScene()

  // Falling scene
  falling.moveMan()
  falling.displayMan()
  falling.changingColor()
  falling.displayMovingRing()
  falling.background1()
  falling.displayOpenedMind()
  falling.checkDistanceFromRing()
  falling.displayCompletionBar()
  falling.seaState()
  falling.sensoryOverloadSetup()
  falling.sensoryOverload()

  starfield.showManAndCredits()

  // console.log(`x${mouseX}`); //25 913
  // console.log(`y${mouseY}`); //78 574
  // console.log(`Scene is ${scene}`); //25 913
}
// Used to call the functions which reuire the mouse to be pressed
function mousePressed() {
  youtubeIntro.startSimulation()
  zipper.grabZip();
  juggle.smashBrain()
}
// Used to call the function which reuire the mouse to be released
function mouseReleased(){
  flowerScene.pickPetals()
}

// Called to display the relevant background
function displayBackground(){
  if (scene === "falling" && showSea === false){
    background(0, 10) // Black background with opacity
  }
  else if (showSea === true){
    background(194, 254, 255, 20) // Light blue background with opactity
  }
  else{
    background(0)
  }
}
