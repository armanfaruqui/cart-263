"use-strict"
let petals = []; //array function that holds cherry blossom petals
let inkArt1;
let inkArt2;

function preload(){
  inkArt1 = loadImage(`assets/images/Li/inkart1.png`)
  inkArt2 = loadImage(`assets/images/Li/inkart2.png`)
}

function setup(){
  canvas = createCanvas(1368, 768);
  canvas.position(0, 0);
  canvas.style(`z-index`, `-1`); // P5 canvas used as the background
  canvas.parent("#canvas"); // Assigns the canvas to the div #canvas

  ui = new UserInterface();
  initializeLi();
  fill(255, 230, 243);
  noStroke();
  home();
}

function draw(){
  background(245, 244, 237)
  ui.focused()
  ui.music()

  backgroundImages();
  displayPetals();
}
function mousePressed(){
  console.log($("#planeTicket").hasClass("shown"))
}

function initializeLi(){
  $("#canyon").addClass("shown")
  $("#hospital").addClass("hidden")
  $("#tax").addClass("hidden")
  $("#ipcc").addClass("hidden")
  $("#planeTicket").addClass("hidden")
}

function home(){
  $("#next").on("click", function(){
    if ($("#canyon").hasClass("shown")){
      $("#canyon").addClass("hidden")
      $("#planeTicket").addClass("shown")
      $("#planeTicket").removeClass("hidden")
    }
    else if ($("#planeTicket").hasClass("shown")){
      $("#planeTicket").addClass("hidden")
      $("#ipcc").addClass("shown")
      $("#ipcc").removeClass("hidden")
    }
    else if ($("#ipcc").hasClass("shown")){
      $("#ipcc").addClass("hidden")
      $("#tax").addClass("shown")
      $("#tax").removeClass("hidden")
    }
    else if ($("#tax").hasClass("shown")){
      $("#tax").addClass("hidden")
      $("#hospital").addClass("shown")
      $("#hospital").removeClass("hidden")
    }
  })
}

function backgroundImages(){
  tint(255, 140);
  image(inkArt2, 990, 110)
  image(inkArt1, -50, 350)
}
// Code which draws the falling petals in the background. Made with the help of https://editor.p5js.org/abrock/sketches/SyyaEusom
function petal() {
  // initialize coordinates
  this.posX = 0;
  this.posY = random(-50, 0);
  this.initialangle = random(10, 0 * PI);
  this.size = random(8, 14);
  //ellipse(10, 20, 20, 7);

  this.radius = sqrt(random(pow(width / 1, 2)));
  this.update = function(time) {
    // x position follows a circle
    let w = 0.1; // angular speed
    let angle = w * time + this.initialangle;
    this.posX = width / 1 + this.radius * tan(angle); //calculates tangent of the angle the petals fall
    this.posY += pow(this.size, 0.5);

    // delete petal if past end of screen
    if (this.posY > height) {
      let index = petals.indexOf(this);
      petals.splice(index, 1);
    }
  };
  this.display = function() {
    ellipse(this.posX, this.posY, this.size);
  };
}

function displayPetals(){
  let t = frameCount / 100; //updates time

  for (var i = 0; i < 10; i++) {
    petals.push(new petal()); //append petal object
  } //random number of petals each frame

  //loop through petals
  for (let blossom of petals) {
    blossom.update(t); //update petal position
    blossom.display(); //draw petal
  }
}
