let flowerScene; // object variable
let flower = { // Holds all the asset variables related to the flower
  petal0: undefined,
  petal1: undefined,
  petal2: undefined,
  petal3: undefined,
  petal4: undefined,
  petal5: undefined,
  petal6: undefined,
  petal7: undefined,
  pistil: undefined,
  pistilSad: undefined,
  stem: undefined,
};

let petals = []; // Array used to store the various petal's properties
const petalDist = 45; // Distance between mouse and petal for the interaction to take place
let petalCounter = 0 // Keeps count of the number of petals picked

let flowerState =  "null" // State variale which decides how the scene should be decorated in sceneDecoration()
let sadPistil = false // Boolean used to decide which image of the pistil should be displayed

const heart = [];
let a = 0; // Angle which deicdes what percent of the heart should be renderred
let loveAsset = { // Holds all the asset variables used to decorate the scene
  rose: undefined,
  packet: undefined,
  teddy: undefined,
  tissue: undefined,
  bottle: undefined,
  knife: undefined,
  brokenHeart: undefined
}
let position = { // Holds position variables which are called in sceneDecoration()
  x1: 1239,
  y1: 600,
  x2: 100,
  y2: 150,
  x3: 100,
  y3: 400,
  x4: 1250,
  y4: 400,
  speed: 13, // For the moving elements in sceneDecoration()
  deg: 12 // For the spinning elements in sceneDecoration()
};

let startZoom = false; // Boolean which is switched to true when the camera needs to start zooming in switchScene()

class Flower {
  constructor(flower, loveAsset) {}

  // Creates an object for each petal when called
  initializePetal(x, y) {
    let petal = {
      x: x, // x positiom
      y: y, // y position
      dist: undefined, // Distance between mouse and petal
      falling: false, // Checks whether the petal should be falling or not
    };
    return petal;
  }
  // Mock setup function which initilaizes all the petal's properties and assigns their position
  setupPetals() {
    if (scene === "flowerSetup") {
      petals[0] = this.initializePetal(685, 305);
      petals[1] = this.initializePetal(755, 335);
      petals[2] = this.initializePetal(785, 400);
      petals[3] = this.initializePetal(750, 470);
      petals[4] = this.initializePetal(680, 505);
      petals[5] = this.initializePetal(610, 465);
      petals[6] = this.initializePetal(587, 400);
      petals[7] = this.initializePetal(620, 335);
      scene = "flower";
    }
  }
  // Displays the flower's assets
  displayFlower() {
    if (scene === "flower") {
      push();
      imageMode(CENTER);
      image(flower.stem, width / 2, 550); // The stem
      image(flower.petal0, petals[0].x, petals[0].y);
      image(flower.petal1, petals[1].x, petals[1].y);
      image(flower.petal2, petals[2].x, petals[2].y);
      image(flower.petal3, petals[3].x, petals[3].y);
      image(flower.petal4, petals[4].x, petals[4].y);
      image(flower.petal5, petals[5].x, petals[5].y);
      image(flower.petal6, petals[6].x, petals[6].y);
      image(flower.petal7, petals[7].x, petals[7].y);
      if (sadPistil === false){
        image(flower.pistil, width / 2, height / 2); // The pistil/center of flower
      }
      else if (sadPistil === true) {
        image(flower.pistilSad, width / 2, height / 2); // The pistil/center of flower
      }
      pop();
    }
  }
  // For loop to check the distance between the mouse and each petal
  checkDistanceFromPetal() {
    if (scene === "flower") {
      for (let i = 0; i < petals.length; i++) {
        petals[i].dist = dist(petals[i].x, petals[i].y, mouseX, mouseY); // Checks the distance for each petal every frame
      }
    }
  }
  // Changes the cursor if the mouse is hovering the petal to make the user more inclined to interact with it
  changeCursor() {
    if (scene === "flower") { // Using a for loop instead would only apply this function on the last petal
      if (
        petals[0].dist < petalDist ||
        petals[1].dist < petalDist ||
        petals[2].dist < petalDist ||
        petals[3].dist < petalDist ||
        petals[4].dist < petalDist ||
        petals[5].dist < petalDist ||
        petals[6].dist < petalDist ||
        petals[7].dist < petalDist
      ) {
        cursor("grab"); // Replaces mouse with a hand icon
      } else {
        cursor(ARROW); // Reverts back to a regular mouse when mouse is not hovering it
      }
    }
  }
  // Called in mousePressed() Switches the .falling boolean to allow the flowers to fall in descendingPetals()
  pickPetals() {
    if (scene === "flower") {
      for (let i = 0; i < petals.length; i++) {
        if (petals[i].dist < petalDist) {
          petals[i].falling = true;
          petalCounter++ // increment petal picked counter
          position.x1 = 1239,
          position.y1 = 600,
          position.x2 = 200,
          position.y2 = 150 // Reset decoration position
        }
      }
    }
  }
// Changes the y position of the petals to simulate them falling.
  descendingPetals() {
    if (scene === "flower") {
      for (let i = 0; i < petals.length; i++) {
        if (petals[i].falling === true && petals[i].y < height + 100) { // Petals stop falling just outside canvas to ease the processors work load
          petals[i].y += 3; // Makes the petals fall
        }
      }
    }
  }
  // Function which decides the state of this object.
  flowerState(){
    if (scene === "flower"){
      if (petalCounter === 1 || petalCounter === 3 || petalCounter === 5 || petalCounter === 7){ // Every odd petal picked assigns a loveMe state
        flowerState = "loveMe"
      }
      else if (petalCounter === 2 || petalCounter === 4 || petalCounter === 6 || petalCounter === 8){ // Every even petal picked assigns a loveMeNot state
        flowerState = "loveMeNot"
      }
    }
  }

