$(document).ready(function() {

  var length = prompt("How long?");


/* Generates a grid for the given length               */
/* Allows the user to designate cells as dead or alive */
  for (i = 0; i < length; i += 1) {
    $("#board").append("<tr id=\"" + i + "\">");

    for (i2 = 0; i2 < length; i2 += 1) {
      $("#" + i).append("<td class=\" dead " + i2 +"\"></td>");
      $("#" + i + " ." + i2).on("click", function() {
        if ($(this).hasClass("dead")) {
          $(this).removeClass("dead");
          $(this).addClass("alive");
        } else {
          $(this).removeClass("alive");
          $(this).addClass("dead");
        }
      });
    }

    $("#board").append("</tr>");
  };
/* End generate grid                    */
/* ************************************ */


});
