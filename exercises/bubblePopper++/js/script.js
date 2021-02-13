"use strict";


let video = undefined;
// Handpose model
let handpose = undefined;
// Current set of predictions
let predictions = [];

let tooth = undefined
let happyTooth;
let sadTooth;
let resetTooth;

let lollipop = undefined;

function preload() {
lollipop = loadImage(`assets/images/lollipop.jpg.png`)
happyTooth = loadImage(`assets/images/happyTooth.png`)
resetTooth = loadImage(`assets/images/happyTooth.png`)
sadTooth = loadImage(`assets/images/sadTooth.png`)
}


function setup() {
createCanvas(640, 480);

// Access user's webcam
video = createCapture(VIDEO);
video.hide()

// Load handpose model
handpose = ml5.handpose(video, {flipHorizontal: true}, function() {console.log(`Model Loaded`)});

// Listen for predictions
handpose.on(`predict`, function(results){
  console.log(results);
  predictions = results;
});

tooth = {
  x: random(width),
  y: height,
  vx: 0,
  vy: -2
}

}

function draw() {
  background(0);

  if (predictions.length > 0){
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
    stroke(122, 91, 50);
    strokeWeight(8)
    line(baseX, baseY, tipX, tipY)
    pop()

    push() // Brush head
    imageMode(CENTER)
    image(lollipop, baseX, baseY, 50, 50)
    pop()

    //Check ball popping
    let d = dist(baseX, baseY, tooth.x, tooth.y)
    if (d < 50){
      happyTooth = sadTooth
    }
  }

  tooth.x += tooth.vx
  tooth.y += tooth.vy

  if (tooth.y < 0){
    tooth.x = random(width)
    tooth.y = height
    happyTooth = resetTooth
  }

  push()
  fill(0, 100, 200)
  noStroke()
  image(happyTooth, tooth.x, tooth.y, 60, 60)
  pop()
}
