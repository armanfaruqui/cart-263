// In charge of the functioning of the messages page

"use-strict"

startAkiChat();

function startAkiChat(){
  $("#aki").on("click", function(){
    $(".contacts").addClass("hide")
    $("akiH2").addClass("hide")
    akiChat();
  })
}

// Copy pasted from https://github.com/chrismuiruriz/ConvoJs to start the messag conversation interaction
function akiChat(){
  $(document).ready(function () {


       $(".bubble__wrapper").convo({
           headerTopColor: "#f00",
           pageColor: "linear-gradient(to right, #83a4d4, #b6fbff)",
           data: aki, // Defines the variable used in messageData.js
           inputCharLimit: 50
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

function endChat(){
  let attr = $(".cui_option slide-up").attr("data-path")
  if (attr === "block__"){
    $(".cui_option").one("click", function(){
      console.log("cheese")
    })
  }
}
