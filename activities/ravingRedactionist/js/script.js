"use-strict"

setInterval(revealedListener, 100)
setInterval(revelation, 500);
setInterval(gameOver, 100);

function revealedListener(){
  $(`.revealed`).on(`click`, redact);
}

function redact(event){
  $(this).removeClass('revealed');
  $(this).addClass('redacted');
}

function revelation(){
  $(`.redacted`).each(attemptReveal);
}

function attemptReveal(){
  let r=Math.random();
  if (r< 0.1){
    $(this).fadeOut(2000, function(){
      $(this).removeClass('redacted')
    })
    $(this).fadeIn(1000, function(){
      $(this).addClass('revealed');
    })
  }
}

function gameOver(){
  let numItems = $(`.revealed`).length;
  if (numItems === 5){
    alert(`This document is all over TMZ`)
  }
}
