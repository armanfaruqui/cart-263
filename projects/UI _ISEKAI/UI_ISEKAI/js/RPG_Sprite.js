let user = {
  stand: undefined,
  walkDown: undefined,
  standLeft: undefined,
  walkLeft: undefined,
  standRight: undefined,
  walkRight: undefined,
  standUp: undefined,
  walkUp: undefined,
};

class RPG_Sprite {
  constructor(user) {
    this.sprite = createSprite(650, 490, 42, 42); // Initializes the sprite
    this.sprite.addAnimation("stand", user.stand); // Adds animationa to a "key" which can be called later
    this.sprite.addAnimation("walkDown", user.walkDown);
    this.sprite.addAnimation("standLeft", user.standLeft);
    this.sprite.addAnimation("walkLeft", user.walkLeft);
    this.sprite.addAnimation("standRight", user.standRight);
    this.sprite.addAnimation("walkRight", user.walkRight);
    this.sprite.addAnimation("standUp", user.standUp);
    this.sprite.addAnimation("walkUp", user.walkUp);
  }

  // Individual methods for movement for when they become more complicated
  update() {
    if (
      keyIsDown(65) &&
      !keyIsDown(83) &&
      !keyIsDown(68) &&
      !keyIsDown(87) &&
      this.sprite.velocity.y === 0
    ) {
      // For movement to the left
      this.sprite.changeAnimation("walkLeft"); // Relevant animation triggered
      this.sprite.velocity.x = -5; // Moves the sprite
      this.direction = "left"; // Stores the direction for use in different functions
    } else if (
      keyIsDown(83) &&
      !keyIsDown(65) &&
      !keyIsDown(68) &&
      !keyIsDown(87) &&
      this.sprite.velocity.x === 0
    ) {
      // For movement to the right
      this.sprite.changeAnimation("walkDown"); // Same process repeated for movement in the other 3 directions
      this.sprite.velocity.y = 5;
      this.direction = "down";
    } else if (
      keyIsDown(68) &&
      !keyIsDown(83) &&
      !keyIsDown(65) &&
      !keyIsDown(87) &&
      this.sprite.velocity.y === 0
    ) {
      this.sprite.changeAnimation("walkRight");
      this.sprite.velocity.x = 5;
      this.direction = "right";
    } else if (
      keyIsDown(87) &&
      !keyIsDown(83) &&
      !keyIsDown(68) &&
      !keyIsDown(65) &&
      this.sprite.velocity.x === 0
    ) {
      this.sprite.changeAnimation("walkUp");
      this.sprite.velocity.y = -5;
      this.direction = "up";
    } else {
      this.sprite.velocity.x = 0;
      this.sprite.velocity.y = 0; // user is stationary if nothing is pressed
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
  // Checks if the navigator is close enough to select an icon.
  checkIfNearIcon() {
    let d1 = dist(
      this.sprite.position.x,
      this.sprite.position.y,
      iconPos.x1,
      iconPos.y1
    );
    let d2 = dist(
      this.sprite.position.x,
      this.sprite.position.y,
      iconPos.x2,
      iconPos.y1
    );
    let d3 = dist(
      this.sprite.position.x,
      this.sprite.position.y,
      iconPos.x3,
      iconPos.y1
    );
    let d4 = dist(
      this.sprite.position.x,
      this.sprite.position.y,
      iconPos.x4,
      iconPos.y2
    );
    let d5 = dist(
      this.sprite.position.x,
      this.sprite.position.y,
      iconPos.x5,
      iconPos.y2
    );

    if (d1 < iconPos.dist) {
      $(`#li`).addClass("iconshovered");
      liHovered = true;
    } else {
      $(`#li`).removeClass("iconshovered");
      liHovered = false;
    }
    if (d2 < iconPos.dist) {
      $(`#messages`).addClass("iconshovered");
      messagesHovered = true;
    } else {
      $(`#messages`).removeClass("iconshovered");
      messagesHovered = false;
    }
    if (d3 < iconPos.dist) {
      $(`#garden`).addClass("iconshovered");
      gardenHovered = true;
    } else {
      $(`#garden`).removeClass("iconshovered");
      gardenHovered = false;
    }
    if (d4 < iconPos.dist) {
      $(`#food`).addClass("iconshovered");
      foodHovered = true;
    } else {
      $(`#food`).removeClass("iconshovered");
      foodHovered = false;
    }
    if (d5 < iconPos.dist) {
      $(`#social`).addClass("iconshovered");
      socialHovered = true;
    } else {
      $(`#social`).removeClass("iconshovered");
      socialHovered = false;
    }
  }
  // Pressing shift when hovering the menu icons with a sprite allows you to access them
  interactWithIcon() {
    if (liHovered === true && keyCode === 16) {
      // LEFT SHIFT
      $(`#li`).trigger("click"); // Runs the function within the click event listerner for the selected element
    }
    if (foodHovered === true && keyCode === 16) {
      $(`#food`).trigger("click");
    }
    if (gardenHovered === true && keyCode === 16) {
      $(`#garden`).trigger("click");
    }
    if (socialHovered === true && keyCode === 16) {
      $(`#social`).trigger("click");
    }
    if (messagesHovered === true && keyCode === 16) {
      $(`#messages`).trigger("click");
    }
  }

  interactWithSign() {
    if (sign.sprite.overlap(this.sprite) && keyCode === SHIFT) {
      $("#dialogSign").dialog("open");
    } else {
      $("#dialogSign").dialog("close");
    }
  }
}
