// Main js file used mainly to store the code for the landing page.

"use strict";

let canvas; // Variable used to store the createCanvas command
let song; // Variable for the playable song

function preload(){
  song = loadSound(`assets/sounds/song.mp3`)

  rpgBackground = loadImage("assets/images/RPG Background/background.gif")
  sign = loadImage("assets/images/RPG Background/sign.png")
  user.stand = loadAnimation("assets/images/rpgSprite/main-walk001.png");
  user.walkDown = loadAnimation(
    "assets/images/rpgSprite/main-walk001.png",
    "assets/images/rpgSprite/main-walk004.png"
  );
  user.standLeft = loadAnimation("assets/images/rpgSprite/main-walk-left001.png");
  user.walkLeft = loadAnimation(
    "assets/images/rpgSprite/main-walk-left001.png",
    "assets/images/rpgSprite/main-walk-left003.png"
  );
  user.standRight = loadAnimation(
    "assets/images/rpgSprite/main-walk-right001.png"
  );
  user.walkRight = loadAnimation(
    "assets/images/rpgSprite/main-walk-right001.png",
    "assets/images/rpgSprite/main-walk-right003.png"
  );
  user.standUp = loadAnimation("assets/images/rpgSprite/main-walk-up001.png");
  user.walkUp = loadAnimation(
    "assets/images/rpgSprite/main-walk-up001.png",
    "assets/images/rpgSprite/main-walk-up004.png"
  );
}

function setup(){
  canvas = createCanvas(1368, 768)
  canvas.position(0, 0);
  canvas.style(`z-index`, `-1`) // P5 canvas used as the background
  canvas.parent("#canvas"); // Assigns the canvas to the div #canvas

  rpg = new RPG_Home(rpgBackground, sign);
  ui = new UserInterface(song);
  ui.initialize();

  rpg.checkIfIntroDialogShouldDisplay()
  rpg.initializeDialogueBoxes();
}

function draw(){
  background(66, 245, 221);
  rpg.display();
  rpg.boundaries();
  rpg.update();
  rpg.checkIfNearIcon();
  rpg.interactWithIcon();
  rpg.interactWithSign();
  rpg.runningAwayGarden("garden", iconPos.x3, iconPos.y1);
  ui.focused()
  ui.music()
}
