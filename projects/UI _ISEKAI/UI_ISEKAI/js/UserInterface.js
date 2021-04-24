// This object controls the user interface elements which are global to the entire simulation, such as focused mode and draw mode

let ui; // Object Variable

let focused = true; // Boolean used to toggle 'focused' mode
let musicPlaying = false;

class UserInterface {
  constructor(song){}

  // Toggles 'focused' mode on click
  focused(){
    if (focused === false){
      $(`.focus`).click(function(event){
        $(this).removeClass(`focus`)
        $(this).addClass(`focused`)
        focused = true
      })
    }
    else if (focused === true){
      $(`.focused`).click(function(event){
        $(this).removeClass(`focused`)
        $(this).addClass(`focus`)
        focused = false
      })
    }
  }

  // Toggles 'focused' mode on click
  music(){
    if (musicPlaying === false){
      $(`.music`).click(function(event){
        $(this).removeClass(`music`)
        $(this).addClass(`musicPlaying`)
        musicPlaying = true
      })
    }
    else if (musicPlaying === true){
      $(`.musicPlaying`).click(function(event){
        $(this).removeClass(`musicPlaying`)
        $(this).addClass(`music`)
        musicPlaying = false
      })
    }
  }

}
