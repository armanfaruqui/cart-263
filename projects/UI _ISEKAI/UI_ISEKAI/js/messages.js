$("#aki").on("click", function(){
  $(".contacts").addClass("hide")
  $("akiH2").addClass("hide")
  akiChat();

})
function akiChat(){
  $(document).ready(function () {

       //include the js
       $(".bubble__wrapper").convo({
           headerTopColor: "#f00",
           pageColor: "linear-gradient(to right, #83a4d4, #b6fbff)",
           data: aki,
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
