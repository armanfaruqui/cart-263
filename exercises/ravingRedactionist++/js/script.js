"use-strict";

let redactedCounter = 0; // Keeps count of number of clicks to redact each phrase
let secretInfoShown = false;

setInterval(revealedListener, 100);
setInterval(revelation, 500);
setInterval(gameOver, 100);
setInterval(secretInfo, 100);

function revealedListener() {
  // Checks for clicks on the revealed spans
  $(`.revealed`).on(`click`, redact);
}

function redact(event) {
  $(this).removeClass("revealed");
  $(this).addClass("redacted");
  redactedCounter += 1;
}

function revelation() {
  $(`.redacted`).each(attemptReveal);
}

function attemptReveal() {
  let r = Math.random();
  if (r < 0.1) {
    $(this).fadeOut(2000, function () {
      $(this).removeClass("redacted");
    });
    $(this).fadeIn(1000, function () {
      $(this).addClass("revealed");
    });
  }
}

function secretInfo() { // Displays another <p> of text
  console.log(redactedCounter);
  if (redactedCounter > 300 && secretInfoShown === false) {
    $(`#secret-document`).append(
      "<p> This document actually is just made up of placeholder text to distract y'all. Better luck next time Mr Putin </p>"
    );
    secretInfoShown = true;
  }
}

function gameOver() {
  // Displays an alert when all the information is revealed
  let numItems = $(`.revealed`).length;
  if (numItems === 5) {
    alert(`This document is all over TMZ`);
  }
}
