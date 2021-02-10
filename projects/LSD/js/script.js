"use strict";

// State variable
let state = "intro"

let startSimulation = false

let youtubeScreen;

// Variables for the canvas size


function preload() {
  youtubeScreen = loadImage(`assets/images/youtube1.png`)
}


/**
Description of setup
*/
function setup() {
  createCanvas(windowWidth, windowHeight);
}


/**
Description of draw()
*/
function draw() {
  background(255, 255, 0)


  displayIntro()
  console.log(camera.position.x)

}

function mousePressed() {
  // Begins simulation when user tries to play the video
  if (state === "intro" && mouseX > 25 && mouseX < 913 && mouseY > 78 && mouseY < 574) {
    startSimulation = true
  }

  console.log(mouseX) //25 913
  console.log(mouseY) //78 574
}

function displayIntro() {
  if (state === "intro") {
    image(youtubeScreen, 0, 0, windowWidth, windowHeight)
    if (startSimulation === true) {
      if (camera.zoom < 1.8) {
        camera.zoom = camera.zoom + 0.009
      }
      if (camera.position.x > 480) {
        camera.position.x = camera.position.x - 2.3
      }
      if (camera.position.y > 320) {
        camera.position.y = camera.position.y - 1
      }
    }
  }
}
