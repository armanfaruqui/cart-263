/**
Da Vinci!
*/
"use strict";


$(`#solved`).dialog({
  autoOpen: false,
  buttons: {
    "I know.": function(){
      $(this).dialog(`close`);
    }
  }
});

highlightableText();

$(`#answer`).droppable({
  drop: function(event, ui){
    let letter = ui.draggable.text();
    $(this).append(letter);
    ui.draggable.draggable(`disable`);
    ui.draggable.removeClass(`found`);
    if ($(this).text() === `Theremin`) {
      $(`#solved`).dialog(`open`);
      winSound(); // PLay sound when the correct word is entered
    }
    else if ($(this).text() === `hermiT`){
      $(`#poem`).animate({
        "top": "800px" // Words fall off page when secret word is entered
      }, 2000)
    }
  }
});


$(`#reset`).on(`click`, function(event){
  bark()
  $(`#answer`).empty(); // Clears the answer text box
  highlightableText();
  $(`.secret`).draggable(`enable`);
})

function highlightableText(){
  $(`.secret`).one(`mouseover`, function(event){
    $(this).addClass(`found`, 500);
    $(this).draggable({
      helper: `clone`,
      draggable: `enable`
    });
  });
}

function bark(){
  let bark = new Audio('assets/sounds/bark.wav');
  bark.play()
}

function winSound(){
  let ting = new Audio('assets/sounds/ting.wav');
  ting.play()
}
