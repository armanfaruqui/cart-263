let litter // Object variable

class Litter {
  constructor(x, y, y2, img, garden){
    this.x = x;
    this.y = y;
    this.y2 = y2;
    this.litter = img;
    this.fallSpeed = 3;
  }

  fallingLitter(){
    image(this.litter, this.x, this.y)
    if (this.y < this.y2){
      this.y += this.fallSpeed;
    }
  }

  cleanUp(){
    for (let i = 0; i < garden.litter.length; i++){
      let d = dist(mouseX, mouseY, garden.litter[i].x, garden.litter[i].y)
      if (d < 60){
        garden.litter.splice(i, 1)
      }
    }
  }
}
