// In charge of the functioning of the messages page

"use-strict";

let song; // Variable for the playable song

function preload() {
  song = loadSound(`assets/sounds/song.mp3`);
}

function setup() {
  let ui = new UserInterface(song);
  ui.initialize();
}

startAkiChat();
startMusaChat();

function draw() {
  ui.focused();
  ui.music();
}

//(Condensing these functions into one with a parameter returns an error)
// Click event listener to begin chat with Aki
function startAkiChat() {
  $("#aki").on("click", function () {
    $(".contacts").addClass("hide");
    $("akiH2").addClass("hide");
    akiChat();
  });
}
// Click event listener to begin chat with Musa
function startMusaChat() {
  $("#musa").on("click", function () {
    $(".contacts").addClass("hide");
    $("musaH2").addClass("hide");
    musaChat();
  });
}

// Copy pasted from https://github.com/chrismuiruriz/ConvoJs to start the messag conversation interaction
function akiChat() {
  $(document).ready(function () {
    $(".bubble__wrapper").convo({
      headerTopColor: "#f00",
      pageColor: "linear-gradient(to right, #83a4d4, #b6fbff)",
      data: aki, // Defines the variable used in messageData.js
      inputCharLimit: 50,
    });

    //we need this for contentEditable placeholder
    $("[contenteditable]").focusout(function () {
      var element = $(this);
      if (!element.text().trim().length) {
        element.empty();
      }
    });
  });
}

function musaChat() {
  $(document).ready(function () {
    $(".bubble__wrapper").convo({
      headerTopColor: "#f00",
      pageColor: "linear-gradient(to right, #83a4d4, #b6fbff)",
      data: musa, // Defines the variable used in messageData.js
      inputCharLimit: 50,
    });

    //we need this for contentEditable placeholder
    $("[contenteditable]").focusout(function () {
      var element = $(this);
      if (!element.text().trim().length) {
        element.empty();
      }
    });
  });
}

function endChat() {
  let attr = $(".cui_option slide-up").attr("data-path");
  if (attr === "block__") {
    $(".cui_option").one("click", function () {
      console.log("cheese");
    });
  }
}
