let falling; // Object Variable
let fallingMan = {
  ani: undefined,
  x: 684,
  y: 130,
  vx: 0,
  ax: 0,
  accelaration: 0.4,
  maxSpeed: 8
}

class Falling {
  constructor(fallingMan){

  }

  moveMan(){
    if (scene === "falling"){
      if (mouseX < fallingMan.x) {
        fallingMan.ax = -fallingMan.accelaration; // Negative horizontal accelaration value if fallingMan is right of mouse
      } else {
        fallingMan.ax = fallingMan.accelaration; // Positive horizontal accelaration value if fallingMan is left of mouse
      }
      // Accelaration properties of the fallingMan
      fallingMan.vx = fallingMan.vx + fallingMan.ax;
      fallingMan.vx = constrain(fallingMan.vx, -fallingMan.maxSpeed, fallingMan.maxSpeed); // Limits horizontal speed

      // Moves the fallingMan
      fallingMan.x = fallingMan.x + fallingMan.vx;
    }
  }

  displayMan(){
    if (scene === "falling")
      animation(fallingMan.ani, fallingMan.x, fallingMan.y)
  }

  background1(){
    let linedist = random(20, 40);
    for (let x = 0; x <= width; x = x + linedist) {
      push();
      strokeWeight(2);
      stroke(255, 33);
      line(x, 0, x, height);
      pop();
    }
  }

  displayOpenedMind(){
    if (scene === "falling"){
      noStroke();
      colorMode(HSB, 255)
      for (let y = 10; y < height; y += 10) {
        for (let x = 10; x < 100; x += 10) { //create a grid of lines
          stroke(noise(x / 100.0, y / 100.0, millis()/3000.0) * 360.0, 255, 255);
          //color the lines with a noise field
          let direction = noise(x / 250.0 + millis()/6000.0, y / 250.0, millis()/10000.0)*(TWO_PI*2.0);
          //calculate direction of the hair using noise * 2PI then *2 for more motion
          line(x, y, (sin(direction)*50.0)+x, (cos(direction)*50.0)+y);
          //draw line from grid point to new point determined by direction plus offset
        }
      }

      for (let y = 10; y < height; y += 10) {
        for (let x = width - 100; x < width; x += 10) { //create a grid of lines
          stroke(noise(x / 100.0, y / 100.0, millis()/3000.0) * 360.0, 255, 255);
          //color the lines with a noise field
          let direction = noise(x / 250.0 + millis()/6000.0, y / 250.0, millis()/10000.0)*(TWO_PI*2.0);
          //calculate direction of the hair using noise * 2PI then *2 for more motion
          line(x, y, (sin(direction)*50.0)+x, (cos(direction)*50.0)+y);
          //draw line from grid point to new point determined by direction plus offset
        }
      }
    }
  }
}
