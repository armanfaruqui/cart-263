// This simualation allows the user to customize and maintain their very own digital garden. Its appearance can be customizzed through changing the sky's image, grass' hue, and shelter in the background. The user can add specific flower's, or a singular bee, both which shrink in size unless they are overlapping which makes them grow. Adding these elements costs 'karma'. Sky's and shelters also require you to have a certain amount of karma for them to be accessible.

"use-strict";

// Object which carries general information about the simulation
let garden = {
  orchids: [],
  daisys: [],
  hibiscus: [],
  bees: [],
  numOrchids: 0,
  numDaisys: 0,
  numHibiscus: 0,
  numBees: 3,
  maxBees: 18,
  grassColor: {
    r: 120,
    g: 180,
    b: 120,
  },
  grass: undefined,
  sky: undefined,
  shelter: undefined,
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
  shelter.antartic = loadImage(`assets/images/garden/igloo.png`);
  shelter.foliage = loadImage(`assets/images/garden/grassHouse.png`);
  shelter.tupik = loadImage(`assets/images/garden/teepee.png`);
  shelter.namekian = loadImage(`assets/images/garden/namekHouse.png`);
  shelter.alkebulan = loadImage(`assets/images/garden/africanHut.png`);
}

function setup() {
  hideOptions();
  changeGrass();

  createCanvas(800, 600);
  garden.sky = sky.regular;
  ui = new UserInterface();

  for (let i = 0; i < garden.numFlowers; i++) {
    createOrchid();
  }

  for (let i = 0; i < garden.numFlowers; i++) {
    createDaisy();
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
  displayShelter();

  ui.focused();
  karmaCounter();
  options();

  for (let i = 0; i < garden.orchids.length; i++) {
    let flower = garden.orchids[i];
    if (flower.alive) {
      flower.shrink();
      flower.displayOrchid();
    }
  }

  for (let i = 0; i < garden.daisys.length; i++) {
    let flower = garden.daisys[i];
    if (flower.alive) {
      flower.shrink();
      flower.displayDaisy();
    }
  }

  for (let i = 0; i < garden.hibiscus.length; i++) {
    let flower = garden.hibiscus[i];
    if (flower.alive) {
      flower.shrink();
      flower.displayHibiscus();
    }
  }

  for (let i = 0; i < garden.bees.length; i++) {
    let bee = garden.bees[i];
    if (bee.alive) {
      bee.shrink();
      bee.move();
      bee.display();

      for (let j = 0; j < garden.orchids.length; j++) {
        let flower = garden.orchids[j];
        if (flower.alive) {
          bee.tryToPollinate(flower);
        }
      }
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
}

function mousePressed() {
  setTimeout(closeOptions, 500);
}

function displayGrass() {
  push();
  if (garden.tintGrass === true) {
    tint(colorPicker.value);
  }
  image(garden.grass, 0, -100);
  pop();
}

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

function createDaisy() {
  let x = random(0, width);
  let y = random(150, height);
  let size = random(15, 30);
  let stemLength = random(30, 80);
  let flower = new Flower(x, y, size, stemLength);
  garden.daisys.push(flower);
}

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

function createBee() {
  let bee = new Bee(random(0, width), random(150, height));
  garden.bees.push(bee);
}

function manifestFlower() {
  $("input[type=radio]").checkboxradio({
    disabled: false,
  });

  $(`#orchid`).on("click", function (event) {
    if (karma >= 20) {
      createOrchid();
      karma -= 20;
      garden.numOrchids += 1;
    }
  });

  $(`#daisy`).on("click", function (event) {
    if (karma >= 20) {
      createDaisy();
      karma -= 20;
      garden.numDaisys += 1;
    }
  });

  $(`#hibiscus`).on("click", function (event) {
    if (karma >= 20) {
      createHibiscus();
      karma -= 20;
      garden.numHibiscus += 1;
    }
  });
}

function callBee() {
  if (garden.numBees < garden.maxBees)
    $(`#addBee`).on("click", function (event) {
      if (karma >= 10) {
        createBee();
        karma -= 10;
        garden.numBees += 1;
      }
    });
}

function displaySky() {
  image(garden.sky, 0, 0);

  $(`#rose`).on("click", function (event) {
    if (karma >= 200) {
      garden.sky = sky.pink;
      $(".changeSky").addClass("hidden");
      $(".changeSky").removeClass("shown");
    } else {
      console.log("not enough karma");
    }
  });

  $(`#rose`).on("click", function (event) {
    if (karma >= 200) {
      garden.sky = sky.pink;
      $(".changeSky").addClass("hidden");
      $(".changeSky").removeClass("shown");
    } else {
      console.log("not enough karma");
    }
  });

  $(`#rose`).on("click", function (event) {
    if (karma >= 200) {
      garden.sky = sky.pink;
      $(".changeSky").addClass("hidden");
      $(".changeSky").removeClass("shown");
    } else {
      console.log("not enough karma");
    }
  });

  $(`#grape`).on("click", function (event) {
    if (karma >= 200) {
      garden.sky = sky.purple;
      $(".changeSky").addClass("hidden");
      $(".changeSky").removeClass("shown");
    } else {
      console.log("not enough karma");
    }
  });

  $(`#scarlet`).on("click", function (event) {
    if (karma >= 600) {
      garden.sky = sky.red;
      $(".changeSky").addClass("hidden");
      $(".changeSky").removeClass("shown");
    } else {
      console.log("not enough karma");
    }
  });

  $(`#salmon`).on("click", function (event) {
    if (karma >= 600) {
      garden.sky = sky.orange;
      $(".changeSky").addClass("hidden");
      $(".changeSky").removeClass("shown");
    } else {
      console.log("not enough karma");
    }
  });

  $(`#shine`).on("click", function (event) {
    if (karma >= 200) {
      garden.sky = sky.shine;
      $(".changeSky").addClass("hidden");
      $(".changeSky").removeClass("shown");
    } else {
      console.log("not enough karma");
    }
  });

  $(`#beyond`).on("click", function (event) {
    if (karma >= 1000) {
      garden.sky = sky.saturn;
      $(".changeSky").addClass("hidden");
      $(".changeSky").removeClass("shown");
    } else {
      console.log("not enough karma");
    }
  });

  $(`#mars`).on("click", function (event) {
    if (karma >= 1000) {
      garden.sky = sky.void;
      $(".changeSky").addClass("hidden");
      $(".changeSky").removeClass("shown");
    } else {
      console.log("not enough karma");
    }
  });
}

function displayShelter() {
  $(`#shack`).on("click", function (event) {
    if (karma >= 200) {
      garden.shelter = shelter.shack;
      $(".changeShelter").addClass("hidden");
      $(".changeShelter").removeClass("shown");
      garden.displayShelter = true;
    } else {
      console.log("not enough karma");
    }
  });
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

  if (garden.displayShelter === true) {
    push();
    imageMode(CENTER);
    image(garden.shelter, 600, 140);
    pop();
  }
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

function options() {
  if ($(".manifestFlower").hasClass("shown")) {
    $(`#addFlower`).on("click", function (event) {
      $(".manifestFlower").addClass("hidden");
      $(".manifestFlower").removeClass("shown");
    });
  } else {
    $(`#addFlower`).on("click", function (event) {
      $(".manifestFlower").removeClass("hidden");
      $(".manifestFlower").addClass("shown");
      $(".changeSky").addClass("hidden"); // Hides the sky options if they are open
      $(".changeSky").removeClass("shown");
      $(".changeShelter").addClass("hidden"); // Hides the shelter options if they are open
      $(".changeShelter").removeClass("shown");
    });
  }

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
    });
  }

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
    });
  }
}
// Called in setup so the options are not displayed until they are requested
function hideOptions() {
  $(".manifestFlower").addClass("hidden");
  $(".changeSky").addClass("hidden");
  $(".changeShelter").addClass("hidden");
}
