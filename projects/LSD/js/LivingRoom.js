// Asset variables
let manOnCouch;
let table;
let clock;
let wallWindow;
let man;
let closeUp;
let crackle; // Sound for scene

class LivingRoom {
  constructor(manOnCouch, table, clock, wallWindow, closeUp) {

  }

  display() {
    if (scene === "livingRoom") {
      animation(clock, 900, 70) // Clock
      animation(table, -80, 600) // Table next to couch
      animation(wallWindow, 100, 70) // Window with moon
      animation(manOnCouch, 600, 480, 100, 100) // Man lying on couch + couch
    }

    if (scene === "closeUp"){
      animation(closeUp, 550, 330)
    }

    if (!crackle.isPlaying() && scene === "livingRoom" || !crackle.isPlaying() && scene === "closeUp") {
      crackle.loop() // Background sound for the scene
    }
  }

  switchScene(){
    if (scene === "livingRoom" && mouseX > 1132 && mouseY > 338 && mouseX < 1239 && mouseY < 435){
      scene = "closeUp"
    }
  }
}
