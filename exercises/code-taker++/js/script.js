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
    }
  }
});


$(`#reset`).on(`click`, function(event){
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
