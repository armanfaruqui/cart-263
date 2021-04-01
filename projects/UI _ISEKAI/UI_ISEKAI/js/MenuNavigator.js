let rpg; // Object variable
let rpgBackground

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

let iconPos = { // Position variables for the icon
  x1: 263,
  x2: 547,
  x3: 824,
  x4: 1113,
  y: 404,
  dist: 130
}

let emailHovered = false;
let foodHovered = false;
let gardenHovered = false;
let socialHovered = false;

class Menu_RPG {
  constructor(player, rpgBackground) {

    this.sprite = createSprite(650, 200, 42, 42); // Initializes the sprite
    this.sprite.addAnimation("stand", player.stand); // Adds animationa to a "key" which can be called later
    this.sprite.addAnimation("walkDown", player.walkDown);
    this.sprite.addAnimation("standLeft", player.standLeft);
    this.sprite.addAnimation("walkLeft", player.walkLeft);
    this.sprite.addAnimation("standRight", player.standRight);
    this.sprite.addAnimation("walkRight", player.walkRight);
    this.sprite.addAnimation("standUp", player.standUp);
    this.sprite.addAnimation("walkUp", player.walkUp);
  }
  display(){
    push()
    image(rpgBackground, 0, 0)
    pop()
  }
  // Sets walls/boundaries for the user's sprite
  boundaries(){
  if (rpg.sprite.position.x < 115) rpg.sprite.position.x = 115;
  if (rpg.sprite.position.y < 120) rpg.sprite.position.y = 120;
  if (rpg.sprite.position.x > 1155) rpg.sprite.position.x = 1155;
  if (rpg.sprite.position.y > 625) rpg.sprite.position.y = 625;
  }
  // Individual methods for movement for when they become more complicated
  update() {
    if (keyIsDown(65) && !keyIsDown(83) && !keyIsDown(68) && !keyIsDown(87)) {
      // For movement to the left
      this.sprite.changeAnimation("walkLeft"); // Relevant animation triggered
      this.sprite.velocity.x = -5; // Moves the sprite
      this.direction = "left"; // Stores the direction for use in different functions
    } else if (keyIsDown(83) && !keyIsDown(65) && !keyIsDown(68) && !keyIsDown(87)) {
      // For movement to the right
      this.sprite.changeAnimation("walkDown"); // Same process repeated for movement in the other 3 directions
      this.sprite.velocity.y = 5;
      this.direction = "down";
    } else if (keyIsDown(68) && !keyIsDown(83) && !keyIsDown(65) && !keyIsDown(87)
    ) {
      this.sprite.changeAnimation("walkRight");
      this.sprite.velocity.x = 5;
      this.direction = "right";
    } else if (keyIsDown(87) && !keyIsDown(83) && !keyIsDown(68) && !keyIsDown(65)
    ) {
      this.sprite.changeAnimation("walkUp");
      this.sprite.velocity.y = -5;
      this.direction = "up";
    } else {
      this.sprite.velocity.x = 0;
      this.sprite.velocity.y = 0; // Player is stationary if nothing is pressed
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
  checkIfNearIcon(){
    let d1 = dist(this.sprite.position.x, this.sprite.position.y, iconPos.x1, iconPos.y)
    let d2 = dist(this.sprite.position.x, this.sprite.position.y, iconPos.x2, iconPos.y)
    let d3 = dist(this.sprite.position.x, this.sprite.position.y, iconPos.x3, iconPos.y)
    let d4 = dist(this.sprite.position.x, this.sprite.position.y, iconPos.x4, iconPos.y)
    console.log(d1)
    if (d1 < iconPos.dist){
      $(`#email`).addClass("iconshovered");
      emailHovered = true
    }
    else{
      $(`#email`).removeClass("iconshovered");
      emailHovered = false
    }
    if (d2 < iconPos.dist){
      $(`#food`).addClass("iconshovered");
      foodHovered = true
    }
    else{
      $(`#food`).removeClass("iconshovered");
      foodHovered = false
    }
    if (d3 < iconPos.dist){
      $(`#garden`).addClass("iconshovered");
      gardenHovered = true
    }
    else{
      $(`#garden`).removeClass("iconshovered");
      gardenHovered = false
    }
    if (d4 < iconPos.dist){
      $(`#social`).addClass("iconshovered");
      socialHovered = true
    }
    else{
      $(`#social`).removeClass("iconshovered");
      socialHovered = false
    }
  }

  interactWithIcon(){
    if (emailHovered === true && keyCode === 16){
      $(`#email`).trigger("click")
    }
    if (foodHovered === true && keyCode === 16){
      $(`#food`).trigger("click")
    }
    if (gardenHovered === true && keyCode === 16){
      $(`#garden`).trigger("click")
    }
    if (socialHovered === true && keyCode === 16){
      $(`#social`).trigger("click")
    }
  }

}
