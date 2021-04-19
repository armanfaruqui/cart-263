let litter // Object variable

class Litter {
  constructor(garden, garbage){
    this.x = undefined;
    this.y = undefined;
    this.y2 = undefined;
    this.litter = undefined;
    this.state = "setup"
  }

  checkForLitter(){
    let chance = random();
    if (chance > 0.99){
      this.fallingLitter();
    }
  }

  fallingLitter(){
    if (this.state === "setup"){
      this.litter = random(garbage)
      this.x = random(0, width)
      this.y = random(-500, -350)
      this.state = "draw"
    }
    if (this.state === "draw"){
      image(this.litter, this.x, this.y)
      this.landingY = random(150, height)
      if (this.y < this.landingY){
        this.y += 2
      }
    }
  }
}
