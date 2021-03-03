let juggle; // Object variable

// Object which holds the properties of the paddle
let paddle = {
  width: 100,
  height: 30,
  x: undefined,
  y: undefined,
};

let balls = []; // Array used to store the ball objects
const noOfBalls = 6; // Number of balls to be stored in the array
let droppedCount = 0; // Keeps count of the number of balls missed by the user
// Asset variables for the sections of the brain displayed in the background
let brain = {
  sect1: undefined,
  sect2: undefined,
  sect3: undefined,
  sect4: undefined,
  sect5: undefined,
  sect6: undefined,
};
// Asset variables for the icons displayed on the balls
let icon = {
  wealth: undefined,
  health: undefined,
  social: undefined,
  home: undefined,
  peace: undefined,
  dreams: undefined,
};

class Juggle {
  constructor(brain, icon) {}
  // Displays the paddle
  displayPaddle() {
    if (scene === "juggle") {
      push();
      fill(25, 42, 245);
      noStroke();
      rectMode(CENTER);
      paddle.x = mouseX;
      paddle.y = mouseY; // Attatched to mouse
      rect(paddle.x, paddle.y, paddle.width, paddle.height);
      pop();
    }
  }
  // Simulated setup function which calls the createBall() function and stores it in the indexes of the balls array
  setupBalls() {
    if (scene === "juggleSetup") {
      for (let i = 0; i < noOfBalls; i++) {
        balls[i] = this.createBall(random(0, width), random(-600, 0));
      }
      scene = "juggle";
    }
  }
  // Function which is called to create a ball and assign its properties
  createBall(x, y) {
    let ball = {
      x: x,
      y: y,
      vx: 0, // Horizontal movement speed
      vy: 0, // Vertical movement speed
      ax: 0, // Horizontal accelaration
      ay: 0, // Vertical accelaration
      maxSpeed: 5, // Max speed used to constrain movement speed
      size: 90, // Size of ellipse
      gravityForce: 0.0005, // Used to influence the vertical movement over time
    };
    return ball;
  }

  gravity(ball) {
    ball.ay = ball.ay + ball.gravityForce; // Accelaration of ball increased over time
  }
  // Moves the ball
  move(ball) {
    ball.vy = ball.vy + ball.ay; // Adds accelaration to its movement
    ball.vy = constrain(ball.vy, -ball.maxSpeed, ball.maxSpeed); // Constrains the vertical movement speed
    ball.y = ball.y + ball.vy; // Uses the vertical movement variable to change the balls position accordingly
  }
  // Makes the ball bounce when it comes into contact with the paddle
  bounce(ball) {
    if (
      ball.x > paddle.x - paddle.width / 2 &&
      ball.x < paddle.x + paddle.width / 2 &&
      ball.y + ball.size / 2 > paddle.y - paddle.height / 2 &&
      ball.y - ball.size / 2 < paddle.y + paddle.height / 2
    ) {
      ball.vy = -ball.vy; // Flips the direction of the ball's movement
      ball.ay = 0; // Resets its accelaration
      ball.gravityForce += 0.00005; // Adds the influence of gravity to the equation
    }
  }
  // Draws the balls on the canvas
  displayBalls(ball) {
    push();
    fill(255, 50, 50);
    stroke(0);
    ellipse(ball.x, ball.y, ball.size);
    pop();
  }
  // Resets the position of the balls if they fall off the screen
  resetBalls(ball) {
    if (ball.y > height) {
      droppedCount += 1; // Increments the counter which keeps track of how many have fallen
      // Resets position of the ball
      ball.x = random(0, width);
      ball.y = random(-600, 0);
    }
  }
  // Calls all the relevant functions to display, move, interact, and reset each ball
  responsibilites() {
    if (scene === "juggle") {
      for (let i = 0; i < noOfBalls; i++) {
        this.gravity(balls[i]);
        this.move(balls[i]);
        this.bounce(balls[i]);
        this.displayBalls(balls[i]);
        this.resetBalls(balls[i]);
      }
    }
  }
  // Displays icons on the balls
  displayIcons() {
    if (scene === "juggle") {
      push();
      imageMode(CENTER);
      image(icon.wealth, balls[0].x, balls[0].y);
      image(icon.home, balls[1].x, balls[1].y);
      image(icon.health, balls[2].x, balls[2].y);
      image(icon.peace, balls[3].x, balls[3].y);
      image(icon.dreams, balls[4].x, balls[4].y);
      image(icon.social, balls[5].x, balls[5].y);
      pop();
    }
  }
  // Displays the brain in the background
  displayBrain() {
    if (scene === "juggle") {
      push();
      // Position variables for the brain
      let topLeftX = 330;
      let topLeftY = 50;
      let sectWidth = 241;
      let sectHeight = 359;
      imageMode(CORNER);
      if (droppedCount >= 3) { // Repeated if statements used to display sections of the brain over time depending on how many balls the user missed
        image(brain.sect1, topLeftX, topLeftY);
      }
      if (droppedCount >= 6) {
        image(brain.sect2, topLeftX + sectWidth, topLeftY);
      }
      if (droppedCount >= 9) {
        image(brain.sect3, topLeftX + sectWidth * 2, topLeftY);
      }
      if (droppedCount >= 12) {
        image(brain.sect4, topLeftX, topLeftY + sectHeight);
      }
      if (droppedCount >= 15) {
        image(brain.sect5, topLeftX + sectWidth, topLeftY + sectHeight);
      }
      if (droppedCount >= 18) {
        image(brain.sect6, topLeftX + sectWidth * 2, topLeftY + sectHeight);
      }
      pop();
    }
  }
}
