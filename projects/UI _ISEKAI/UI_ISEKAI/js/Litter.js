// An object for the randomly occuring event where piece of litter will fall from the sky onto the garden. Each pieice of litter will then need to be clicked for it to be removed

let litter; // Object variable

class Litter {
  constructor(x, y, y2, img, garden) {
    this.x = x; // Starting x pos
    this.y = y; // Starting y pos
    this.y2 = y2; // Landing y pos
    this.litter = img; // Holds the image variable
    this.fallSpeed = 4; // Controls the speed at which the litter falls
  }
  // Displays the litter and moves it from the sky to its landing position
  fallingLitter() {
    image(this.litter, this.x, this.y);
    if (this.y < this.y2) {
      // If litter has not reached its landing position...
      this.y += this.fallSpeed; // Litter is moved downwards
    }
  }
  // Checks if the mouse is close enough to the litter upon each click. If it is, the litter is removed
  cleanUp() {
    for (let i = 0; i < garden.litter.length; i++) {
      let d = dist(mouseX, mouseY, garden.litter[i].x, garden.litter[i].y); // Stores distance between mouse and litter
      if (d < 60) {
        garden.litter.splice(i, 1); // Removes the litter from the array
      }
    }
  }
}
