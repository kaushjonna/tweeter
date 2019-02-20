$(document).ready(function () {

  console.log("Ready!");

  $("#tweet-input-textarea").on('keyup', function (e) {
    var text = $("#tweet-input-textarea").val();
    var charCount = 140 - (text.length);
    $(this).siblings("#counterVal").text(charCount);

    if (charCount < 0) {
      $(this).siblings("#counterVal").css({ "color": "red" });
    } else {
      $(this).siblings("#counterVal").css({ "color": "black" });
    }
  });

});

