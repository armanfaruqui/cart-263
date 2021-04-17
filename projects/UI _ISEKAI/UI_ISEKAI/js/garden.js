// This simualation

"use-strict";

let garden = {
  flowers: [],
  bees: [],
  numFlowers: 30,
  numBees: 7,
  maxBees: 18,
  grassColor: {
    r: 120,
    g: 180,
    b: 120,
  },
  grass: undefined,
  sky: undefined,
  tintGrass: false,
};

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

let shelter = {
  shack: undefined,
  mudhut: undefined,
  chapel: undefined,
  mushroom: undefined,
  igloo: undefined,
  grass: undefined,
  teepee: undefined,
  namek: undefined,
  afroHut: undefined,
};

let blossom = {
  blooming: undefined,
  bloomed: undefined
}

let karma = 1000; // Form of currency

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
  shelter.igloo = loadImage(`assets/images/garden/igloo.png`);
  shelter.grass = loadImage(`assets/images/garden/grassHouse.png`);
  shelter.teepee = loadImage(`assets/images/garden/teepee.png`);
  shelter.namek = loadImage(`assets/images/garden/namekHouse.png`);
  shelter.afroHut = loadImage(`assets/images/garden/africanHut.png`);

  blossom.blooming = loadAnimation("assets/images/garden/blossom-unscreen-109.png", "assets/images/garden/blossom-unscreen-142.png");
  blossom.bloomed = loadAnimation("assets/images/garden/bloomed/blossom-unscreen-143.png", "assets/images/garden/bloomed/blossom-unscreen-149.png" )

}

changeGrass();

function setup() {
  $(".manifestFlower").addClass("hidden")
  $(".changeSky").addClass("hidden")

  createCanvas(800, 600);
  garden.sky = sky.regular
  ui = new UserInterface();

  for (let i = 0; i < garden.numFlowers; i++) {
    createFlower();
  }

  for (let i = 0; i < garden.numBees; i++) {
    createBee();
  }

  manifestFlower();
  callBee();
}

function draw() {
  background(0);

  displaySky();
  displayGrass();

  ui.focused();
  karmaCounter();
  options();

  for (let i = 0; i < garden.flowers.length; i++) {
    let flower = garden.flowers[i];
    if (flower.alive) {
      flower.shrink();
      flower.display();
    }
  }

  for (let i = 0; i < garden.bees.length; i++) {
    let bee = garden.bees[i];
    if (bee.alive) {
      bee.shrink();
      bee.move();
      bee.display();

      for (let j = 0; j < garden.flowers.length; j++) {
        let flower = garden.flowers[j];
        if (flower.alive) {
          bee.tryToPollinate(flower);
        }
      }
    }
  }
}

function mousePressed(){

}

function displayGrass() {
  push();
  if (garden.tintGrass === true) {
    tint(colorPicker.value);
  }
  image(garden.grass, 0, -100);
  pop();
}

function createFlower() {
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
  garden.flowers.push(flower);
}

function createBee() {
  let bee = new Bee(random(0, width), random(150, height));
  garden.bees.push(bee);
}

function manifestFlower() {
  $("input[type=radio]").checkboxradio({
    disabled: false
  });

  $(`#orchid`).on("click", function (event) {
    if (karma >= 20){
      createFlower();
      karma = karma - 20
    }
  });
}

function callBee(){
  if (garden.numBees <  garden.maxBees)
    $(`#addBee`).on("click", function (event) {
      if (karma >= 10) {
        createBee();
        karma -= 10;
        garden.numBees += 1
      }
    });
}

function displaySky(){
  image(garden.sky, 0, 0);

  $(`#rose`).on("click", function (event) {
    if (karma >= 200){
      garden.sky = sky.pink
      $(".changeSky").addClass("hidden")
      $(".changeSky").removeClass("shown")
    }
    else {
      console.log("not enough karma")
    }
  });

  $(`#rose`).on("click", function (event) {
    if (karma >= 200){
      garden.sky = sky.pink
      $(".changeSky").addClass("hidden")
      $(".changeSky").removeClass("shown")
    }
    else {
      console.log("not enough karma")
    }
  });

  $(`#rose`).on("click", function (event) {
    if (karma >= 200){
      garden.sky = sky.pink
      $(".changeSky").addClass("hidden")
      $(".changeSky").removeClass("shown")
    }
    else {
      console.log("not enough karma")
    }
  });

  $(`#grape`).on("click", function (event) {
    if (karma >= 200){
      garden.sky = sky.purple
      $(".changeSky").addClass("hidden")
      $(".changeSky").removeClass("shown")
    }
    else {
      console.log("not enough karma")
    }
  });

  $(`#scarlet`).on("click", function (event) {
    if (karma >= 600){
      garden.sky = sky.red
      $(".changeSky").addClass("hidden")
      $(".changeSky").removeClass("shown")
    }
    else {
      console.log("not enough karma")
    }
  });

  $(`#citrus`).on("click", function (event) {
    if (karma >= 600){
      garden.sky = sky.orange
      $(".changeSky").addClass("hidden")
      $(".changeSky").removeClass("shown")
    }
    else {
      console.log("not enough karma")
    }
  });

  $(`#shine`).on("click", function (event) {
    if (karma >= 200){
      garden.sky = sky.shine
      $(".changeSky").addClass("hidden")
      $(".changeSky").removeClass("shown")
    }
    else {
      console.log("not enough karma")
    }
  });

  $(`#beyond`).on("click", function (event) {
    if (karma >= 1000){
      garden.sky = sky.saturn
      $(".changeSky").addClass("hidden")
      $(".changeSky").removeClass("shown")
    }
    else {
      console.log("not enough karma")
    }
  });

  $(`#mars`).on("click", function (event) {
    if (karma >= 1000){
      garden.sky = sky.void
      $(".changeSky").addClass("hidden")
      $(".changeSky").removeClass("shown")
    }
    else {
      console.log("not enough karma")
    }
  });
}

function changeGrass() {
  $(`#changeGrass`).on("click", function (event) {
    let colorPicker = document.createElement("input");
    $(colorPicker).attr({
      type: "color",
      id: "colorPicker",
      name: "favcolor",
      value: "#ff0000",
    });
    $(`.buttons`).append(colorPicker);
    garden.tintGrass = true;
    $(`#changeGrass`).off();
  });
}

function karmaCounter() {
  $(`#karma`).text(`You have ${karma} karma `);
}

function options(){
  if ($(".manifestFlower").hasClass("shown")) {
    $(`#addFlower`).on("click", function (event) {
      $(".manifestFlower").addClass("hidden")
      $(".manifestFlower").removeClass("shown")
    });
  }
  else {
    $(`#addFlower`).on("click", function (event) {
      $(".manifestFlower").removeClass("hidden")
      $(".manifestFlower").addClass("shown")
    });
  }

  if ($(".changeSky").hasClass("shown")) {
    $(`#changeSky`).on("click", function (event) {
      $(".changeSky").addClass("hidden")
      $(".changeSky").removeClass("shown")
    });
  }
  else {
    $(`#changeSky`).on("click", function (event) {
      $(".changeSky").removeClass("hidden")
      $(".changeSky").addClass("shown")
    });
  }
}
