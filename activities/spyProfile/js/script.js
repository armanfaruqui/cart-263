"use strict";

let spyProfile = {
  name: `**REDACTED**`,
  alias: `**REDACTED**`,
  secretWeapon: `**REDACTED**`,
  password: `**REDACTED**`,
  mission: `**REDACTED`
};

let instrumentData = undefined;
let objectData = undefined;
let tarotData = undefined;
let countryData = undefined;
let taskData = undefined;

//Position variables for reset buttons
let resetButtons = {
  x: 580,
  y1: 164,
  y2: 164 + 30,
  y3: 164 + 60,
}

function preload() {
  tarotData = loadJSON(`https://raw.githubusercontent.com/dariusk/corpora/master/data/divination/tarot_interpretations.json`)
  instrumentData = loadJSON(`https://raw.githubusercontent.com/dariusk/corpora/master/data/music/instruments.json`)
  objectData = loadJSON(`https://raw.githubusercontent.com/dariusk/corpora/master/data/objects/objects.json`)
  countryData = loadJSON(`https://raw.githubusercontent.com/dariusk/corpora/master/data/geography/countries.json`)
  taskData = loadJSON(`assets/data/tasks.json`)
}

/**
Description of setup
*/
function setup() {
  createCanvas(windowWidth, windowHeight);

  let data = JSON.parse(localStorage.getItem(`spy-profile-data`))
  if (data !== null) {
    let password = prompt(`Agent. What is your password?`)
    if (password === data.password) {
      spyProfile.name = data.name
      spyProfile.alias = data.alias
      spyProfile.secretWeapon = data.secretWeapon
      spyProfile.password = data.password
      spyProfile.mission = data.mission
    } else if (password === `reset`) { //Allows the user to create a new account
      generateSpyProfile()
    }
  } else {
    generateSpyProfile()
  }
}

function generateSpyProfile() {
  spyProfile.name = prompt('Agent. What is your name?');
  let instrument = random(instrumentData.instruments);
  spyProfile.alias = `The ${instrument}`;
  spyProfile.secretWeapon = random(objectData.objects);
  let card = random(tarotData.tarot_interpretations);
  spyProfile.password = random(card.keywords);
  let country = random(countryData.countries);
  let task = random(taskData.tasks);
  spyProfile.mission = `${task} in ${country}`;

  localStorage.setItem(`spy-profile-data`, JSON.stringify(spyProfile));
}

/**
Description of draw()
*/
function draw() {
  background(255);

  let profile = `** SPY PROFILE DO NOT DISTRIBUTE! **
  Name: ${spyProfile.name}
  Alias: ${spyProfile.alias}
  Secret Weapon: ${spyProfile.secretWeapon}
  Password: ${spyProfile.password}
  Assigned Mission: ${spyProfile.mission}`

  // console.log(`X${mouseX}`)
  // console.log(`Y${mouseY}`)

  displayResetButtons()

  push();
  textFont(`Courier, monospace`);
  textSize(24);
  textAlign(LEFT, TOP);
  text(profile, 100, 100)
  pop();
}

function mousePressed() {
  if (mouseX > resetButtons.x - 8 && mouseX < resetButtons.x + 18 && mouseY > resetButtons.y1 - 3 && mouseY < resetButtons.y1 + 13) {
    let instrument = random(instrumentData.instruments);
    spyProfile.alias = `The ${instrument}`;
    localStorage.setItem(`spy-profile-data`, JSON.stringify(spyProfile));
  }
  if (mouseX > resetButtons.x - 8 && mouseX < resetButtons.x + 18 && mouseY > resetButtons.y2 - 3 && mouseY < resetButtons.y2 + 13) {
    spyProfile.secretWeapon = random(objectData.objects);
    localStorage.setItem(`spy-profile-data`, JSON.stringify(spyProfile));
  }
  if (mouseX > resetButtons.x - 8 && mouseX < resetButtons.x + 18 && mouseY > resetButtons.y3 - 3 && mouseY < resetButtons.y3 + 13) {
    let card = random(tarotData.tarot_interpretations);
    spyProfile.password = random(card.keywords);
    localStorage.setItem(`spy-profile-data`, JSON.stringify(spyProfile));
  }
}

// displays reset buttons
function displayResetButtons() {
  push()
  fill(248, 0, 32)
  noStroke()
  triangle(resetButtons.x, resetButtons.y1, resetButtons.x, resetButtons.y1 + 20, resetButtons.x + 15, resetButtons.y1 + 10)
  triangle(resetButtons.x, resetButtons.y2, resetButtons.x, resetButtons.y2 + 20, resetButtons.x + 15, resetButtons.y2 + 10)
  triangle(resetButtons.x, resetButtons.y3, resetButtons.x, resetButtons.y3 + 20, resetButtons.x + 15, resetButtons.y3 + 10)
  pop()
}
