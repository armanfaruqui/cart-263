// Asset variables
let manOnCouch;
let table;
let clock;
let wallWindow;
let man;

class LivingRoom {
  constructor(manOnCouch, table, clock, wallWindow) {
    if (scene === "livingRoom") {
      man.sprite = createSprite(500, 500); // Initializes a sprite
      man.sprite.addAnimation("manOnCouch", manOnCouch); // Adds the preloaded animation(s)
      man.sprite.depth = 1; // Depth determines the order in which sprites are displayed. Sprites with higher depths are drawn on top of sprites with lower depths
      man.sprite.changeAnimation("manOnCouch"); // Decides which animation should be displayed since sprites can hold multiple
    }
  }

  display() {
    drawSprites()
  }
}
