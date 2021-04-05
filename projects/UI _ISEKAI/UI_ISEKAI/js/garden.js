"use-strict"

let garden = {
  flowers: [],
  bees: [],
  numFlowers: 30,
  numBees: 7,
  grassColor: {
    r: 120,
    g: 180,
    b: 120
  },
  grass: undefined,
  tintGrass: false
}

let shells = 100 // Form of currency

function preload(){
  garden.grass = loadImage(`assets/images/garden/grass.png`)
}

changeGrass();

function setup(){
  createCanvas(800, 600);

  ui = new UserInterface();

  for (let i = 0; i < garden.numFlowers; i++){
    createFlower()
  }

  for (let i = 0; i < garden.numBees; i++){
    createBee()
  }

  addMoreElements();
}

function draw(){
  background(garden.grassColor.r, garden.grassColor.g, garden.grassColor.b);

  displayGrass();

  ui.focused()
  shellCounter();

  for (let i = 0; i < garden.flowers.length; i++){
    let flower = garden.flowers[i]
    if (flower.alive) {
    flower.shrink()
    flower.display()
    }
  }

  for (let i = 0; i < garden.bees.length; i++){
    let bee = garden.bees[i]
    if (bee.alive) {
    bee.shrink()
    bee.move()
    bee.display()

    for (let j = 0; j < garden.flowers.length; j++){
      let flower = garden.flowers[j]
      if (flower.alive){
        bee.tryToPollinate(flower)
      }
    }
    }
  }
}

function createFlower(){
  let x = random(0, width)
  let y = random(150 , height)
  let size = random(50, 80)
  let stemLength = random(50, 100)
  let petalColor = {
    r: random(100, 255),
    g: random(100, 255),
    b: random(100, 255)
  }
  let flower = new Flower(x, y, size, stemLength, petalColor)
  garden.flowers.push(flower)
}

function createBee(){
  let bee = new Bee(random(0, width), random(150, height))
  garden.bees.push(bee)
}

function addMoreElements(){
  $(`#addFlower`).on("click", function(event){
    if (shells > 20){
      createFlower();
      shells -= 20
    }
  })

  $(`#addBee`).on("click", function(event){
    if (shells > 15){
      createBee();
      shells -= 15
    }
  });
}
function displayGrass(){
  push()
  if (garden.tintGrass === true){
    tint(colorPicker.value)
  }
  image(garden.grass, 0, -100)
  pop()
}
function changeGrass(){
  $(`#changeGrass`).on("click", function(event){
    let colorPicker = document.createElement("input")
    $(colorPicker).attr({
      type: "color",
      id: "colorPicker",
      name:"favcolor",
      value:"#ff0000"
    })
    $(`.buttons`).append(colorPicker)
    garden.tintGrass = true
    $(`#changeGrass`).off();
  })
}

function shellCounter(){
  $(`#shells`).text(`You have ${shells} shells remaining`)
}
