// Scene runs a simulation where the user controls an animation of a man. Rings appear on the screen. When the man is positioned within the ring long enough, a visual event is triggered

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
  maxSpeedY: 2, // max speed used to constrain the vertical movement speed
};
// Object which holds the properties of the ring that appears on the screen
let ring = {
  x: undefined,
  y: undefined,
  width: 350, // Width of ellipse
  xoff: 0, // Offset amount for the noise applied to this ring's x position
  yoff: 10000, // Offset amount for the noise applied to this ring's y position
  // color values
  r: 176, // 208
  rInc: true, // Checks if the r variable should be incremented
  g: 233, // 94
  gDec: true, // Checks if the g variable should be decremented
  b: 87, // 43
  bDec: true, // Checks if the b variable should be decremented
};

let fallingState = 0; // State variable used to order the sequence of events which take place
let displayRing = false; // // Boolean which controls whether the ring should be on screen
let timeInRing = 0; // Variable which is incremented when the user is in the ring
let timeNeeded = 100; // Variable which represents the value timeInRing needs to reach

// Object which hold's the asset variables for the sea state and properties to position fish
let sea = {
  rock: undefined,
  fish1: undefined,
  fish2: undefined,
  fish3: undefined,
  x1: -100,
  y1: 150,
  x2: 1400,
  y2: 400,
  x3: -300,
  x4: 500,
};

let showOpenedMind = false; // Boolean which controls whether the opened mind should be shown
let showSea = false; // Boolean which controls whether the sea state assets should be shown
let deg1 = 0;
let deg2 = 0; // Variables which rotate the rocks in the sea state

let circles = []; // Array to store the circles displayed in fallingState7
let numOfCircles = 70; // Number of circles to be displayed in fallingState 7

class Falling {
  constructor(fallingMan, sea) {}
  // Controls the movement of the user controlled man. Accelarates in the direction of the mouse
  moveMan() {
    if (scene === "falling") {
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
      fallingMan.vx = constrain(
        fallingMan.vx,
        -fallingMan.maxSpeedX,
        fallingMan.maxSpeedX
      ); // Limits horizontal speed
      fallingMan.vy = fallingMan.vy + fallingMan.ay;
      fallingMan.vy = constrain(
        fallingMan.vy,
        -fallingMan.maxSpeedY,
        fallingMan.maxSpeedY
      ); // Limits vertical speed

      // Moves the fallingMan
      fallingMan.x = fallingMan.x + fallingMan.vx;
      fallingMan.y = fallingMan.y + fallingMan.vy;
    }
  }
  // Displays the animation
  displayMan() {
    if (scene === "falling")
      animation(fallingMan.ani, fallingMan.x, fallingMan.y);
  }
  // Displays the defaul background of the scene
  background1() {
    if (scene === "falling") {
      let linedist = random(60, 80);
      for (let x = 0; x <= width; x = x + linedist) {
        // Lines from top to bottom of canvas repeatedly drawn at different x positions
        push();
        strokeWeight(2);
        stroke(255, 33);
        line(x, 0, x, height);
        pop();
      }
    }
  }

