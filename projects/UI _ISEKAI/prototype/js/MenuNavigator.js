let player = {
  stand: undefined,
  walkDown: undefined,
  standLeft: undefined,
  walkLeft: undefined,
  standRight: undefined,
  walkRight: undefined,
  standUp: undefined,
  walkUp: undefined,
};

class MenuNav {
  constructor(player) {
    this.x = 100;
    this.y = 100;
    this.sprite = createSprite(650, 200, 42, 42); // Initializes the sprite
    this.sprite.addAnimation("walkDown", player.walkDown);
    this.sprite.addAnimation("standLeft", player.standLeft);
    this.sprite.addAnimation("walkLeft", player.walkLeft);
    this.sprite.addAnimation("standRight", player.standRight);
    this.sprite.addAnimation("walkRight", player.walkRight);
    this.sprite.addAnimation("standUp", player.standUp);
    this.sprite.addAnimation("walkUp", player.walkUp);
  }
  // Individual methods for movement for when they become more complicated
  update() {
    if (keyIsDown(65) && !keyIsDown(83) && !keyIsDown(68) && !keyIsDown(87)) {
      // For movement to the left
      this.sprite.changeAnimation("walkLeft"); // Relevant animation triggered
      this.sprite.velocity.x = -2.4; // Moves the sprite
      this.direction = "left"; // Stores the direction for use in different functions
    } else if (
      keyIsDown(83) &&
      !keyIsDown(65) &&
      !keyIsDown(68) &&
      !keyIsDown(87)
    ) {
      // For movement to the right
      this.sprite.changeAnimation("walkDown"); // Same process repeated for movement in the other 3 directions
      this.sprite.velocity.y = 2.4;
      this.direction = "down";
    } else if (
      keyIsDown(68) &&
      !keyIsDown(83) &&
      !keyIsDown(65) &&
      !keyIsDown(87)
    ) {
      this.sprite.changeAnimation("walkRight");
      this.sprite.velocity.x = 2.4;
      this.direction = "right";
    } else if (
      keyIsDown(87) &&
      !keyIsDown(83) &&
      !keyIsDown(68) &&
      !keyIsDown(65)
    ) {
      this.sprite.changeAnimation("walkUp");
      this.sprite.velocity.y = -2.4;
      this.direction = "up";
    } else {
      this.sprite.velocity.x = 0;
      this.sprite.velocity.y = 0;
      if (this.direction === "down") {
        this.sprite.changeAnimation("stand");
      } else if (this.direction === "up") {
        this.sprite.changeAnimation("standUp");
      } else if (this.direction === "right") {
        this.sprite.changeAnimation("standRight");
      } else if (this.direction === "left") {
        this.sprite.changeAnimation("standLeft");
      }
    }
    drawSprites(); // Draws the sprite
  }
}
