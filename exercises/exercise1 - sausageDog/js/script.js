"use strict";

const NUM_ANIMAL_IMAGES = 10;
const NUM_ANIMALS = 120;

let animalImages = [];
let animals = [];

let lives = 4;

let sausageDogImage;
let sausageDog;
let titleScreen;
let lossScreen;

let state = "title" // State variable

function preload() {
  for (let i = 0; i < NUM_ANIMAL_IMAGES; i++){
    let animalImage = loadImage(`assets/images/animal${i}.png`);
    animalImages.push(animalImage);
  }
  sausageDogImage = loadImage(`assets/images/sausage-dog.png`)
  titleScreen = loadImage(`assets/images/titleScreen.png`)
  lossScreen = loadImage(`assets/images/gordon.jpg`)

}

function setup() {
  createCanvas(windowWidth, windowHeight);

  for (let i = 0; i < NUM_ANIMALS; i++){
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

  displayRelevantScreen();
  result();

  displayAnimals();

  displayLives();

  sausageDog.update();
}

function mousePressed(){
  sausageDog.mousePressed()
  if (state === "title"){
    state = "game"
  }
}

function displayAnimals(){
  if (state === "game"){
  for (let i = 0; i < animals.length; i++){
    animals[i].update();
    }
  }
}

function displayRelevantScreen(){
  if (state === "title"){
    push();
    image(titleScreen, 0, 0, width, height);
    pop();
  }

  if (state === "loss"){
    push();
    imageMode(CENTER);
    image(lossScreen, windowWidth/2, windowHeight/2);
    pop();
  }

  if (state === "win"){
    setTimeout()
  }
}

function displayLives(){
  if (state === "game"){
  textSize(24)
  fill(255, 0, 0)
  text(`${lives} Lives remaining`, 10, 30)
  }
}

function gameLoss(){
  if (lives < 1){
    state = "loss"
  }
}

function gameWin(){
  if (sausageDog.found === true){

  }
}
