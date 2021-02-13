"use strict";

let video = undefined;
// Handpose model
let handpose = undefined;
// Current set of predictions
let predictions = [];

let state = "game" // State variable

// Teeth assets
let tooth = undefined
let happyTooth;
let sadTooth;
let resetTooth;
let mouthBG;

let decayedToothCounter = 0 // Counts number of teeth you decayed
let toothDecayed = false;

let lollipop = undefined;

let scream
let winScreen

function preload() {
  lollipop = loadImage(`assets/images/lollipop.jpg.png`)
  happyTooth = loadImage(`assets/images/happyTooth.png`)
  resetTooth = loadImage(`assets/images/happyTooth.png`)
  sadTooth = loadImage(`assets/images/sadTooth.png`)
  mouthBG = loadImage(`assets/images/mouthBG.jpg`)
  scream = loadSound(`assets/sounds/scream.mp3`)
  winScreen = loadImage(`assets/images/winScreen.jpg`)
}


function setup() {
  createCanvas(640, 480);

  // Access user's webcam
  video = createCapture(VIDEO);
  video.hide()

  // Load handpose model
  handpose = ml5.handpose(video, {
    flipHorizontal: true
  }, function() {
    console.log(`Model Loaded`)
  });

  // Listen for predictions
  handpose.on(`predict`, function(results) {
    console.log(results);
    predictions = results;
  });

  tooth = {
    x: random(width),
    y: height,
    vx: 0,
    vy: -3
  }

}

function draw() {
  background(0);
  
  image(mouthBG, 0, 0)

  if (predictions.length > 0) {
    let hand = predictions[0];
    let index = hand.annotations.indexFinger;
    let tip = index[3]
    let base = index[0]
    let tipX = tip[0]
    let tipY = tip[1]
    let baseX = base[0]
    let baseY = base[1]

    push() // Brush body
    noFill()
    stroke(180);
    strokeWeight(6)
    line(baseX, baseY, tipX, tipY)
    pop()

    push() // Brush head
    imageMode(CENTER)
    image(lollipop, baseX, baseY, 50, 50)
    pop()

    //Checks if tooth shoud be decayed
    let d = dist(baseX, baseY, tooth.x, tooth.y)
    if (d < 50) {
      happyTooth = sadTooth
      tooth.vy = tooth.vy * 2
      toothDecayed = true
    }
  }

  push()
  fill(196, 192, 157)
  textSize(24)
  text(`${decayedToothCounter} teeth ruined`, 30, 40)
  pop()

  tooth.x += tooth.vx
  tooth.y += tooth.vy

  if (tooth.y < 0) {
    if (toothDecayed === true){
      decayedToothCounter += 1;
    }
    tooth.x = random(width)
    tooth.y = height
    happyTooth = resetTooth
    tooth.vy = -3
    toothDecayed = false;
  }

  push()
  fill(0, 100, 200)
  noStroke()
  image(happyTooth, tooth.x, tooth.y, 60, 60)
  pop()

  checkForWin()
}

function checkForWin(){
  if (decayedToothCounter > 1){
    state = "win"
    image(winScreen, 0, 0)
    if (!scream.isPlaying()){
    scream.loop()
    }
  }
}
