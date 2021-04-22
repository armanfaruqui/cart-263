// This simualation allows the user to customize and maintain their very own digital garden. Its appearance can be customizzed through changing the sky's image, grass' hue, and shelter in the background. The user can add specific flower's, or a singular bee, both which shrink in size unless they are overlapping which makes them grow. Adding these elements costs 'karma'. Sky's and shelters also require you to have a certain amount of karma for them to be accessible.

"use-strict";

// Object which carries general information about the simulation
let garden = {
  // Arrays which store different elements
  orchids: [],
  daisys: [],
  hibiscus: [],
  bees: [],
  litter: [],
  // Counters which keep track of the number of each different element
  numOrchids: 0,
  numDaisys: 0,
  numHibiscus: 0,
  numBees: 3,
  numLitter: 0,

  maxBees: 18, // Used to limit the number of bees that can be called
  grassColor: {
    r: 120,
    g: 180,
    b: 120,
  },
  // Image variables
  grass: undefined,
  sky: undefined,
  shelter: undefined,
  // Booleans used to check if a change has been applied
  displayShelter: false,
  tintGrass: false,
};

// Object which carries the various sky images
let sky = {
  regular: undefined,
  pink: undefined,
  purple: undefined,
  red: undefined,
  orange: undefined,
  shine: undefined,
  saturn: undefined,
  void: undefined,
};
// Object which carries the various shelter images
let shelter = {
  shack: undefined,
  mudhut: undefined,
  chapel: undefined,
  mushroom: undefined,
  antartic: undefined,
  foliage: undefined,
  tupik: undefined,
  namekian: undefined,
  alkebulan: undefined,
};
// Object with holds the various songs
let music = {
  bambam: undefined,
  wangshu: undefined,
  avery: undefined,
  subha: undefined,
  peru: undefined,
  babushka: undefined
}

// Object which carries the various litter images
let garbage = [];

let karma = 1000; // Form of currency

let saveData = {
  karma: undefined,
  orchids: [],
  daisys: [],
  hibiscus: [],
  bees: [],
  litter: [],
  sky: undefined,
  shelter: undefined,
  grassColor: undefined
}

function preload() {
  garden.grass = loadImage(`assets/images/garden/grass.png`);

  sky.regular = loadImage(`assets/images/garden/bgReg.png`);
  sky.pink = loadImage(`assets/images/garden/bgPink.png`);
  sky.red = loadImage(`assets/images/garden/bgRed.png`);
  sky.purple = loadImage(`assets/images/garden/bgPurple.png`);
  sky.orange = loadImage(`assets/images/garden/bgOrange.png`);
  sky.shine = loadImage(`assets/images/garden/bgShine.png`);
  sky.saturn = loadImage(`assets/images/garden/bgSaturn.png`);
  sky.void = loadImage(`assets/images/garden/bgVoid.png`);

  shelter.shack = loadImage(`assets/images/garden/shack.png`);
  shelter.mudhut = loadImage(`assets/images/garden/mudhut.png`);
  shelter.chapel = loadImage(`assets/images/garden/slavicChapel.png`);
  shelter.mushroom = loadImage(`assets/images/garden/mushroom house.png`);
  shelter.antartic = loadImage(`assets/images/garden/igloo.png`);
  shelter.foliage = loadImage(`assets/images/garden/grassHouse.png`);
  shelter.tupik = loadImage(`assets/images/garden/teepee.png`);
  shelter.namekian = loadImage(`assets/images/garden/namekHouse.png`);
  shelter.alkebulan = loadImage(`assets/images/garden/africanHut.png`);

  garbage[0] = loadImage(`assets/images/garden/wrapper.png`);
  garbage[1] = loadImage(`assets/images/garden/bags.png`);
  garbage[2] = loadImage(`assets/images/garden/plasticBag.png`);
  garbage[3] = loadImage(`assets/images/garden/bottle.png`);
  garbage[4] = loadImage(`assets/images/garden/tissue.png`);

  music.bambam = loadSound(`assets/sounds/music/bambam.mp3`);
  music.wangshu = loadSound(`assets/sounds/music/wangshu.mp3`);
  music.avery = loadSound(`assets/sounds/music/avery.mp3`);
  music.subha = loadSound(`assets/sounds/music/subha.mp3`);
  music.peru = loadSound(`assets/sounds/music/peru.mp3`);
  music.babushka = loadSound(`assets/sounds/music/babushka.mp3`);
}

