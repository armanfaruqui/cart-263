"use-strict";
let petals = []; //array function that holds cherry blossom petals
// Backgroud asset variables
let dragon;
let cherryblossom1;
let cherryblossom2;

let song; // Variable for the playable song

function preload() {
  song = loadSound(`assets/sounds/song.mp3`);
  dragon = loadImage(`assets/images/Li/inkart1.png`);
  cherryblossom1 = loadImage(`assets/images/Li/inkart2.png`);
  cherryblossom2 = loadImage(`assets/images/Li/inkart3.png`);
}

function setup() {
  canvas = createCanvas(1368, 768);
  canvas.position(0, 0);
  canvas.style(`z-index`, `-1`); // P5 canvas used as the background
  canvas.parent("#canvas"); // Assigns the canvas to the div #canvas

  ui = new UserInterface(song);
  ui.initialize();

  fill(255, 220, 223);
  noStroke();

  initializeLi();
  selectHome();
  cycleEmails();
  reminder();
  viewPoll();
  selectSchedule();
  selectPeople();
  selectFiles();
  selectSearch();
}

function draw() {
  background(245, 244, 237);
  ui.focused();
  ui.music();

  backgroundImages();
  displayPetals();
}

// Adds the relevant classes to the various images. Called in setup
function initializeLi() {
  $("#canyon").addClass("shown");
  $("#hospital").addClass("hidden");
  $("#tax").addClass("hidden");
  $("#ipcc").addClass("hidden");
  $("#planeTicket").addClass("hidden");
  $("#complete").addClass("hidden");
  $("#scheduleImg").addClass("hidden");
  $(".contacts").addClass("hidden");
  $("#poll").addClass("hidden");
  $(".files").addClass("hidden");
  $("#search").addClass("hidden");
  $(".reminder").addClass("hidden");
}
// Hides and reveals the relevant elements when the home button is clicked
function selectHome() {
  $("#home").on("click", function () {
    $("#scheduleImg").addClass("hidden");
    $(".contacts").addClass("hidden");
    $(".emails").removeClass("hidden");
    $(".nav").removeClass("hidden");
    $(".files").addClass("hidden");
    $("#search").addClass("hidden");
  });
}
// Cycles through the images of emails by revealing and hiding the relevant ones upon clicking the next button
function cycleEmails() {
  $("#next").on("click", function () {
    $(".reminder").addClass("hidden");
    if ($("#canyon").hasClass("shown")) {
      $("#canyon").addClass("hidden");
      $("#canyon").removeClass("shown");
      $("#planeTicket").addClass("shown");
      $("#planeTicket").removeClass("hidden");
    } else if ($("#planeTicket").hasClass("shown")) {
      $("#planeTicket").addClass("hidden");
      $("#planeTicket").removeClass("shown");
      $("#ipcc").addClass("shown");
      $("#ipcc").removeClass("hidden");
    } else if ($("#ipcc").hasClass("shown")) {
      $("#ipcc").addClass("hidden");
      $("#ipcc").removeClass("shown");
      $("#tax").addClass("shown");
      $("#tax").removeClass("hidden");
    } else if ($("#tax").hasClass("shown")) {
      $("#tax").addClass("hidden");
      $("#tax").removeClass("shown");
      $("#hospital").addClass("shown");
      $("#hospital").removeClass("hidden");
      $("#poll").removeClass("hidden"); // Reveals the poll
    } else if ($("#hospital").hasClass("shown")) {
      $("#hospital").addClass("hidden");
      $("#hospital").removeClass("shown");
      $("#poll").addClass("hidden"); // Hides the poll
      $("#complete").addClass("shown");
      $("#complete").removeClass("hidden");
    }
  });
}
// Displays the time selector when the 'add remidner' button is clicked
function reminder() {
  $("#reminder").on("click", function () {
    $(".reminder").removeClass("hidden");
  });
}
// Open a new tab with the strawpoll voting link
function viewPoll() {
  $("#poll").on("click", function () {
    window.open("https://www.strawpoll.me/44308387");
  });
}
// Hides and reveals the relevant elements when the people button is clicked
function selectPeople() {
  $("#people").on("click", function () {
    $(".contacts").removeClass("hidden");
    $(".emails").addClass("hidden");
    $(".nav").addClass("hidden");
    $("#scheduleImg").addClass("hidden");
    $("#canyon").addClass("shown"); // Allows you to cycle through the emails after switching to a different tab
    $(".files").addClass("hidden");
    $("#search").addClass("hidden");
    $(".reminder").addClass("hidden");
  });
}
// Hides and reveals the relevant elements when the home button is clicked
function selectSchedule() {
  $("#schedule").on("click", function () {
    $("#scheduleImg").removeClass("hidden");
    $(".emails").addClass("hidden");
    $(".nav").addClass("hidden");
    $(".contacts").addClass("hidden");
    $(".files").addClass("hidden");
    $("#search").addClass("hidden");
    $(".reminder").addClass("hidden");
  });
}
// Hides and reveals the relevant elements when the files button is clicked
function selectFiles() {
  $("#files").on("click", function () {
    $(".files").removeClass("hidden");
    $("#scheduleImg").addClass("hidden");
    $(".emails").addClass("hidden");
    $(".nav").addClass("hidden");
    $(".contacts").addClass("hidden");
    $("#search").addClass("hidden");
    $(".reminder").addClass("hidden");
  });
}
// Hides and reveals the relevant elements when the search button is clicked
function selectSearch() {
  $("#searchButton").on("click", function () {
    $("#search").removeClass("hidden");
    $(".files").addClass("hidden");
    $("#scheduleImg").addClass("hidden");
    $(".emails").addClass("hidden");
    $(".nav").addClass("hidden");
    $(".contacts").addClass("hidden");
    $(".reminder").addClass("hidden");
  });
}
// Displays the background images
function backgroundImages() {
  tint(255, 140); // Reduces the image's opacity
  image(cherryblossom1, 990, 110);
  image(cherryblossom2, -20, 20);
  image(dragon, -50, 340);
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
  this.update = function (time) {
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
  this.display = function () {
    ellipse(this.posX, this.posY, this.size);
  };
}

function displayPetals() {
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
