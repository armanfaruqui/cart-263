let matrix; // Object name
let matrixData; // JSON File

let escapingWords = []; // Array with words with autmoated movement away from the mouse
let followingWords = []; // Array with words with autmoated movement towards the mouse
let noOfWords = 3; // Variable representing how many indexes I want in each array

let buildings; // asset variable
let showBuildings = false // Boolean which is assigned true when the buildings should be displayed

class Matrix {
  constructor(matrixData, buildings) {}

  setup() {
    // Mocked setup function. Runs loop then switches scene to prevent it from running again
    if (scene === "matrixSetup") {
      for (let i = 0; i < noOfWords; i++) {
        // Initializes array with the word objects
        escapingWords[i] = this.initializeWords(
          random(0, width ),
          random(0, height)
        ); // Random x and y value provided to each index
        followingWords[i] = this.initializeWords(
          random(0, width),
          random(0, height)
        );
      }
      scene = "matrix";
    }
  }

  // Function which is called to create multiple word objects
  initializeWords(x, y) {
    let word = {
      x: x,
      y: y,
      vx: 0,
      vy: 0,
      speed: 2,
      string: "",
    };
    return word;
  }

  // Called in draw so that at random intervals, a different string from the matrix json file is assigned
  assignWords(word, data) {
    this.switchInterval = random();
    if (this.switchInterval > 0.99) {
      word.string = random(data); // Parameter used here so that the 2 different arrays can later receive strings from the 2 different data sets
    }
  }
  // Moves the words
  moveWords(word, multiplier1, multiplier2) {
    word.vx = word.x - mouseX;
    word.vy = word.y - mouseY;

    if (word.vx < 0) {
      word.vx = word.speed * multiplier1; // A multiplier parameter is added to decide whether the word moves towards of away from the mouse
    } // moveWords(word, -1, 1) is called, the words will move away from the mouse. Vice versa if position of the 2 numbers are swapped.
    else if (word.vx > 0) {
      word.vx = word.speed * multiplier2;
    }
    if (word.vy < 0) {
      word.vy = word.speed * multiplier1;
    } else if (word.vy > 0) {
      word.vy = word.speed * multiplier2;
    }
    word.x = word.x + word.vx;
    word.y = word.y + word.vy; // Moves the words

    // These 4 if statements reset the word's position if they move off the screen
    if (word.y > height - 10) {
      word.y = random(0, height);
    }
    if (word.x > width - 10) {
      word.x = random(0, width);
    }
    if (word.x < 10) {
      word.x = random(0, width);
    }
    if (word.y < 10) {
      word.y = random(0, height);
    }
  }
  // Resets the word's position if they get too close to the mouse. The 'following' words clumpp without this
  preventWordClumping(word) {
    let d = dist(word.x, word.y, mouseX, mouseY);
    if (d < 5) {
      word.x = random(0, width);
      word.y = random(0, height);
    }
  }

  // Displays the words and assigns their visual properties
  displayWords(word) {
    push();
    fill(0, 255, 90);
    textSize(32);
    text(word.string, word.x, word.y);
    pop();
  }

  displayBuildings(){
    if (scene === "matrix"){
      setTimeout(function(){showBuildings = true}, 5000)
      if (showBuildings === true){
        push()
        imageMode(CENTER)
        image(buildings, width/2, height/2)
        pop()
      }
    }
  }

  // Calls all the methods necassary to initialize, display, and move all the words
  movingWords() {
    if (scene === "matrix"){
      for (let i = 0; i < noOfWords; i++) {
        this.assignWords(escapingWords[i], matrixData.escaping);
        this.assignWords(followingWords[i], matrixData.following);
        this.moveWords(escapingWords[i], -1, 1);
        this.moveWords(followingWords[i], 1, -1);
        this.displayWords(escapingWords[i]);
        this.displayWords(followingWords[i]);
        this.preventWordClumping(followingWords[i]);
      }
    }
  }
}
