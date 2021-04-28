// This object controls the user interface elements which are global to the entire simulation, such as focused mode and draw mode

let ui; // Object Variable
let focused = true; // Boolean used to toggle 'focused' mode
let musicPlaying = false; // Boolean that checks if the music is playing

class UserInterface {
  constructor(song){}
  // Called in every js file's setup to figure out the state of the focused and music buttons
  initialize(){
    let focusedData = JSON.parse(localStorage.getItem(`focused data`));
    let musicData = JSON.parse(localStorage.getItem(`music data`));
    if (focusedData === false){ // focused default value is true. So if the user makes it false, its new default value is false
      $(`.focused`).addClass(`focus`) // Changes the the relevant classes so the button's display matches its boolean value
      $(`.focus`).removeClass(`focused`)
      focused = false
    }
    if (musicData === true){ // musicPlaying's default value is false. So if the user makes it true, its new default value is true
      $(`.music`).addClass(`musicPlaying`) // Changes the the relevant classes so the button's display matches its boolean value
      $(`.musicPlaying`).removeClass(`music`)
      musicPlaying = true
    }
  }
  // Toggles 'focused' mode on click
  focused(){
    if (focused === false){
      $(`.focus`).click(function(event){
        $(this).removeClass(`focus`)
        $(this).addClass(`focused`)
        focused = true
        localStorage.setItem(`focused data`, JSON.stringify(focused))
      })
    }
    else if (focused === true){
      $(`.focused`).click(function(event){
        $(this).removeClass(`focused`)
        $(this).addClass(`focus`)
        focused = false
        $("#notification").removeClass("hidden") // Shows the notification prompting the user to click on the messages app
        setTimeout(function(){$("#notification").animate({
          "opacity": 0
        })}, 5000) // Fades the notification out after 5 seconds
        localStorage.setItem(`focused data`, JSON.stringify(focused))
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
        if (!song.isPlaying()){
          song.loop();
        }
        localStorage.setItem(`music data`, JSON.stringify(musicPlaying))
      })
    }
    else if (musicPlaying === true){
      $(`.musicPlaying`).click(function(event){
        $(this).removeClass(`musicPlaying`)
        $(this).addClass(`music`)
        musicPlaying = false
        song.stop();
        localStorage.setItem(`music data`, JSON.stringify(musicPlaying))
      })
    }
  }
}
