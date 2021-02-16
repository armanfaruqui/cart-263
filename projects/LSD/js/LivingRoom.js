// Object containing asset variables for the scene. lr short for living room*
let lrConfig = {
manOnCouch: undefined,
manOnCouchStill: undefined,
table: undefined,
clock: undefined,
wallWindow: undefined,
man: undefined,
closeUp: undefined,
lsdTab: undefined,
crackle: undefined,
songSection1: undefined,
clockReal: undefined
}

//Object containing variables for the LSD Tab
let tab = {
  x: 250,
  y: 640,
  vx: 0,
  vy: 0,
  ax: 0,
  ay: 0,
  accelaration: 0.5,
  maxspeed: 5,
  distanceFromMouse: undefined,
  move: false, // Checks whether tab should move
  onTongue: false, // Checks if tab is on the man's tongue
};

let showRealClock = false

class LivingRoom {
  constructor(lrConfig) {}

  display() {
    if (scene === "livingRoom") {
      if (tab.onTongue === false){
        animation(lrConfig.clock, 1080, 140); // Clock
        animation(lrConfig.table, 115, 670); // Table next to couch
        animation(lrConfig.wallWindow, 470, 175); // Window with moon
        animation(lrConfig.manOnCouch, 800, 570); // Man lying on couch + couch
    }
      else if(tab.onTongue === true){
        if (showRealClock === false){
          animation(lrConfig.clock, 1080, 140); // Clock
        }
        else {
          image(lrConfig.clockReal, 980, 65, 205, 158)
        }
        animation(lrConfig.table, 114, 670); // Table next to couch
        animation(lrConfig.wallWindow, 470, 175); // Window with moon
        imageMode(CENTER)
        image(lrConfig.manOnCouchStill, 800, 570)  // Man lying on couch + couch
      }
  }

    if (scene === "closeUp") {
      animation(lrConfig.closeUp, 730, 390); // Animation of man's face and hand
      push();
      imageMode(CENTER);
      image(lrConfig.lsdTab, tab.x, tab.y, 110, 100); // Image of LSD tab
      pop();
    }

    if (
      (!lrConfig.crackle.isPlaying() && scene === "livingRoom") ||
      (!lrConfig.crackle.isPlaying() && scene === "closeUp")
    ) {
      lrConfig.crackle.loop(); // Background sound for the scene
    }
  }
  // Switches scene from the living room to a close up of the man's face when the user hovers over his face
  switchScene() {
    if (
      scene === "livingRoom" &&
      mouseX > 1132 &&
      mouseY > 338 &&
      mouseX < 1239 &&
      mouseY < 435
    ) {
      scene = "closeUp";
    }
  }
  // Attatches the LSD Tab to the user's mouse when hovered over, and drops it on the man's tongue when its hovered over.
  moveAcidTab() {
    // Tab can be moved once the user hovers over it
    tab.distanceFromMouse = dist(mouseX, mouseY, tab.x, tab.y);
    if (tab.distanceFromMouse < 30) {
      tab.move = true;
    }

    if (scene === "closeUp" && tab.move === true) {
      if (mouseX < tab.x) {
        tab.ax = -tab.accelaration; // Negative horizontal accelaration value if tab is right of mouse
      } else {
        tab.ax = tab.accelaration; // Positive horizontal accelaration value if tab is left of mouse
      }
      if (mouseY < tab.y) {
        tab.ay = -tab.accelaration; // Negative vertical accelaration value if tab is above mouse
      } else {
        tab.ay = tab.accelaration; // Positive vertical accelaration value if tab is below mouse
      }
      // Accelaration properties of the tab
      tab.vx = tab.vx + tab.ax;
      tab.vx = constrain(tab.vx, -tab.maxspeed, tab.maxspeed); // Limits horizontal speed
      tab.vy = tab.vy + tab.ay;
      tab.vy = constrain(tab.vy, -tab.maxspeed, tab.maxspeed); // Limits vertical speed
      // Moves the tab
      tab.x = tab.x + tab.vx;
      tab.y = tab.y + tab.vy;
    }
  }

  switchScene2() {
    // Tab gets stuck on the man's tongue when it comes into contact with it
    if (scene === "livingRoom" || scene === "closeUp"){
      if (
        tab.x > 630 &&
        tab.x < 700 &&
        tab.y > 520 &&
        tab.y < 550
      ) {
        lrConfig.crackle.stop()
        tab.onTongue = true;
        tab.move = false; // Stops the tab from moving
        playSongSection(lrConfig.songSection1, 30000) // Plays the first section of the song
        setTimeout(function(){scene = "livingRoom"}, 7000); // Switches scene from 'close up' back to 'living room'
      }
    }
  }

  changeFurniture(){
    if (tab.onTongue === true){
      setTimeout(function(){showRealClock = true}, 16500)
    }
  }

}
