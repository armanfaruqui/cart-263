"use strict";
let canvas;
let page = "home"
let scene = "rpg"

function preload(){
  rpgBackground = loadImage("assets/images/RPG Background/background.gif")
  player.stand = loadAnimation("assets/images/rpgSprite/main-walk001.png");
  player.walkDown = loadAnimation(
    "assets/images/rpgSprite/main-walk001.png",
    "assets/images/rpgSprite/main-walk004.png"
  );
  player.standLeft = loadAnimation("assets/images/rpgSprite/main-walk-left001.png");
  player.walkLeft = loadAnimation(
    "assets/images/rpgSprite/main-walk-left001.png",
    "assets/images/rpgSprite/main-walk-left003.png"
  );
  player.standRight = loadAnimation(
    "assets/images/rpgSprite/main-walk-right001.png"
  );
  player.walkRight = loadAnimation(
    "assets/images/rpgSprite/main-walk-right001.png",
    "assets/images/rpgSprite/main-walk-right003.png"
  );
  player.standUp = loadAnimation("assets/images/rpgSprite/main-walk-up001.png");
  player.walkUp = loadAnimation(
    "assets/images/rpgSprite/main-walk-up001.png",
    "assets/images/rpgSprite/main-walk-up004.png"
  );

}

function windowResize(){
  resizeCanvas(1368, 802)
}

function setup(){
  canvas = createCanvas(1368, 768)
  canvas.position(0, 0);
  canvas.style(`z-index`, `-1`) // P5 canvas used as the background
  canvas.parent("#canvas"); // Assigns the canvas to the div #canvas

  rpg = new Menu_RPG(player, rpgBackground);
}

function draw(){
  background(66, 245, 221);
  rpg.display();
  rpg.boundaries();
  rpg.update();
  rpg.checkIfNearIcon();
  rpg.interactWithIcon();
}

function mousePressed(){
  console.log(rpg.sprite.position.x)
  console.log(rpg.sprite.position.y)
}

function keyPressed(){
 if (keyCode === 82){
   nav.interactWithIcon();
 }
 if (keyCode === 81){
   console.log(mouseX)
   console.log(mouseY)
 }
}
