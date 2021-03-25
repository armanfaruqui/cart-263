"use strict";
let canvas;
let nav;


function preload(){
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
  resizeCanvas(windowWidth, windowHeight)
}

function setup(){
  canvas = createCanvas(windowWidth, windowHeight)
  canvas.position(0, 0);
  canvas.style(`z-index`, `-1`) // P5 canvas used as the background
  nav = new MenuNav(player);
}

function draw(){
  background(66, 245, 221)
  fill(255,0 ,0)
  ellipse(nav.x, nav.y, 100)
  nav.update();
  console.log(`x ${mouseX}`)
  console.log(`y ${mouseY}`)
}

function keyPressed(){
  if (keyIsDown(65)) {
   nav.left();
 } else if (keyIsDown(68)) {
   nav.right();
 }
   if (keyIsDown(87)) {
   nav.up();
 } else if (keyIsDown(83)) {
   nav.down();
 }
}
