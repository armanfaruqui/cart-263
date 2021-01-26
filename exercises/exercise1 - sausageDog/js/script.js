"use strict";

const NUM_ANIMAL_IMAGES = 10;
const NUM_ANIMALS = 110;

let animalImages = [];
let animals = [];

let lives = 4;

let sausageDogImage;
let sausageDog;
let titleScreen;
let lossScreen;
let winScreen;

let state = "title" // State variable

function preload() {
  for (let i = 0; i < NUM_ANIMAL_IMAGES; i++) {
    let animalImage = loadImage(`assets/images/animal${i}.png`);
    animalImages.push(animalImage);
  }
  sausageDogImage = loadImage(`assets/images/sausage-dog.png`)
  titleScreen = loadImage(`assets/images/titleScreen.png`)
  lossScreen = loadImage(`assets/images/gordon.jpg`)
  winScreen = loadImage(`assets/images/winScreen.jpg`)

}

function setup() {
  createCanvas(windowWidth, windowHeight);

  for (let i = 0; i < NUM_ANIMALS; i++) {
    let x = random(0, width);
    let y = random(0, height);
    let animalImage = random(animalImages);
    let animal = new Animal(x, y, animalImage);
    animals.push(animal);
  }

  let x = random(0, width);
  let y = random(0, height);
  sausageDog = new SausageDog(x, y, sausageDogImage)
}

function draw() {

  background(34, 68, 32)

  gameLoss();
  displayRelevantScreen();
  restartButton()

  displayAnimals();

  displayLives();

  sausageDog.update();

  console.log(state)
}

function mousePressed() {
  sausageDog.mousePressed()
  if (state === "title") {
    state = "game"
  }

  // Restarts game
  if (state !== "title" && state !== "game" && mouseX > 30 && mouseX < 130 && mouseY > 30 && mouseY < 80) {
    state = "game"
    sausageDog.found = false
    sausageDog.x = random(0, width)
    sausageDog.y = random(0, height)
    sausageDog.angle = 0
    lives = 3
  }
}

function displayAnimals() {
  if (state === "game") {
    for (let i = 0; i < animals.length; i++) {
      animals[i].update();
    }
  }
}

function displayRelevantScreen() {
  if (state === "title") {
    push();
    image(titleScreen, 0, 0, width, height);
    pop();
  }

  if (state === "loss") {
    push();
    imageMode(CENTER);
    image(lossScreen, windowWidth / 2, windowHeight / 2);
    pop();
  }
  // Lets dog spin for 3 seconds before switching to the victory screen
  if (sausageDog.found === true && state === "game") {
    setTimeout(function(){state = "win"}, 3000);
  }

  if (state === "win") {
    push();
    imageMode(CENTER);
    image(winScreen, windowWidth / 2, windowHeight / 2);
    text("VICTORY", windowWidth / 2 - 75, windowHeight / 2 - 200)
    pop();
  }
}

// Displays live counter
function displayLives() {
  if (state === "game") {
    textSize(24)
    fill(255, 0, 0)
    text(`${lives} Lives remaining`, 10, 30)
  }
}

// Checks is user runs out of lives
function gameLoss() {
  if (state === "game" && lives < 1) {
    state = "loss"
  }
}

// Displays the restart button
function restartButton() {
  if (state === "win" || state === "loss") {
    push()
    fill(169, 237, 164)
    rect(30, 30, 100, 50)
    fill(233, 0, 0)
    text("Restart", 40, 60)
    pop()
  }
}
