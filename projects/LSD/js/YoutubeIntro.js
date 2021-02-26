let youtubeIntro // Object variable
let youtubeScreen // Asset variable

class YoutubeIntro {
  constructor(youtubeScreen){

  }
  // Displays the youtube screen. Zooms into the video when true is assigned to start simulation
  display(){
    if (scene === "intro") {
      image(youtubeScreen, 0, 0, windowWidth, windowHeight);
      if (startSimulation === true) {
        if (camera.zoom < 1.8) {
          camera.zoom = camera.zoom + 0.009; // Camera zooming
        }
        if (camera.position.x > 480) {
          camera.position.x = camera.position.x - 2.3; // Camera panning
        } else {
          scene = "livingRoom"; // Switches scene once the zooming and panning is finished
          camera.zoom = 1; // Resets the camera zoom
          camera.position.x = 684; // Resets the camera's x position
          camera.position.y = 401; // Resets the camera's x position
        }
        if (camera.position.y > 320) {
          // Camera tilting
          camera.position.y = camera.position.y - 1;
        }
      }
    }
  }
  // Assigns true to startSimulation to begin the zoom effect
  startSimulation(){
    if (
      scene === "intro" &&
      mouseX > 25 &&
      mouseX < 913 &&
      mouseY > 78 &&
      mouseY < 574
    ) {
      startSimulation = true;
    }
  }
}
