let rpg; // Object variable
let rpgBackground; // Image var for the background in the canvas
let sign; // Var for the sprite of the sign
let introDialogShown = false; // Boolean which checks if intro dialog box has been displayed to the user

let iconPos = {
  // Position variables for the application icons. 5 x values for the 5 columns and 2 y values for the 2 rows
  x1: 250,
  x2: 647,
  x3: 1017,
  x4: 448,
  x5: 863,
  y1: 289,
  y2: 508,
  dist: 130, // Distance between user sprite and icon for interactions between the 2 to take place
  moveTime: 1000, // Time in milliseconds for icon animation
};

let shifted = {
  right: false,
  left: false,
  up: false,
  down: false,
};

// Booleans used to check if the user is hovering the application icons with their mouse or sprite
let liHovered = false;
let foodHovered = false;
let gardenHovered = false;
let socialHovered = false;
let messagesHovered = false;

class RPG_Home extends RPG_Sprite {
  constructor(rpgBackground, sign) {
    super(user);
    sign.sprite = createSprite(840, 250); // Creates sprite of sign
    sign.sprite.addAnimation("sign", sign);
    sign.sprite.setCollider("rectangle", 0, 0, 20, 10); // Makes the sign collideable
  }
  display() {
    push();
    image(rpgBackground, 0, 0);
    pop();
  }
  // Sets the walls/boundaries that the user's sprite shouldn't be able to walk through
  boundaries() {
    // Borders of the map
    if (this.sprite.position.x < 115) this.sprite.position.x = 115;
    if (this.sprite.position.y < 120) this.sprite.position.y = 120;
    if (this.sprite.position.x > 1155) this.sprite.position.x = 1155;
    if (this.sprite.position.y > 625) this.sprite.position.y = 625;
    // Sign sprite
    this.sprite.collide(sign.sprite); // Collides with the user sprite
    if (this.sprite.position.y > sign.sprite.position.y) sign.sprite.depth = 0; // Sign should be displayed below the user sprite if they are infront of it
    if (this.sprite.position.y < sign.sprite.position.y) sign.sprite.depth = 2; // Sign should be displayed below the user sprite if they are behind it
  }

  runningAwayGarden(icon, posX, posY) {
    if (focused === true) {
      // Checks if focused mode is enabled
      let d = dist(this.sprite.position.x, this.sprite.position.y, posX, posY); // Checks distance between user sprite and icon
      if (d < iconPos.dist - 20) {
        if (this.sprite.position.x < posX && shifted.right === false) {
          $(`#${icon}`).animate(
            {
              right: "75px",
            },
            1000
          );
          shifted.right = true;
          shifted.left = false;
        } else if (this.sprite.position.x < posX && shifted.left === false) {
          $(`#${icon}`).animate(
            {
              right: "405",
            },
            1000
          );
          shifted.left = true;
          shifted.right = false;
        } else if (this.sprite.position.y > posY && shifted.down === false) {
          $(`#${icon}`).animate(
            {
              top: "-20px",
            },
            1000
          );
          shifted.down = true;
          shifted.up = false;
        } else if (this.sprite.position.y < posY && shifted.up === false) {
          $(`#${icon}`).animate(
            {
              top: "310px",
            },
            1000
          );
          shifted.up = true;
          shifted.down = false;
        }
      }
    } else {
      $(`#${icon}`).animate(
        {
          top: "145px",
          right: "240px",
        },
        1000
      );
      shifted.up = false;
      shifted.down = false;
      shifted.left = false;
      shifted.right = false;
    }
  }
  // Initializes both the dialog boxes
  initializeDialogueBoxes() {
    // Dialog box from interacting with the sign
    $("#dialogSign").dialog({
      autoOpen: false,
      minWidth: 600,
    });
    // Intro dialog box
    if (introDialogShown === false) {
      // Shows if the user has not seen it
      $("#introDialog").dialog({
        minWidth: 900,
        modal: true,
        buttons: {
          "Lesss gooooo": function () {
            $(this).dialog("close");
            introDialogShown = true;
            localStorage.setItem(
              `intro data`,
              JSON.stringify(introDialogShown)
            ); // Stores the fact that introDialogShown is true
          },
        },
      });
    }
  }
  // Called in setup to check whether the user has already seen the intro message. If they have, it prevents it from being displayed
  checkIfIntroDialogShouldDisplay() {
    introDialogShown = JSON.parse(localStorage.getItem(`intro data`));
    if (introDialogShown === null) {
      introDialogShown = false;
    }
    if (introDialogShown === true) {
      $("#introText").addClass("hidden");
    }
  }
}
