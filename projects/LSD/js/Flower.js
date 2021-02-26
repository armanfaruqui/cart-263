let flower; // object variable
let petal = {
  up: undefined,
  upRight: undefined,
  right: undefined,
  downRight: undefined,
  down: undefined,
  downLeft: undefined,
  left: undefined,
  upLeft: undefined,
  pistil: undefined,
  stem: undefined
}

let distance = []

class Flower {
  constructor(petal){

  }

  displayFlower(){
    if (scene === "flower"){
      let upX = 620
      let upY = 215
      let uprX = 665
      let uprY = 260
      let riX = 680
      let riY = 350
      let dorX = 665
      let dorY = 400
      let doX = 610
      let doY = 410
      let dolX = 515
      let dolY = 390
      let leX = 485
      let leY = 345
      let uplX = 528
      let uplY = 255

      push()
      image(petal.stem, 575, 390);
      image(petal.up, upX, upY);
      image(petal.upRight, uprX, uprY);
      image(petal.right, riX, riY);
      image(petal.downRight, dorX, dorY);
      image(petal.down, doX, doY);
      image(petal.downLeft, dolX, dolY);
      image(petal.left, leX, leY);
      image(petal.upLeft, uplX, uplY);
      image(petal.pistil, 615, 345);
      pop()
    }
  }

  checkDistanceFromPetal(){
    if (scene === "flower"){
      let upD = dist(upX, upY, mouseX, mouseY)
      let uprD = dist(uprX, uprY, mouseX, mouseY)
      let riD = dist(riX, riY, mouseX, mouseY)
      let dorD = dist(dorX, dorY, mouseX, mouseY)
      let doD = dist(doX, doY, mouseX, mouseY)
      let dolD = dist(dolX, dolY, mouseX, mouseY)
      let leD = dist(leX, leY, mouseX, mouseY)
      let uplD = dist(uplX, uplY, mouseX, mouseY)
    }
  }
}
