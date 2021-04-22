"use-strict"

let canvas; // Variable used to store the createCanvas command
let state = "intro"

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

function setup(){
  canvas = createCanvas(1368, 768)
  canvas.position(0, 0);
  canvas.style(`z-index`, `-1`) // P5 canvas used as the background
  canvas.parent("#canvas"); // Assigns the canvas to the div #canvas

  ui = new UserInterface();
  avi = new Avatar();

  startButton()
}

function draw(){
  background(255)
  ui.focused();

  changingAvatars();
}

function changingAvatars(){
  if (state === "intro"){
    frameRate(3)
    clear();
    avi.createRandomAvatar(width/2, height/2 - 100);
  }
}

function startButton(){
  $("#start").on("click", function(){
    state = "swipe"
    $(".ui").addClass("hide")
  })
}