  // Increases then decreases the value of the r, g, and b variables of the ring to constantly fade it betweem 2 different colors
  changingColor() {
    if (scene === "falling") {
      // r value
      if (ring.r <= 208 && ring.rInc === true) {
        ring.r += 0.64; // The values used to increment or decrement each variable is in the same ratio of the difference between the 2 colors
        if (ring.r === 208) {
          ring.rInc = false;
        }
      } else {
        ring.rInc = false;
        ring.r -= 0.64;

        if (ring.r === 176) {
          ring.rInc = true;
        }
      }
      // g value
      if (ring.g >= 94 && ring.gDec === true) {
        ring.g -= 2.78;
        if (ring.g === 94) {
          ring.gDec = false;
        }
      } else {
        ring.gDec = false;
        ring.g += 2.78;

        if (ring.g === 233) {
          ring.gDec = true;
        }
      }
      // b value
      if (ring.b >= 43 && ring.bDec === true) {
        ring.b -= 0.88;
        if (ring.b === 43) {
          ring.bDec = false;
        }
      } else {
        ring.bDec = false;
        ring.b += 0.88;

        if (ring.b === 87) {
          ring.bDec = true;
        }
      }
    }
  }
  // Displays a ring which moves about the canvas using perlin noise
  displayMovingRing() {
    if (scene === "falling") {
      if (fallingState === 0) {
        setTimeout(function () {
          displayRing = true;
        }, 5000); // Ring can be displayed after 2 seconds of the scene's launch
        fallingState = 1;
      }
      if (fallingState === 2) {
        setTimeout(function () {
          displayRing = true;
        }, 5000); // Ring can be displayed after 2 seconds of the opened mind disappearing
        fallingState = 3;
      }
      if (fallingState === 4) {
        setTimeout(function () {
          displayRing = true;
        }, 5000); // Ring can be displayed after 2 seconds of the opened mind disappearing
        fallingState = 5;
      }
      if (displayRing === true) {
        ring.x = map(noise(ring.xoff), 0, 1, 0, width);
        ring.xoff += 0.006;
        ring.y = map(noise(ring.yoff), 0, 1, 0, height);
        ring.yoff += 0.003;
        push();
        strokeWeight(12);
        stroke(ring.r, ring.g, ring.b);
        noFill();
        ellipseMode(CENTER);
        ellipse(ring.x, ring.y, ring.width);
        // console.log(timeInRing);
        // console.log(displayRing);
        pop();
      }
    }
  }
  // Keeps track of the time the user spends within the ring to trigger the relevant function
  checkDistanceFromRing() {
    if (scene === "falling" && displayRing === true) {
      let d = dist(fallingMan.x, fallingMan.y, ring.x, ring.y);
      if (d < ring.width / 2) {
        timeInRing += 1; // Increases counter when inside ring
      } else {
        timeInRing = 0; // Resets counter to 0 when man moved out of ring
      }
      // Triggers the first event
      if (timeInRing > timeNeeded && fallingState === 1) {
        showOpenedMind = true;
        setTimeout(function () {
          showOpenedMind = false;
          timeInRing = 0; // Resets counter so next ring dosen't call the relevant function immedietly
          fallingState = 2;
        }, 10000);
        displayRing = false;
      }
      // Triggers the second event
      if (timeInRing > timeNeeded && fallingState === 3) {
        showSea = true;
        setTimeout(function () {
          showSea = false;
          timeInRing = 0;
          fallingState = 4;
        }, 14000);
        displayRing = false;
      }
      // Triggers the third event
      if (timeInRing > timeNeeded && fallingState === 5) {
        fallingState = 6;
        setTimeout(function () {
          timeInRing = 0;
          fallingState = 8;
        }, 12000);
        displayRing = false;
      }
    }
  }
  // Displays a box which fills up with a bar when the man is positioned within the ring
  displayCompletionBar() {
    if (scene === "falling" && displayRing === true) {
      // Draws the outer box of the bar
      push();
      noFill();
      strokeWeight(3);
      stroke(150);
      rectMode(CENTER);
      rect(width / 2, 700, 300, 40);
      pop();
      // Draws the bar
      push();
      fill(212, 0, 35);
      noStroke();
      rectMode(CENTER);
      let barCompletion = map(timeInRing, 0, timeNeeded, 0, 290); // Maps the time in ring to the width of the bar
      rect(width / 2, 700, barCompletion, 34);
      pop();
    }
  }
  // Displays a series of lines controller by perlin noise on the sides of the window. Learned from https://editor.p5js.org/digitalcoleman/sketches/ZPsxc4HvM
  displayOpenedMind() {
    if (scene === "falling" && showOpenedMind === true) {
      noStroke();
      colorMode(HSB, 255);
      // LEFT BORDER
      for (let y = 10; y < height; y += 10) {
        for (let x = 10; x < 100; x += 10) {
          //createS a grid of lines
          stroke(
            noise(x / 100.0, y / 100.0, millis() / 3000.0) * 360.0,
            255,
            255
          );
          // Colors the lines with a noise field
          let direction =
            noise(
              x / 250.0 + millis() / 6000.0,
              y / 250.0,
              millis() / 10000.0
            ) *
            (TWO_PI * 2.0);
          // Calculates direction of the hair using noise * 2PI then *2 for more motion
          line(x, y, sin(direction) * 50.0 + x, cos(direction) * 50.0 + y);
          // Draws line from grid point to new point determined by direction plus offset
        }
      }
      // RIGHT BORDER
      for (let y = 10; y < height; y += 10) {
        for (let x = width - 100; x < width; x += 10) {
          //create a grid of lines
          stroke(
            noise(x / 100.0, y / 100.0, millis() / 3000.0) * 360.0,
            255,
            255
          );
          // Colors the lines with a noise field
          let direction =
            noise(
              x / 250.0 + millis() / 6000.0,
              y / 250.0,
              millis() / 10000.0
            ) *
            (TWO_PI * 2.0);
          // Calculates direction of the hair using noise * 2PI then *2 for more motion
          line(x, y, sin(direction) * 50.0 + x, cos(direction) * 50.0 + y);
          // Draws line from grid point to new point determined by direction plus offset
        }
      }
    }
  }
  // Displays and manipuates the assets shown during the sea state
  seaState() {
    if (scene === "falling" && showSea === true) {
      // Fish 1
      push();
      imageMode(CENTER);
      image(sea.fish1, sea.x1, sea.y1);
      sea.x1 += 6; // Moves to the right
      pop();
      // Fish 2
      push();
      imageMode(CENTER);
      image(sea.fish2, sea.x2, sea.y2);
      sea.x2 -= 10; // Moves to the left
      pop();
      // Fish 3
      push();
      imageMode(CENTER);
      image(sea.fish3, sea.x1, 500);
      sea.x3 += 6; // Moves to the right
      pop();
      // Left rock
      push();
      translate(20, 350);
      rotate(radians(deg1));
      imageMode(CENTER);
      image(sea.rock, 0, 0);
      deg1 += 1; // Spins the image
      pop();
      // Right Rock
      push();
      translate(width - 20, 350);
      rotate(radians(deg2));
      imageMode(CENTER);
      image(sea.rock, 0, 0);
      deg2 -= 1; // Spins the image
      pop();
    }
  }
// Mock setup function to initialize circles array with circle objects
  sensoryOverloadSetup() {
    if (scene === "falling" && fallingState === 6) {
      for (let i = 0; i < numOfCircles; i++) {
        let x = random(width);
        let y = random(height + 100, height - 100);
        let d = random(20, 150);
        let c = color(random(255), random(255), 255); // Random blue-ish color
        let s = random(0.5, 3);
        circles[i] = this.createCircle(x, y, d, c, s);
      }
      fallingState = 7;
    }
  }
  // Creates a circle object with the variables assigned in sensoryOverloadSetup()
  createCircle(x, y, d, c, s) {
    let circle = {
      x: x,
      y: y,
      d: d, // diameter
      color: c,
      speed: s,
    };
    return circle;
  }
  // Displays the circles
  displayCircle(circle) {
    push();
    stroke(240);
    fill(circle.color);
    ellipse(circle.x, circle.y, circle.d, circle.d);
    pop();
  }
  // Moves the circles upwards. If they come near enough to the man they drift away
  moveCircle(circle) {
    circle.y -= circle.speed;
    let d = dist(circle.x, circle.y, fallingMan.x, fallingMan.y);
    if (d < 250 && circle.x > fallingMan.x) {
      circle.x += 4; // Drift to right if circle is right of man
    }
    if (d < 250 && circle.x < fallingMan.x) {
      circle.x -= 4; // Drift to left if circle is left of man
    }
  }
  // Calls the display and move funciton for each individual circle in the circles array
  sensoryOverload() {
    if (fallingState === 7) {
      for (let i = 0; i < circles.length; i++) {
        this.moveCircle(circles[i]);
        this.displayCircle(circles[i]);
      }
    }
  }
}
