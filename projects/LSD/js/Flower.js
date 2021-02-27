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
  stem: undefined,
};

let petals = []; // Array used to store the various petal's properties
let petalDist = 50; // Distance between mouse and petal for the interaction to take place

class Flower {
  constructor(flower) {}
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

  displayFlower() {
    if (scene === "flower") {
      push();
      imageMode(CENTER);
      image(flower.stem, width / 2, 550);
      image(flower.petal0, petals[0].x, petals[0].y);
      image(flower.petal1, petals[1].x, petals[1].y);
      image(flower.petal2, petals[2].x, petals[2].y);
      image(flower.petal3, petals[3].x, petals[3].y);
      image(flower.petal4, petals[4].x, petals[4].y);
      image(flower.petal5, petals[5].x, petals[5].y);
      image(flower.petal6, petals[6].x, petals[6].y);
      image(flower.petal7, petals[7].x, petals[7].y);
      image(flower.pistil, width / 2, height / 2);
      pop();
    }
  }

  checkDistanceFromPetal() {
    if (scene === "flower") {
      for (let i = 0; i < petals.length; i++) {
        petals[i].dist = dist(petals[i].x, petals[i].y, mouseX, mouseY);
      }
      console.log(petals[1].dist);
    }
  }

  changeCursor() {
    if (scene === "flower") {
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
        cursor("grab");
      } else {
        cursor(ARROW);
      }
    }
  }

  pickPetals() {
    if (scene === "flower") {
      for (let i = 0; i < petals.length; i++) {
        if (petals[i].dist < 50) {
          petals[i].falling = true;
        }
      }
    }
  }

  descendingPetals() {
    if (scene === "flower") {
      for (let i = 0; i < petals.length; i++) {
        if (petals[i].falling === true && petals[i].y < height + 100) {
          petals[i].y += 3;
        }
      }
    }
  }
}
