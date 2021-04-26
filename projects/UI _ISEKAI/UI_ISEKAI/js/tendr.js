// This application named 'tendr' is an obvious spin off the famous app Tinder. A random profile card is generated with a name, avatar, request, and distance. The user can swipe right to accept the request, or swipe left to reject it.

"use-strict";

let canvas = undefined; // Variable used to store the createCanvas command
let state = "intro"; // State variable to facilatate an intro
let names = undefined; // Variable to hold the JSON file for names
let quests = undefined; // Variable to hold the JSON file for quests
let distances = []; // Array which will carry a list of possible distances
// Object which carries the variables for the profile cards
let card = {
  name: undefined,
  // Position variables for name
  nameX: 500,
  nameY: 80,
  quest: undefined,
  // Position variables for quests
  questX: 680,
  questY: 650,
  swipeAmount: 0, // Carries the amount of pixels the card has been swiped by the user
  swiped: false, // Checks if the user has the card swiped
  swipeable: false, // Checks if the user should be able to swipe the card
  yes: undefined, // Img var
  no: undefined, // Img var
  yesOpacity: 0,
  noOpacity: 0,
  font: undefined,
  distance: undefined,
  // Amount of the pixels the card needs to be swiped for it to be a swipe right or left
  swipeRightAmount: 180,
  swipeLeftAmount: -180,
};

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
  noseImage = loadImage(`assets/images/head/nose.png`);
  mouthImage = loadImage(`assets/images/head/mouth.png`);
  glasses = loadImage(`assets/images/head/glasses.png`)

  names = loadJSON(`assets/data/names.json`);
  quests = loadJSON(`assets/data/quests.json`);
  card.yes = loadImage(`assets/images/tendr/yes.png`);
  card.no = loadImage(`assets/images/tendr/no.png`);
  card.font = loadFont(`assets/fonts/tendr.ttf`);

}

function setup() {
  canvas = createCanvas(1368, 768);
  canvas.position(0, 0);
  canvas.style(`z-index`, `-1`); // P5 canvas used as the background
  canvas.parent("#canvas"); // Assigns the canvas to the div #canvas

  ui = new UserInterface();
  avi = new Avatar();

  startButton();
  createDistances();
}

function draw() {
  background(255);

  ui.focused();
  ui.music();

  changingAvatars();
  displayCard();
  swipe();
}

function mousePressed() {
  startSwipe();
}

function mouseReleased() {
  card.swiped = false; // Resets the card
  if (card.swipeAmount > card.swipeRightAmount) {
    // If card swiped enough to the right
    createNewCard();
  } else if (card.swipeAmount < card.swipeLeftAmount) {
    // If card swiped enough to the left
    createNewCard();
  } else {
    card.swipeAmount = 0; // Resets position of card if it was not swiped far enough in either direction
  }
}
// Called in the intro state. Displays different avatars at a rate depending on the mouse's x position
function changingAvatars() {
  if (state === "intro") {
    let fps = map(mouseX, 0, width, 3, 6); // Maps mouse's x position to the frame rate.
    frameRate(fps); // The frame rate dictates the rate at which the avatar changes
    clear();
    avi.createRandomAvatar();
    avi.displayAvatar(width / 2, height / 2 - 100);
  }
}
// Displays and controls the functionality of the start button
function startButton() {
  $("#startButton").on("click", function () {
    // Event listener
    state = "swipe"; // Switches state
    $("#startButton").addClass("hide"); // Hides start button
    avi.createRandomAvatar(); // Creates an avatar
    card.name = random(names.names); // Picks a random string from the name json file
    card.quest = random(quests.quests); // Picks a random quest from the quest json file
    card.distance = random(distances); // Picks a random distance from the distances array
    setTimeout(function () {
      card.swipeable = true;
    }, 100); // Makes the card swipeable with after a short duration. Prevents clicking bugs
  });
}
// Displays the card profile
function displayCard() {
  if (state === "swipe") {
    push();
    textFont(card.font); // Assigns font
    rectMode(CENTER);
    fill(220);
    noStroke();
    // card.swipeAmount is added to the x position of every element on the card so they move with the swiping
    rect(width / 2 + card.swipeAmount, height / 2, 400, 700, 10); // Draws the base of the card
    avi.displayAvatar(width / 2 + card.swipeAmount, height / 2 - 100); // Displays avatar
    textSize(38);
    fill(0);
    text(card.name, card.nameX + card.swipeAmount, card.nameY); // Displays name
    textSize(18);
    text(card.quest, card.questX + card.swipeAmount, card.questY, 300, 200); // Displays the quest
    text(
      `${card.distance} kilometers away`,
      card.questX + card.swipeAmount - 150,
      card.questY + 50
    ); // Displays the distance away
    pop();
  }
}
// Allows the user to swipe the card once its clicked
function startSwipe() {
  if (
    mouseX >= 486 &&
    mouseX <= 882 &&
    mouseY >= 37 &&
    mouseY <= 732 &&
    card.swipeable === true
  ) {
    card.swiped = true;
  }
}
// Controls the swiping of the card
function swipe() {
  if (state === "swipe") {
    if (card.swiped === true) {
      card.swipeAmount = map(mouseX, 0, width, -300, 300);
      push();
      imageMode(CENTER);
      card.yesOpacity = map(card.swipeAmount, 0, card.swipeLeftAmount, 0, 255); // Maps the opacity of the yes image to the amount that has been swiped. Its opacity is full when it has been swiped right enough
      tint(255, card.yesOpacity); // Changes the yes image's opacity
      image(card.yes, width / 2 + card.swipeAmount, height / 2); // Displays the yes image
      card.noOpacity = map(card.swipeAmount, card.swipeLeftAmount, 0, 255, 0); // Maps the opacity of the yes image to the amount that has been swiped. Its opacity is full when it has been swiped left enough
      tint(255, card.noOpacity); // Changes the yes image's opacity
      image(card.no, width / 2 + card.swipeAmount, height / 2); // Displays the no image
      pop();
    }
  }
}
// Generates new information to be displayed on the card
function createNewCard() {
  clear(); // Resets the canvas
  // Resets the properties of the card
  card.swipeable = false;
  card.swiped = false;
  card.swipeAmount = 0;
  avi.createRandomAvatar();
  card.name = random(names.names);
  card.quest = random(quests.quests);
  card.distance = random(distances);
  setTimeout(function () {
    card.swipeable = true;
  }, 100);
  displayCard();
}
// Loop which fills the array with distances between 0 and 3 in 0.1 increments
function createDistances() {
  for (let i = 0; i < 3; i = i + 0.1) {
    distances.push(i);
  }
}