  sceneDecoration(){
    if (scene === "flower"){
      if (flowerState === "loveMe"){
        push()
        imageMode(CENTER)
        // Hearts
        this.displayHeart(180, 140);
        this.displayHeart(1200, 140);
        // Teddys and roses
        image(loveAsset.teddy, 200, 700)
        image(loveAsset.rose, position.x1, position.y1)
        scale(-1, 1);
        image(loveAsset.rose, position.x2, position.y2)
        image(loveAsset.teddy, -1150, 700)
        position.x1 -= position.speed
        position.x2 -= position.speed // Moves the roses
        pop()
        // Packets
        push()
        translate(position.x3, position.y3)
        rotate (radians (position.deg));
        imageMode(CENTER)
        image(loveAsset.packet, 0, 0)
        pop()
        push()
        translate(position.x4, position.y4)
        rotate (radians (position.deg));
        imageMode(CENTER)
        image(loveAsset.packet, 0, 0)
        position.deg += 3 // Spins the packets
        pop()
      }
      else if (flowerState === "loveMeNot"){
        push()
        imageMode(CENTER)
        // Hearts
        image(loveAsset.brokenHeart, 180, 140)
        image(loveAsset.brokenHeart, 1200, 140)
        // Bottles
        image(loveAsset.bottle, 200, 640)
        image(loveAsset.bottle, 1150, 640)
        // Tissues
        image(loveAsset.tissue, position.x1, position.y1)
        scale(-1, 1);
        image(loveAsset.tissue, position.x2, position.y2)
        position.x1 -= position.speed
        position.x2 -= position.speed // Moves the tissues
        pop()
        // Knives
        push()
        translate(position.x3, position.y3)
        rotate (radians (position.deg));
        imageMode(CENTER)
        image(loveAsset.knife, 0, 0)
        pop()
        push()
        translate(position.x4, position.y4)
        rotate (radians (position.deg));
        imageMode(CENTER)
        image(loveAsset.knife, 0, 0)
        position.deg += 3 // Spins the knives
        pop()
      }
    }
  }

  // Displays an animated heart creating itself when called. Made with the help of Dan Shiffman's heart curve coding challenge
  displayHeart(xPos, yPos){
    push()
    translate(xPos, yPos); // position specified when called
    stroke(255);
    strokeWeight(2);
    fill(150, 0, 100);
    beginShape();
    for (let v of heart) { // Assigns the the 3 vertexes which create the 'V' of the heart
      vertex(v.x, v.y);
    }
    endShape();

    const r = height/100; // Decides the size/radius of the heart
    const x = r * 16 * pow(sin(a), 3);
    const y = -r*(13 * cos(a) - 5*cos(2*a) - 2*cos(3*a)- cos(4*a)); // Forumla for drawing the curves of the heart's shape
    heart.push(createVector(x, y));

    a += 0.1; // Increments percentage of the heart to be displayed when first called
    pop()
  }

  switchScene(){
    if (scene === "flower" && petalCounter > 7){
      sadPistil = true;
      console.log(camera.zoom)
      setTimeout(function(){startZoom = true}, 2000)
      if (startZoom === true){
        camera.zoom += 0.3
      }
      if (camera.zoom > 40){
        camera.zoom = 1
        scene = "matrixSetup"
      }
    }
  }

}
