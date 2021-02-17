let scene2;

let s2Config = {
  zip: undefined
}

let zip = {
y: 80,
width: 20,
height: 8,
x1: 684 - 20,
x2: 684 + 20,
teethY: 20
}

class Scene2 {
  constructor(s2Config){

  }

  display(){
    if (scene === "scene2"){
      camera.zoom = 1 // Resets the camera zoom
      camera.position.x = 684 // Resets the camera's x position
      camera.position.y = 401 // Resets the camera's x position

      push()
      imageMode(CENTER)
      image(s2Config.zip, width/2, zip.y)
      noFill()
      stroke(255)
      strokeWeight(3)
      beginShape();
      curveVertex(0, height);
      curveVertex(200, 0);
      curveVertex(width/2, zip.y - 60);
      curveVertex(width/2, height)
      endShape();
      beginShape();
      curveVertex(width, height);
      curveVertex(width - 200, 0);
      curveVertex(width/2, zip.y - 60);
      curveVertex(width/2, height)
      endShape();
      pop()
    }
  }

  zipperTeeth(){
    push()
    fill(180, 0, 0)
    rectMode(CENTER)
    if (scene === "scene2"){
      for(let i = 0; i < 100; i++){
        rect(zip.x1, zip.teethY, zip.width, zip.height)
        zip.teethY = zip.teethY + zip.height
        rect(zip.x2, zip.teethY, zip.width, zip.height)
        
      }
    }
    pop()
  }

}
