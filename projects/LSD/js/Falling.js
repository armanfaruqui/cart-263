let falling; // Object Variable
// Object which holds the properties of the falling man controlled by the user
let fallingMan = {
  ani: undefined, // Variable which holds the animation
  x: 684,
  y: 130,
  vx: 0, // Horizontal movement
  vy: 0, // Vertical movement
  ax: 0, // Horizontal accelaration
  ay: 0, // Vertical accelaration
  accelaration: 0.4, // Accelaration amount
  maxSpeedX: 7, // max speed used to constrain the horizontal movement speed
  maxSpeedY: 2 // max speed used to constrain the vertical movement speed
}
// Object which holds the properties of the ring that appears on the screen
let ring = {
  x: undefined,
  y: undefined,
  width: 350, // Width of ellipse
  xoff: 0, // Offset amount for the noise applied to this ring's x position
  yoff: 10000 // Offset amount for the noise applied to this ring's y position
}

let fallingState = 0 // State variable used to order the sequence of events which take place
let displayRing = false // // Boolean which controls whether the ring should be on screen
let showOpenedMind = false // Boolean which controls whether the opened mind should be shown
let timeInRing = 0 // Variable which is incremented when the user is in the ring

class Falling {
  constructor(fallingMan){

  }
  // Controls the movement of the user controlled man. Accelarates in the direction of the mouse
  moveMan(){
    if (scene === "falling"){
      if (mouseX < fallingMan.x) {
        fallingMan.ax = -fallingMan.accelaration; // Negative horizontal accelaration value if man is right of mouse
      } else {
        fallingMan.ax = fallingMan.accelaration; // Positive horizontal accelaration value if man is left of mouse
      }
      if (mouseY < fallingMan.y) {
        fallingMan.ay = -fallingMan.accelaration; // Negative vertical accelaration value if man is above mouse
      } else {
        fallingMan.ay = fallingMan.accelaration; // Positive vertical accelaration value if man is below mouse
      }
      // Accelaration properties of the fallingMan
      fallingMan.vx = fallingMan.vx + fallingMan.ax;
      fallingMan.vx = constrain(fallingMan.vx, -fallingMan.maxSpeedX, fallingMan.maxSpeedX); // Limits horizontal speed
      fallingMan.vy = fallingMan.vy + fallingMan.ay;
      fallingMan.vy = constrain(fallingMan.vy, -fallingMan.maxSpeedY, fallingMan.maxSpeedY); // Limits vertical speed

      // Moves the fallingMan
      fallingMan.x = fallingMan.x + fallingMan.vx;
      fallingMan.y = fallingMan.y + fallingMan.vy;
    }
  }
  // Displays the animation
  displayMan(){
    if (scene === "falling")
      animation(fallingMan.ani, fallingMan.x, fallingMan.y)
  }
  // Displays the defaul background of the scene
  background1(){
    let linedist = random(20, 40);
    for (let x = 0; x <= width; x = x + linedist) { // Lines from top to bottom of canvas repeatedly drawn at different x positions
      push();
      strokeWeight(2);
      stroke(255, 33);
      line(x, 0, x, height);
      pop();
    }
  }
  // Displays a series of lines controller by perlin noise on the sides of the window. Learned from https://editor.p5js.org/digitalcoleman/sketches/ZPsxc4HvM
  displayOpenedMind(){
    if (scene === "falling" && showOpenedMind === true){
      noStroke();
      colorMode(HSB, 255)
      // LEFT BORDER
      for (let y = 10; y < height; y += 10) {
        for (let x = 10; x < 100; x += 10) { //createS a grid of lines
          stroke(noise(x / 100.0, y / 100.0, millis()/3000.0) * 360.0, 255, 255);
          // Colors the lines with a noise field
          let direction = noise(x / 250.0 + millis()/6000.0, y / 250.0, millis()/10000.0)*(TWO_PI*2.0);
          // Calculates direction of the hair using noise * 2PI then *2 for more motion
          line(x, y, (sin(direction)*50.0)+x, (cos(direction)*50.0)+y);
          // Draws line from grid point to new point determined by direction plus offset
        }
      }
      // RIGHT BORDER
      for (let y = 10; y < height; y += 10) {
        for (let x = width - 100; x < width; x += 10) { //create a grid of lines
          stroke(noise(x / 100.0, y / 100.0, millis()/3000.0) * 360.0, 255, 255);
          // Colors the lines with a noise field
          let direction = noise(x / 250.0 + millis()/6000.0, y / 250.0, millis()/10000.0)*(TWO_PI*2.0);
          // Calculates direction of the hair using noise * 2PI then *2 for more motion
          line(x, y, (sin(direction)*50.0)+x, (cos(direction)*50.0)+y);
          // Draws line from grid point to new point determined by direction plus offset
        }
      }
    }
  }
  // Displays a ring which moves about the canvas using perlin noise
  displayMovingRing(){
    if (scene === "falling"){
      if (fallingState === 0){
        setTimeout(function(){displayRing = true}, 2000); // Ring can be displayed after 2 seconds
        fallingState = 1
      }
      if (displayRing === true){
        ring.x = map(noise(ring.xoff), 0, 1, 0, width)
        ring.xoff += 0.006
        ring.y = map(noise(ring.yoff), 0, 1, 0, height)
        ring.yoff += 0.003
        push()
        strokeWeight(12)
        stroke(255, 20, 30)
        noFill()
        ellipseMode(CENTER);
        ellipse(ring.x, ring.y, ring.width)
        console.log(timeInRing)
        console.log(displayRing)
        pop()
      }
    }
  }

    checkDistanceFromRing(){
      if (scene === "falling" && displayRing === true){
        let d = dist(fallingMan.x, fallingMan.y, ring.x, ring.y)
        if (d < ring.width / 2){
          timeInRing += 1
        }
        else {
          timeInRing = 0
        }
        if (timeInRing > 150 && fallingState === 1){
          showOpenedMind = true
          setTimeout(function(){showOpenedMind = false}, 8000)
          displayRing = false
        }
      }
    }

}
