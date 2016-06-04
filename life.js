$(document).ready(function() {

  var length = prompt("What length grid would you like?");


/* Generates a grid for the given length               */
/* Allows the user to designate cells as dead or alive */
  for (index = 0; index < length; index += 1) {
    $("#board").append("<tr id=\"" + index + "\">");

    for (index2 = 0; index2 < length; index2 += 1) {
      $("#" + index).append("<td class=\" dead " + index2 +"\"></td>");
      $("#" + index + " ." + index2).on("click", function() {
        if($(this).hasClass("dead")) {
          $(this).removeClass("dead");
          $(this).addClass("alive");
        }else {
          $(this).removeClass("alive");
          $(this).addClass("dead");
        }
      });
    }

    $("#board").append("</tr>");
  };
/* End generate grid  */


function display_board(board) {
  for (index = 0; index < length; index += 1) {

    for (index2 = 0; index2 < length; index2 += 1) {
      if(board[index][index2][0] === "0") {
        $("#" + index + " ." + index2).removeClass("alive").addClass("dead");
      } else {
        $("#" + index + " ." + index2).removeClass("dead").addClass("alive");
      }

    }
}





}); /* End $(document).ready */
