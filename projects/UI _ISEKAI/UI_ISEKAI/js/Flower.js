// This object carries the code for the functioning of the 3 types of flowers available in the garden simulator

class Flower {
  constructor(x, y, size, stemLength, petalColor, blossom) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.maxSize = size;
    this.stemLength = stemLength;
    this.stemThickness = 7;
    this.petalThickness = 10;
    this.maxPetalThickness = 10;
    this.petalColor = petalColor;
    this.alive = true; // Checks if flower is 'alive' (Its not when its size shrinks to 0)
  }
  // Reduces the size of the flower over time. Flower is no longer alive once their size reaches 0
  shrink() {
    let shrinkage = random(0, 0.01); // Small shrinkage amount so the flowers don't die in seconds
    this.size = this.size - shrinkage; // Reduces size of flower
    this.petalThickness = this.petalThickness - shrinkage / 10;
    if (this.size <= 0 || this.petalThickness <= 0) {
      this.alive = false;
    }
  }
  // Displays the orchid flower
  displayOrchid() {
    push();
    // Stem
    strokeWeight(this.stemThickness);
    stroke(54, 120, 41);
    line(this.x, this.y, this.x, this.y + this.stemLength);
    // Petals
    strokeWeight(this.petalThickness);
    fill(50, 0, 0);
    // Center
    stroke(this.petalColor.r, this.petalColor.g, this.petalColor.b);
    ellipse(this.x, this.y, this.size);
    pop();
  }
  // Displays the daisy flower
  displayDaisy() {
    push();
    // Stem
    strokeWeight(this.stemThickness);
    stroke(54, 120, 41);
    line(this.x, this.y, this.x, this.y + this.stemLength);
    // Petals
    noStroke();
    fill(230);
    rectMode(CENTER);
    rect(this.x, this.y, this.size * 1.7, this.size * 1.7);
    fill(255);
    for (let theta = 0; theta < TWO_PI; theta += PI / 3) {
      // Draws a ring of ellipses
      let petalX = this.size * cos(theta) + this.x;
      let petalY = this.size * sin(theta) + this.y;
      ellipse(petalX, petalY, this.size);
    }
    // Center
    fill(232, 193, 63);
    ellipse(this.x, this.y, this.size);
    pop();
  }
  // Displays the hibiscus flower
  displayHibiscus() {
    push();
    // Stem
    strokeWeight(this.stemThickness);
    stroke(54, 120, 41);
    line(this.x, this.y, this.x, this.y + this.stemLength);
    // Petals
    stroke(100);
    strokeWeight(0.5);
    fill(this.petalColor.r, this.petalColor.g, this.petalColor.b);
    ellipse(this.x, this.y + this.size / 2, this.size);
    ellipse(this.x, this.y - this.size / 2, this.size);
    ellipse(this.x + this.size / 2, this.y, this.size);
    ellipse(this.x - this.size / 2, this.y, this.size);
    ellipse(this.x, this.y, this.size);
    // Stigma
    rectMode(CENTER);
    rect(this.x, this.y - this.size / 10, this.size / 12, this.size / 2);
    fill(232, 193, 63);
    ellipse(this.x + this.size / 8, this.y - this.size / 3, this.size / 9);
    ellipse(this.x + this.size / 8, this.y - this.size / 6, this.size / 9);
    ellipse(this.x - this.size / 8, this.y - this.size / 3, this.size / 9);
    ellipse(this.x - this.size / 8, this.y - this.size / 6, this.size / 9);
    pop();
  }
  // Increases the size of the flower. Called with the bees since the growth comes from them overlapping the flowers
  pollinate() {
    let growth = random(0, 0.35);
    this.size = this.size + growth;
    this.petalThickness = this.petalThickness + growth / 10;

    this.size = constrain(this.size, 0, this.maxSize); // Ensures flowers don't grow past max size
    this.petalThickness = constrain(
      this.petalThickness,
      0,
      this.maxPetalThickness
    );
  }
}
