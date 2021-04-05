let rpg; // Object variable
let rpgBackground // Image var for the background in the canvas
let sign // Var for the sprite of the sign

let iconPos = { // Position variables for the application icons. 5 x values for the 5 columns and 2 y values for the 2 rows
  x1: 250,
  x2: 647,
  x3: 1017,
  x4: 448,
  x5: 863,
  y1: 289,
  y2: 508,
  dist: 130, // Distance between user sprite and icon for interactions between the 2 to take place
  moveTime: 1000 // Time in milliseconds for icon animation
}

// Booleans used to check if the user is hovering the application icons with their mouse or sprite
let emailHovered = false;
let foodHovered = false;
let gardenHovered = false;
let socialHovered = false;
let newsHovered = false;

class RPG_Home extends RPG_Sprite {
  constructor(rpgBackground, sign) {
    super(user);
    sign.sprite = createSprite(840, 250)
    sign.sprite.addAnimation("sign", sign)
    sign.sprite.setCollider("rectangle", 0, 0, 20, 10)
  }
  display(){
    push()
    image(rpgBackground, 0, 0)
    pop()
  }
  // Sets the walls/boundaries that the user's sprite shouldn't be able to walk through
  boundaries(){
    // Borders of the map
  if (this.sprite.position.x < 115) this.sprite.position.x = 115;
  if (this.sprite.position.y < 120) this.sprite.position.y = 120;
  if (this.sprite.position.x > 1155) this.sprite.position.x = 1155;
  if (this.sprite.position.y > 625) this.sprite.position.y = 625;
  // Sign sprite
  this.sprite.collide(sign.sprite); // Collides with the user sprite
  if (this.sprite.position.y > sign.sprite.position.y) sign.sprite.depth = 0 // Sign should be displayed below the user sprite if they are infront of it
  if (this.sprite.position.y < sign.sprite.position.y) sign.sprite.depth = 2 // Sign should be displayed below the user sprite if they are behind it
  }

  runningAwayIcons(icon, posX, posY){
    if (focused === true){ // Checks if focused mode is enabled
      let d = dist(this.sprite.position.x, this.sprite.position.y, posX, posY) // Checks distance between user sprite and icon
      if (d < iconPos.dist + 5){
        if (this.sprite.position.x < posX && !$(`#${icon}`).hasClass("shiftRight")){
          $(`#${icon}`).addClass("shiftRight")
        }
      }
    }
  }

}
