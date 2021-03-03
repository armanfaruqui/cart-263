// This scene displays animations showing a man lying down on a couch in what appears to be his living room. When the user hovers over his face, we get a close up of his face with a tab of LSD on his finger. When the user hovers over the tab it begins to follow the mouse. Once the tab touches the user's tongue, it sticks in place and begins to play the song 'L$D'. After a short duration we zoom back out to the living room. The furniture in the room begins to change and the camera begins to tilt upwards before the scene changes.

let livingRoom; // Object variable
let switchToJuggle = false // Boolean which changed to true when the scene should be switched to juggle
// Object containing asset variables for the scene. lr short for living room*
let lrAssets = {
  manOnCouch: undefined, // Animation
  manOnCouchStill: undefined, // Image
  table: undefined, // Animation
  clock: undefined, // Animation
  wallWindow: undefined, // Animation
  man: undefined, // Animation
  closeUp: undefined, // Animation
  lsdTab: undefined, // Image
  crackle: undefined, // Sound effect
  clockReal: undefined, // Animation
  wallWindowReal: undefined, // Animation
  tableReal: undefined, // Image
  icecream: undefined, // Animation
};

// Y position of images/gifs stored for the simulateCameraTilt() function
let yPos = {
  clock: 65,
  window: 175,
  table: 570,
  icecream: 550,
  manOnCouch: 570,
};

//Object containing variables for the LSD Tab
let tab = {
  x: 240,
  y: 660,
  vx: 0, // Horizontal movement
  vy: 0, // Vertical movement
  ax: 0, // Horizontal accelaration
  ay: 0, // Vertical Accelaration
  accelaration: 0.5, // Accelaration value
  maxspeed: 5, // Max speed used to constrain the movement
  distanceFromMouse: undefined, // Distance between tab and mouse
  move: false, // Checks whether tab should move
  moved: false, // Checks if the tab has been moved onto the users tongue yet
  onTongue: false, // Checks if tab is on the man's tongue
};

let showRealClock = false;
let showRealWindow = false;
let showRealTable = false;

let startTilt = false;
let speed = 1.5;

class LivingRoom {
  constructor(lrAssets) {}

  display() {
    if (scene === "livingRoom") {
      if (tab.onTongue === false) {
        animation(lrAssets.clock, 1080, 140); // Clock
        animation(lrAssets.table, 115, 670); // Table next to couch
        animation(lrAssets.wallWindow, 470, 175); // Window with moon
        animation(lrAssets.manOnCouch, 800, 570); // Man lying on couch + couch
      } else if (tab.onTongue === true) {
        if (showRealClock === false) {
          animation(lrAssets.clock, 1080, 140); // Clock
        } else {
          image(lrAssets.clockReal, 980, yPos.clock, 205, 158);
        }
        if (showRealTable === false) {
          animation(lrAssets.table, 114, 670); // Table next to couch
        } else {
          image(lrAssets.tableReal, -70, yPos.table, 340, 230);
          image(lrAssets.icecream, -10, yPos.icecream, 200, 140);
        }
        if (showRealWindow === false) {
          animation(lrAssets.wallWindow, 470, 175); // Window with moon
        } else {
          imageMode(CENTER);
          image(lrAssets.wallWindowReal, 470, yPos.window, 290, 290);
        }
        imageMode(CENTER);
        image(lrAssets.manOnCouchStill, 800, yPos.manOnCouch); // Man lying on couch + couch
      }
    }

    if (scene === "closeUp") {
      animation(lrAssets.closeUp, 730, 390); // Animation of man's face and hand
      push();
      imageMode(CENTER);
      image(lrAssets.lsdTab, tab.x, tab.y, 71.5, 65); // Image of LSD tab
      pop();
    }

    if (
      !lrAssets.crackle.isPlaying() &&
      scene === "livingRoom" &&
      scene !== "zipper"
    ) {
      lrAssets.crackle.loop(); // Background sound for the scene
    }
  }
  // Switches the scene
  switchScene() {
    if (
      scene === "livingRoom" &&
      mouseX > 1132 &&
      mouseY > 338 &&
      mouseX < 1239 &&
      mouseY < 435
    ) {
      scene = "closeUp"; // Switches scene from the living room to a close up of the man's face when the user hovers over his face
    }
    if (scene === "livingRoom" && tab.onTongue === true) {
      setTimeout(function () {
        startTilt = true;
      }, 14000); // Switches a boolean variable to allow simulateCameraTilt() to run
    }
    if (yPos.window > 950 && scene === "livingRoom") { // Switches scene when all the objects are off the screen
      scene = "zipper";
      lrAssets.crackle.stop()
    }
  }
  // Attatches the LSD Tab to the user's mouse when hovered over, and drops it on the man's tongue when its hovered over.
  moveAcidTab() {
    // Tab can be moved once the user hovers over it
    if (tab.moved === false){
      tab.distanceFromMouse = dist(mouseX, mouseY, tab.x, tab.y);
      if (tab.distanceFromMouse < 30) {
        tab.move = true;
      }
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

  startTrip() {
    // Tab gets stuck on the man's tongue when it comes into contact with it
    if (scene === "livingRoom" || scene === "closeUp") {
      if (
        tab.x > 630 &&
        tab.x < 700 &&
        tab.y > 520 &&
        tab.y < 550 // Checks if the tab is within the tongue's dimensions
      ) {
        lrAssets.crackle.stop(); // Crackling sound stops
        tab.onTongue = true;
        tab.move = false; // Stops the tab from moving
        tab.moved = true;
        if (songPlaying !== 2) {
          //
          playSong(96000); // Plays the first section of the song
        }
        setTimeout(function () {
          scene = "livingRoom";
        }, 7000); // Switches scene from 'close up' back to 'living room' after 7 seconds
        setTimeout(function () {
          switchToJuggle = true;
        }, 80000); // Assigns true to a boolean which switches the scene to the juggle scene after 1 min 20 seconds. This should occur during the matrix scene
      }
    }
  }

  // Changes boolean variables which effect which affect which images/GIFs should be displayed in this object's display function
  changeFurniture() {
    if (tab.onTongue === true) {
      setTimeout(function () {
        showRealClock = true;
      }, 16500);
      setTimeout(function () {
        showRealTable = true;
      }, 17000);
      setTimeout(function () {
        showRealWindow = true;
      }, 17800);
    }
  }
  // Simulates the effect of the camera tilting upwards
  // I was originally using the p5.play camera function to create this effect, but it ended up causing immense stutter
  simulateCameraTilt() {
    if (scene === "livingRoom" && startTilt === true) {
      yPos.clock += speed;
      yPos.table += speed;
      yPos.manOnCouch += speed;
      yPos.icecream += speed;
      yPos.window += speed;
    }
  }
}