function setup() {
  hideOptions();
  changeGrass();

  createCanvas(800, 600);

  garden.sky = sky.regular; // Assigns the default sky background
  ui = new UserInterface();
  litter = new Litter(garbage)

  initializeGarden();
  manifestFlower();
  callBee();
}

saveGardenData();
playMusic();

function draw() {
  background(0);

  displaySky();
  displayGrass();
  displayShelter();

  ui.focused();
  karmaCounter();
  options();

  displayFlowers();
  displayBees();

  checkForLitter();
  displayLitter();
}

// Called upon each mouse click
function mousePressed() {
  litter.cleanUp();
}

// Displays the relevant flower's and bees
function initializeGarden(){
  let data = JSON.parse(localStorage.getItem(`garden data`));
  // if (data !== null){
  //   saveData = data
  //     garden.orchids = saveData.orchids
  //     garden.daisys = saveData.daisys
  //     garden.hibiscus = saveData.hibiscus
  //     garden.bees = saveData.bees
  //     garden.litter = saveData.litter
  //     garden.sky = saveData.sky
  //     garden.shelter = saveData.shelter
  // }
  for (let i = 0; i < garden.numOrchids; i++) {
    createOrchid();
  }

  for (let i = 0; i < garden.numDaisys; i++) {
    createDaisy();
  }

  for (let i = 0; i < garden.numHibiscus; i++) {
    createHibiscus();
  }

  for (let i = 0; i < garden.numBees; i++) {
    createBee();
  }
}
// Displays the grass and allows the color of it to be tinted
function displayGrass() {
  push();
  if (garden.tintGrass === true) {
    tint(colorPicker.value);
  }
  image(garden.grass, 0, -100);
  pop();
}
// Creates a new orchid flower
function createOrchid() {
  let x = random(0, width);
  let y = random(150, height);
  let size = random(50, 80);
  let stemLength = random(50, 100);
  let petalColor = {
    r: random(100, 255),
    g: random(100, 255),
    b: random(100, 255),
  };
  let flower = new Flower(x, y, size, stemLength, petalColor);
  garden.orchids.push(flower);
}
// Creates a new daisy flower
function createDaisy() {
  let x = random(0, width);
  let y = random(150, height);
  let size = random(15, 30);
  let stemLength = random(30, 80);
  let flower = new Flower(x, y, size, stemLength);
  garden.daisys.push(flower);
}
// Creates a new hibiscus flower
function createHibiscus() {
  let x = random(0, width);
  let y = random(150, height);
  let size = random(30, 50);
  let stemLength = random(40, 75);
  let petalColor = {
    r: random(180, 255),
    g: random(100, 255),
    b: random(100, 255),
  };
  let flower = new Flower(x, y, size, stemLength, petalColor);
  garden.hibiscus.push(flower);
}
// Displays the flowers and applies the shrink method so they lose size over time
function displayFlowers(){
  for (let i = 0; i < garden.orchids.length; i++) { // Displays orchids
    let flower = garden.orchids[i];
    if (flower.alive) {
      flower.shrink();
      flower.displayOrchid();
    }
  }
  for (let i = 0; i < garden.daisys.length; i++) { // Displays orchids
    let flower = garden.daisys[i];
    if (flower.alive) {
      flower.shrink();
      flower.displayDaisy();
    }
  }
  for (let i = 0; i < garden.hibiscus.length; i++) { // Displays orchids
    let flower = garden.hibiscus[i];
    if (flower.alive) {
      flower.shrink();
      flower.displayHibiscus();
    }
  }
}
// Code for the 'manifest flower' button which adds flowers to the garden
function manifestFlower() {
  $("input[type=radio]").checkboxradio({ // Makes the fieldset a checkbox radio
    disabled: false,
  });
  $(`#orchid`).on("click", function (event) { // Checks for clicks on the orchid option
    if (karma >= 10) { // Checks if the user has enough karma
      createOrchid(); // Creates the new orchid
      karma -= 10; // Subtracts the karma it costs
      garden.numOrchids += 1; // Increments the orchid counter
    }
  });
  // Same function is repeated for the other flowers
  $(`#daisy`).on("click", function (event) {
    if (karma >= 10) {
      createDaisy();
      karma -= 10;
      garden.numDaisys += 1;
    }
  });

  $(`#hibiscus`).on("click", function (event) {
    if (karma >= 10) {
      createHibiscus();
      karma -= 10;
      garden.numHibiscus += 1;
    }
  });
}
// Displays the bees in the garden
function displayBees(){
  for (let i = 0; i < garden.bees.length; i++) {
    let bee = garden.bees[i];
    if (bee.alive) {
      bee.shrink();
      bee.move();
      bee.display();
    }
    // Adds the pollinate method for the orchids
    for (let j = 0; j < garden.orchids.length; j++) {
      let flower = garden.orchids[j];
      if (flower.alive) { // Checks if the flower is alive first
        bee.tryToPollinate(flower);
      }
    }
    // Adds the pollinate method for the orchids
    for (let j = 0; j < garden.daisys.length; j++) {
      let flower = garden.daisys[j];
      if (flower.alive) {
        bee.tryToPollinate(flower);
      }
    }
    for (let j = 0; j < garden.hibiscus.length; j++) {
      let flower = garden.hibiscus[j];
      if (flower.alive) {
        bee.tryToPollinate(flower);
      }
    }
  }
}
// Creates a new singular bee at a random position on the canvas
function createBee() {
  let bee = new Bee(random(0, width), random(150, height));
  garden.bees.push(bee); // Pushes it into the bee array
}
// Controls the div button which adds a new bee to the canvas
function callBee() {
  if (garden.numBees < garden.maxBees) // Checks if the number of bees has exceeded the limit
    $(`#addBee`).on("click", function (event) { // Checks for clicks on the bee div button
      if (karma >= 10) { // Checks if the user has enough karma
        createBee();
        karma -= 10; // Subtracts the cost from your karma
        garden.numBees += 1; // Increments the bee counter
      }
    });
}
// Displays the background sky
function displaySky() {
  image(garden.sky, 0, 0);

  // Checks for clicks on all the radio button options for the sky
  $(`#usual`).on("click", function (event) {
    garden.sky = sky.regular; // Assigns the selected sky to variable used to display the sky
    $(".changeSky").addClass("hidden"); // Hides the options when one of them are selected
    $(".changeSky").removeClass("shown");
  });
  // Same function repeated for all the other sky options
  $(`#rose`).on("click", function (event) {
    if (karma >= 200) { // Checks if the user has enough karma to unlock them. (Karma is not subtracted)
      garden.sky = sky.pink;
      $(".changeSky").addClass("hidden");
      $(".changeSky").removeClass("shown");
    } else {
      console.log("not enough karma");
    }
  });

  $(`#grape`).on("click", function (event) {
    if (karma >= 400) {
      garden.sky = sky.purple;
      $(".changeSky").addClass("hidden");
      $(".changeSky").removeClass("shown");
    } else {
      console.log("not enough karma");
    }
  });

  $(`#scarlet`).on("click", function (event) {
    if (karma >= 1200) {
      garden.sky = sky.red;
      $(".changeSky").addClass("hidden");
      $(".changeSky").removeClass("shown");
    } else {
      console.log("not enough karma");
    }
  });

  $(`#salmon`).on("click", function (event) {
    if (karma >= 1200) {
      garden.sky = sky.orange;
      $(".changeSky").addClass("hidden");
      $(".changeSky").removeClass("shown");
    } else {
      console.log("not enough karma");
    }
  });

  $(`#shine`).on("click", function (event) {
    if (karma >= 2000) {
      garden.sky = sky.shine;
      $(".changeSky").addClass("hidden");
      $(".changeSky").removeClass("shown");
    } else {
      console.log("not enough karma");
    }
  });

  $(`#beyond`).on("click", function (event) {
    if (karma >= 2000) {
      garden.sky = sky.saturn;
      $(".changeSky").addClass("hidden");
      $(".changeSky").removeClass("shown");
    } else {
      console.log("not enough karma");
    }
  });

  $(`#mars`).on("click", function (event) {
    if (karma >= 2000) {
      garden.sky = sky.void;
      $(".changeSky").addClass("hidden");
      $(".changeSky").removeClass("shown");
    } else {
      console.log("not enough karma");
    }
  });
}
// Displays the relevant shelter in the background
function displayShelter() {
  $(`#shack`).on("click", function (event) { // Checks for clicks on the radio button option
    if (karma >= 200) { // Checks if the user has enough karma to unlock it (karma is not meant to be subtracted)
      garden.shelter = shelter.shack; // Assigns the image variable to the one used to display the shelter
      $(".changeShelter").addClass("hidden"); // Hides the shelter options when one is selected
      $(".changeShelter").removeClass("shown");
      garden.displayShelter = true; // Assigns the variable which checks if there should be a shelter to true
    } else {
      console.log("not enough karma");
    }
  });
  // Same function repeated for the other options
  $(`#chapel`).on("click", function (event) {
    if (karma >= 300) {
      garden.shelter = shelter.chapel;
      $(".changeShelter").addClass("hidden");
      $(".changeShelter").removeClass("shown");
      garden.displayShelter = true;
    } else {
      console.log("not enough karma");
    }
  });
  $(`#mudhut`).on("click", function (event) {
    if (karma >= 300) {
      garden.shelter = shelter.mudhut;
      $(".changeShelter").addClass("hidden");
      $(".changeShelter").removeClass("shown");
      garden.displayShelter = true;
    } else {
      console.log("not enough karma");
    }
  });
  $(`#mushroom`).on("click", function (event) {
    if (karma >= 700) {
      garden.shelter = shelter.mushroom;
      $(".changeShelter").addClass("hidden");
      $(".changeShelter").removeClass("shown");
      garden.displayShelter = true;
    } else {
      console.log("not enough karma");
    }
  });
  $(`#antartic`).on("click", function (event) {
    if (karma >= 700) {
      garden.shelter = shelter.antartic;
      $(".changeShelter").addClass("hidden");
      $(".changeShelter").removeClass("shown");
      garden.displayShelter = true;
    } else {
      console.log("not enough karma");
    }
  });
  $(`#foliage`).on("click", function (event) {
    if (karma >= 1100) {
      garden.shelter = shelter.foliage;
      $(".changeShelter").addClass("hidden");
      $(".changeShelter").removeClass("shown");
      garden.displayShelter = true;
    } else {
      console.log("not enough karma");
    }
  });
  $(`#namekian`).on("click", function (event) {
    if (karma >= 1100) {
      garden.shelter = shelter.namekian;
      $(".changeShelter").addClass("hidden");
      $(".changeShelter").removeClass("shown");
      garden.displayShelter = true;
    } else {
      console.log("not enough karma");
    }
  });
  $(`#tupik`).on("click", function (event) {
    if (karma >= 1600) {
      garden.shelter = shelter.tupik;
      $(".changeShelter").addClass("hidden");
      $(".changeShelter").removeClass("shown");
      garden.displayShelter = true;
    } else {
      console.log("not enough karma");
    }
  });
  $(`#alkebulan`).on("click", function (event) {
    if (karma >= 1600) {
      garden.shelter = shelter.alkebulan;
      $(".changeShelter").addClass("hidden");
      $(".changeShelter").removeClass("shown");
      garden.displayShelter = true;
    } else {
      console.log("not enough karma");
    }
  });
  // Displays the shelter
  if (garden.displayShelter === true) {
    push();
    imageMode(CENTER);
    image(garden.shelter, 600, 140);
    pop();
  }
}
// Allows the user to use a color picker to tint the color of teh grass
function changeGrass() {
  $(`#changeGrass`).on("click", function (event) {
    let colorPicker = document.createElement("input"); // Adds a div color picker when the 'paint the grass' button is pressed
    $(colorPicker).attr({
      type: "color",
      id: "colorPicker",
      name: "favcolor",
      value: "#ff0000",
    });
    $(`.buttons`).append(colorPicker);
    garden.tintGrass = true; // Changes the variable which checks if the grass should be tinted to true
    $(`#changeGrass`).off(); // Disables the click event listener once the color picker is displayed
  });
}
// Plays the relevant song when its selected
function playMusic(){
  $("#bambam").on("click", function(){ // Checks for clicks on radio buttons
    if (karma >= 600){ // Checks if user has sufficient karma
      stopMusic(); // Stops any other song from playing
      music.bambam.loop(); // Loops the selected song
      $(".music").addClass("hidden"); // Hides the song options
      $(".music").removeClass("shown");
    }
  });
  // Same function repeated for all other radio buttons
  $("#subha").on("click", function(){
    if (karma >= 600){
      stopMusic();
      music.subha.loop();
      $(".music").addClass("hidden");
      $(".music").removeClass("shown");
    }
  });
  $("#wangshu").on("click", function(){
    if (karma >= 600){
      stopMusic();
      music.wangshu.loop();
      $(".music").addClass("hidden");
      $(".music").removeClass("shown");
    }
  });
  $("#peru").on("click", function(){
    if (karma >= 600){
      stopMusic();
      music.peru.loop();
      $(".music").addClass("hidden");
      $(".music").removeClass("shown");
    }
  });
  $("#babushka").on("click", function(){
    if (karma >= 600){
      stopMusic();
      music.babushka.loop();
      $(".music").addClass("hidden");
      $(".music").removeClass("shown");
    }
  });
  $("#avery").on("click", function(){
    if (karma >= 600){
      stopMusic();
      music.avery.loop();
      $(".music").addClass("hidden");
      $(".music").removeClass("shown");
    }
  });
}
// Called in play music to prevent multiple songs playing from the same time
function stopMusic(){
  if (music.bambam.isPlaying() || music.subha.isPlaying() || music.babushka.isPlaying() || music.wangshu.isPlaying() || music.peru.isPlaying() || music.avery.isPlaying()){
    music.bambam.stop()
    music.avery.stop()
    music.subha.stop()
    music.babushka.stop()
    music.peru.stop()
    music.wangshu.stop()
  }
}
// Keeps count of how much karma you have
function karmaCounter() {
  $(`#karma`).text(`${karma} Karma`);
}
// Controls the functionality of the div buttons which display options when clicked
function options() {
  if ($(".manifestFlower").hasClass("shown")) { // Checks if the options are being displayed
    $(`#addFlower`).on("click", function (event) {
      $(".manifestFlower").addClass("hidden"); // Hides the options if they are being displayed
      $(".manifestFlower").removeClass("shown");
    });
  } else {
    $(`#addFlower`).on("click", function (event) { // If the options are not being displayed, clicking on the button displays them
      $(".manifestFlower").removeClass("hidden");
      $(".manifestFlower").addClass("shown");
      $(".changeSky").addClass("hidden"); // Hides the sky options if they are open
      $(".changeSky").removeClass("shown");
      $(".changeShelter").addClass("hidden"); // Hides the shelter options if they are open
      $(".changeShelter").removeClass("shown");
      $(".music").addClass("hidden");  // Hides music options if they are open
      $(".music").removeClass("shown");
    });
  }
  // Same function repeated for the other div buttons
  // Code for 'imagine the sky' button
  if ($(".changeSky").hasClass("shown")) {
    $(`#changeSky`).on("click", function (event) {
      $(".changeSky").addClass("hidden");
      $(".changeSky").removeClass("shown");
    });
  } else {
    $(`#changeSky`).on("click", function (event) {
      $(".changeSky").removeClass("hidden");
      $(".changeSky").addClass("shown");
      $(".manifestFlower").addClass("hidden"); // Hides the flower options if they are open
      $(".manifestFlower").removeClass("shown");
      $(".changeShelter").addClass("hidden"); // Hides the shelter options if they are open
      $(".changeShelter").removeClass("shown");
      $(".music").addClass("hidden");  // Hides music options if they are open
      $(".music").removeClass("shown");
    });
  }
  // code for 'build a shelter' button
  if ($(".changeShelter").hasClass("shown")) {
    $(`#changeShelter`).on("click", function (event) {
      $(".changeShelter").addClass("hidden");
      $(".changeShelter").removeClass("shown");
    });
  } else {
    $(`#changeShelter`).on("click", function (event) {
      $(".changeShelter").removeClass("hidden");
      $(".changeShelter").addClass("shown");
      $(".manifestFlower").addClass("hidden"); // Hides the flower options if they are open
      $(".manifestFlower").removeClass("shown");
      $(".changeSky").addClass("hidden"); // Hides the sky options if they are open
      $(".changeSky").removeClass("shown");
      $(".music").addClass("hidden"); // Hides music options if they are open
      $(".music").removeClass("shown");
    });
  }
  // code for music button
  if ($(".music").hasClass("shown")) {
    $(`#addMusic`).on("click", function (event) {
      $(".music").addClass("hidden");
      $(".music").removeClass("shown");
    });
  } else {
    $(`#addMusic`).on("click", function (event) {
      $(".music").removeClass("hidden");
      $(".music").addClass("shown");
      $(".manifestFlower").addClass("hidden"); // Hides the flower options if they are open
      $(".manifestFlower").removeClass("shown");
      $(".changeSky").addClass("hidden"); // Hides the sky options if they are open
      $(".changeSky").removeClass("shown");
      $(".changeShelter").addClass("hidden"); // Hides shelter options if they are open
      $(".changeShelter").removeClass("shown");
    });
  }
}
// Called in setup so the options are not displayed until they are requested
function hideOptions() {
  $(".manifestFlower").addClass("hidden");
  $(".changeSky").addClass("hidden");
  $(".changeShelter").addClass("hidden");
  $(".music").addClass("hidden");
}
// Initializes each litter object and pushes them into an array
function checkForLitter(){
  let chance = random(); // Generates random number between 0 and 1
  if (chance > 0.9995){ // Low chance of the number being between 0.99956 and 1 so garbage falls relatively rarely
    // Assigns starting properties used as parameters
    let x = random(0, width)
    let y = random(-500, -300)
    let y2 = random(150, height)
    let img = random(garbage) // Assigns random image from garbage array
    litter = new Litter(x, y, y2, img, garden)
    garden.litter.push(litter) // Pushes object into the array
  }
}
// Calls the function which displays and moves the litter for each element in the litter array
function displayLitter(){
  for (let i = 0; i < garden.litter.length; i++){
    let litter = garden.litter[i];
    litter.fallingLitter();
  }
}

function saveGardenData(){
  $("#save").on("click", function(){
    saveData.orchids = garden.orchids
    saveData.daisys = garden.daisys
    saveData.hibiscus = garden.hibiscus
    saveData.bees = garden.bees
    saveData.litter = garden.litter
    saveData.sky = garden.sky
    saveData.shelter = garden.shelter
    saveData.grassColor = colorPicker
    localStorage.setItem(`garden data`, JSON.stringify(saveData))
  })
}
