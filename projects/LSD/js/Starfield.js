let starfield
let stars = []
let starSpeed

class Starfield {
  constructor(){}

  setup(){
    if (scene === "starfieldSetup"){
      for (var i = 0; i < 600; i++) {
        stars[i] = this.createStar(random(-width,width), random(-height, height), random(width))
      }
      scene = "starfield"
  }
}

  createStar(x, y, z) {
    let star = {
      x: x,
      y: y,
      z: z,
      pz: z
    }
    return star
  }

  updateStar(star){
    star.z = star.z - starSpeed
    if (star.z < 1){
      star.z = width;
      star.y = random(-height, height);
      star.pz = star.z;
    }
  }

  displayStar(star){
    fill(255);
    noStroke();

    let sx = map(star.x / star.z, 0, 1, 0, width);
    let sy = map(star.y / star.z, 0, 1, 0, height);

    let r = map(star.z, 0, width, 16, 0);
    ellipse(sx, sy, r, r);

    let px = map(star.x / star.pz, 0, 1, 0, width);
    let py = map(star.y / star.pz, 0, 1, 0, height);

    star.pz = star.z;

    stroke(255);
    line(px, py, sx, sy);
  }

  displayStarfield(){
    if (scene === "starfield"){
      starSpeed = map(mouseX, 0, width, 0, 50);
      translate(width / 2, height / 2);
      for (let i = 0; i < stars.length; i++) {
        this.updateStar(stars[i]);
        this.displayStar(stars[i]);
      }
    }
  }
}
