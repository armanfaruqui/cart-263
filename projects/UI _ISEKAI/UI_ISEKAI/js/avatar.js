// Generates a random face with a different hairstyle, face shape, complexion, eyes, and eyebrows from a bunch of different hand drawn images

"use strict";

// Arrays containing images
let hairBlack = [];
let hairBrown = [];
let hairBlonde = [];
let brow = [];
let browBlonde = [];
let eyes = [];
let head = [];
let headWithHair = [];

let addHair; // Used to check if hair should be added to the avatar

// Used to check the hair color to match with the eyebrows
let blonde;
let brunette;
let bald;

// Variables which hold the
let headImage;
let hairImage;
let browImage;
let eyesImage;
let noseImage;
let mouthImage;

// For loops used to preload multiple images since they have similair file names
function preload() {
  for (let i = 0; i < 15; i++) {
    // Black and brown hairstyles
    hairBlack.push(loadImage(`assets/images/hair/hair${i}_1.png`));
    hairBrown.push(loadImage(`assets/images/hair/hair${i}_2.png`));
  }

  for (let i = 0; i < 6; i++) {
    // Blonde hairstyles
    hairBlonde.push(loadImage(`assets/images/hair/hairBlonde${i}.png`));
  }

  for (let i = 1; i < 9; i++) {
    // Black and brown eyes
    eyes.push(loadImage(`assets/images/eyes/eye${i}_1.png`));
    eyes.push(loadImage(`assets/images/eyes/eye${i}_2.png`));
  }
  eyes.push(loadImage(`assets/images/eyes/eyeGrey1.png`));
  eyes.push(loadImage(`assets/images/eyes/eyeGrey2.png`)); // Grey eyes

  for (let i = 1; i < 13; i++) {
    // Black and brown brows
    brow.push(loadImage(`assets/images/brows/brow${i}.png`));
  }
  for (let i = 1; i < 5; i++) {
    // Gre brows
    browBlonde.push(loadImage(`assets/images/brows/browBlonde${i}.png`));
  }

  for (let i = 0; i < 5; i++) {
    // Heads
    head.push(loadImage(`assets/images/head/head1_${i}_0.png`));
    head.push(loadImage(`assets/images/head/head2_${i}_0.png`));
    head.push(loadImage(`assets/images/head/head3_${i}_0.png`));
    head.push(loadImage(`assets/images/head/head4_${i}_0.png`)); // Heads without hair

    headWithHair.push(loadImage(`assets/images/head/head1_${i}_1.png`));
    headWithHair.push(loadImage(`assets/images/head/head1_${i}_2.png`));
    headWithHair.push(loadImage(`assets/images/head/head1_${i}_3.png`));
    headWithHair.push(loadImage(`assets/images/head/head2_${i}_1.png`));
    headWithHair.push(loadImage(`assets/images/head/head2_${i}_2.png`));
    headWithHair.push(loadImage(`assets/images/head/head2_${i}_3.png`));
    headWithHair.push(loadImage(`assets/images/head/head3_${i}_1.png`));
    headWithHair.push(loadImage(`assets/images/head/head3_${i}_2.png`));
    headWithHair.push(loadImage(`assets/images/head/head3_${i}_3.png`));
    headWithHair.push(loadImage(`assets/images/head/head4_${i}_1.png`));
    headWithHair.push(loadImage(`assets/images/head/head4_${i}_2.png`));
    headWithHair.push(loadImage(`assets/images/head/head4_${i}_3.png`)); // Heads with hair
  }
  noseImage = loadImage(`assets/images/head/nose.png`) // Nose
  mouthImage = loadImage(`assets/images/head/mouth.png`) // Mouth
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  textSize(14)
  text("Click to generate a random avatar", 100, 100)
}

function mousePressed(){
  clear();
  createRandomAvatar(width/2, height/2);
  console.log(blonde)
  console.log(brunetteOrBlonde)
}

function createRandomAvatar(x, y) {
  // ASSIGNING PHASE
  let whichHead = random(); // Random number between 1 and 0 to decide which array the head is pulled from
  console.log(whichHead)
  if (whichHead < 0.85) {
    // 85% chance head will not have any hair drawn on it from before
    headImage = random(head);
    addHair = true; // Since head has no hair
  } else if (whichHead > 0.85) {
    // 15% chance head will have any hair drawn on it from before
    headImage = random(headWithHair);
    bald = true; // Avi is bald
  }
  let brunetteOrBlonde = random(); // Random number between 1 and 0 to decide which array the hair is pulled from
  if (brunetteOrBlonde < 0.39 && addHair === true) {
    hairImage = random(hairBlack);
    brunette = true; // Avi's is a brunette
    blonde = false;
  }
  else if (brunetteOrBlonde > 0.39 && brunetteOrBlonde < 0.78 && addHair === true) {
    hairImage = random(hairBrown);
    brunette = true; // Avi's is a brunette
    blonde = false;
  } else if (
    brunetteOrBlonde > 0.78 &&
    brunetteOrBlonde < 0.95 &&
    addHair === true
  ) {
    hairImage = random(hairBlonde);
    blonde = true; // Avi is blonde
    brunette = false;
  }
  let haveBrows = random(); // Random number between 1 and 0 to decide if avatar should have eyebrows
  if (haveBrows < 0.93) {
    if (blonde === true) {
      browImage = random(browBlonde);
    } else if (brunette === true) {
      browImage = random(brow);
    }
  }
  eyesImage = random(eyes);

  // DISPLAYING PHASE
  imageMode(CENTER);
  image(headImage, x, y) // Displays head
  if (haveBrows < 0.93){
    image(browImage, x, y - 40) // Displays brows
  }
  image(eyesImage, x, y - 15) // Displays eyes
  if (brunetteOrBlonde < 0.95){
    image(hairImage, x, y + 100); // Displays hair
  }
  image(noseImage, x, y + 20) // Displays nose
  image(mouthImage, x, y + 60) // Displays mouth
}
