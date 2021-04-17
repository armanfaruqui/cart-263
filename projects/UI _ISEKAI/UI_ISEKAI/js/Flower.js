class Flower {
  constructor(x, y, size, stemLength, petalColor, blossom) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.maxSize = size;
    this.stemLength = stemLength;
    this.stemThickness = 10;
    this.petalThickness = 10;
    this.maxPetalThickness = 10;
    this.petalColor = petalColor;
    this.centerColor = {
      r: 50,
      g: 0,
      b: 0,
    };
    this.alive = true;
  }

  shrink() {
    let shrinkage = random(0, 0.02);
    this.size = this.size - shrinkage;
    this.petalThickness = this.petalThickness - shrinkage / 10;
    if (this.size <= 0 || this.petalThickness <= 0) {
      this.alive = false;
    }
  }

  display() {
    push();
    strokeWeight(this.stemThickness);
    stroke(54, 120, 41);
    line(this.x, this.y, this.x, this.y + this.stemLength);
    strokeWeight(this.petalThickness);
    fill(this.centerColor.r, this.centerColor.g, this.centerColor.b);
    stroke(this.petalColor.r, this.petalColor.g, this.petalColor.b);
    ellipse(this.x, this.y, this.size);
    pop();
  }

  pollinate() {
    let growth = random(0, 0.2);
    this.size = this.size + growth;
    this.petalThickness = this.petalThickness + growth / 10;

    this.size = constrain(this.size, 0, this.maxSize);
    this.petalThickness = constrain(
      this.petalThickness,
      0,
      this.maxPetalThickness
    );
  }

  blossomFlower() {
    push();
    pop();
  }
}
