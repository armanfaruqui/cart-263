let juggle; // Object variable

let paddle = {
  width: 100,
  height: 30,
  x: undefined,
  y: undefined
}

let balls = []
const noOfBalls = 6;
let bounceCount = 0;
let droppedCount = 0;

let brain = {
  sect1: undefined,
  sect2: undefined,
  sect3: undefined,
  sect4: undefined,
  sect5: undefined,
  sect6: undefined
}

let icon = {
  wealth: undefined,
  health: undefined,
  social: undefined,
  home: undefined,
  peace: undefined,
  dreams: undefined
}

class Juggle {
  constructor(brain, icon){

  }

  displayPaddle() {
    if (scene === "juggle"){
      push();
      fill(25, 42, 245);
      noStroke();
      rectMode(CENTER);
      paddle.x = mouseX
      paddle.y = mouseY
      rect(paddle.x, paddle.y, paddle.width, paddle.height);
      pop();
    }
  }

  setupBalls(){
    if (scene === "juggleSetup"){
      for (let i = 0; i < noOfBalls; i++){
        balls[i] = this.createBall(random(0, width), random(-600, 0))
      }
      scene = "juggle"
    }
  }

  createBall(x, y){
    let ball = {
      x: x,
      y: y,
      vx: 0,
      vy: 0,
      ax: 0,
      ay: 0,
      maxSpeed: 5,
      size: 90,
      active: true,
      gravityForce: 0.0005,
      d: undefined
    };
    return ball;
  }

  gravity(ball) {
    ball.ay = ball.ay + ball.gravityForce;
  }

  move(ball) {
    ball.vx = ball.vx + ball.ax;
    ball.vy = ball.vy + ball.ay;

    ball.vx = constrain(ball.vx, -ball.maxSpeed, ball.maxSpeed);
    ball.vy = constrain(ball.vy, -ball.maxSpeed, ball.maxSpeed);

    ball.x = ball.x + ball.vx;
    ball.y = ball.y + ball.vy;
  }

  bounce(ball) {
    if (
      ball.x > paddle.x - paddle.width / 2 &&
      ball.x < paddle.x + paddle.width / 2 &&
      ball.y + ball.size / 2 > paddle.y - paddle.height / 2 &&
      ball.y - ball.size / 2 < paddle.y + paddle.height / 2
    ) {
      ball.vy = -ball.vy;
      ball.ay = 0;
      bounceCount = bounceCount + 1
      ball.gravityForce += 0.00005;
    }
  }


  displayBalls(ball){
    push();
    fill(255, 50, 50);
    stroke(0);
    ellipse(ball.x, ball.y, ball.size);
    pop();
  }

  resetBalls(ball){
    if (ball.y > height){
      droppedCount += 1
      ball.x = random(0, width)
      ball.y = random(-600, 0)
    }
  }

  responsibilites(){
    if (scene === "juggle"){
      for (let i = 0; i < noOfBalls; i++){
        this.gravity(balls[i])
        this.move(balls[i])
        this.bounce(balls[i])
        this.displayBalls(balls[i])
        this.resetBalls(balls[i])
      }
    }
  }

  displayIcons(){
    if (scene === "juggle"){
      push()
      imageMode(CENTER)
      image(icon.wealth, balls[0].x, balls[0].y)
      image(icon.home, balls[1].x, balls[1].y)
      image(icon.health, balls[2].x, balls[2].y)
      image(icon.peace, balls[3].x, balls[3].y)
      image(icon.dreams, balls[4].x, balls[4].y)
      image(icon.social, balls[5].x, balls[5].y)
      pop()
    }
  }

  displayBrain(){
    if (scene === "juggle"){
      push()
      let topLeftX = 330
      let topLeftY = 50
      let sectWidth = 241
      let sectHeight = 359
      imageMode(CORNER)
      if (droppedCount >= 3){
        image(brain.sect1, topLeftX, topLeftY)
      }
      if (droppedCount >= 6){
        image(brain.sect2, topLeftX + sectWidth, topLeftY)
      }
      if (droppedCount >= 9){
        image(brain.sect3, topLeftX + sectWidth * 2, topLeftY)
      }
      if (droppedCount >= 12){
        image(brain.sect4, topLeftX, topLeftY + sectHeight)
      }
      if (droppedCount >= 15){
        image(brain.sect5, topLeftX + sectWidth, topLeftY + sectHeight)
      }
      if (droppedCount >= 18){
        image(brain.sect6, topLeftX + sectWidth * 2, topLeftY + sectHeight)
      }
      pop()
    }
  }
}
