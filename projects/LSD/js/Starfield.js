// This object was made with the help of Dan Shiffman's starfield coding challenge* It displays a starfield. The speed at which the stars move depends on the x coordinate of the mouse

let starfield // Object variable
let stars = [] // Array which holds the various star objects
let starSpeed // Variable which influences the z value of stars which in turns effects the star's movements speed
const noOfStars = 600 // Number of star objects to be stored in the array
let outro = false // Boolean which checks if the outro should be displayed. Outro is displayed the second time the scene is shown
let manOnCouch;
let showMan = false // Boolean which checks if the man should be displayed
let showCredits = false // Boolean which checks if the credits should be displayed

class Starfield {
  constructor(manOnCouch){}
  // Mock setup function which calls the createStar() function and stores it in the indexes of the stars array
  setup(){
    if (scene === "starfieldSetup"){
      for (var i = 0; i < noOfStars; i++) {
        stars[i] = this.createStar(random(-width,width), random(-height, height), random(width))
      }
      scene = "starfield"
  }
}
  // Function which is called to create a star and assign its properties
  createStar(x, y, z) {
    let star = {
      x: x,
      y: y,
      z: z, // Value stored to create accelaration
      pz: z // Variable which refers to the previous z value
    }
    return star
  }
  // Controls the movement of the stars on the screen
  updateStar(star){
    star.z = star.z - starSpeed // Reducing the value stored in z increases the movement speed of the star
    if (star.z < 1){
      star.z = width; // Resets the accelaration once the star has moved off the canvas
      star.y = random(-height, height); // Repositions the star once has moved off the canvas
      star.pz = star.z;
    }
  }
  // Draws the stars on the screen
  displayStar(star){
    fill(255);
    noStroke();

    let sx = map(star.x / star.z, 0, 1, 0, width); // Divides the x position by z and creates a ratio between 0 and 1
    let sy = map(star.y / star.z, 0, 1, 0, height); // Divides the y position by z and creates a ratio between 0 and 1

    let r = map(star.z, 0, width, 16, 0); // Creates a variable which stores the radius of the circle and maps it to the distance from their origin
    ellipse(sx, sy, r, r); // Draws the ellipse

    let px = map(star.x / star.pz, 0, 1, 0, width); // A vairable that refers to a previous x position for each star
    let py = map(star.y / star.pz, 0, 1, 0, height); // A vairable that refers to a previous y position for each star

    star.pz = star.z;

    stroke(255);
    line(px, py, sx, sy); // Draws a line between the star and a specific previous position of it
  }
  // Calls all the functions necassary for each index of the stars array to display the functioning starfield
  displayStarfield(){
    if (scene === "starfield"){
      starSpeed = map(mouseX, 0, width, 0, 50); // Maps the x position of the mouse to the movement speed of the stars
      translate(width / 2, height / 2); // Stars fan out from center of canvas
      for (let i = 0; i < stars.length; i++) { // Calls the update and display function for each individual star
        this.updateStar(stars[i]);
        this.displayStar(stars[i]);
      }
    }
  }

  // Switches scene from starfield to falling if its the first time the starfield scene is being shown
  switchScene(){
    if (scene === "starfield" && outro === false){
      setTimeout(function(){scene = "falling"}, 4000)
    }
  }
  // Called to display the man and credits upon the second time which this scene is shown
  showManAndCredits(){
    if (scene === "starfield" && outro === true){
      push()
      textSize(42)
      textAlign(CENTER)
      setTimeout(function(){showMan = true}, 3000) // Man can be shown in 3 seconds
      if (showMan === true){
        animation(manOnCouch, 10, 160)
      }
      setTimeout(function(){showCredits = true}, 6000) // Text can be shown in 6 seconds
      if (showCredits === true){
        fill(234, 79, 214)
        text("Song: 'L$D' by A$AP Rocky", 10, -180)
        fill(67, 35, 228)
        text("Art by Arman", 10, -130)
      }
      pop()
    }
  }
}
