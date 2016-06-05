$(document).ready(function() {


  $(".start").on("click", start);
  $(".next_stage").on("click", next_stage);


  var length = parseInt(prompt("What size grid would you like?"));

  /* Initializes the array and view */
  function start() {

    init_board(parseInt(length));

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
    };  /* End view generation  */
  } /* End start */


  /* Sets up an array to model the board for the game
  * Takes the board length as a parameter and returns an array
  * A 2 element denotes a cells current state and its next state
  * The first element is its current state and the second is its
  * next state.  "0" for dead and "1" for live */
  function init_board(length) {
    var index = 0;
    var board = [];

    while(index < length) {
      var index2 = 0;
      board[index] = [];

      while(index2 < length) {

        /* Initialize all cells to be dead */
        board[index][index2] = ["0", "0"];
        index2 += 1;

      }
        index += 1;
    }
    return board;
  } /* End init_board function */

  /* Reads the html and syncs the array with it */
  /* Sig: Takes in a length and returns an array */
  function set_array_from_html(length) {
    var board = init_board(length);

    var index = 0;

    while(index < board.length) {
      var index2 = 0;

      while(index2 < board.length) {
        if($("#" + index + " ." + index2).hasClass("alive")) {
          board[index][index2] = ["1", "0"];
        }else {
          board[index][index2] = ["0", "0"];
        }
        index2 += 1;
      }
      index += 1;
    }
    return board;
  } /* End set_array_from_html function */


  /* Progresses to the next life stage
  * Sets the array from the current html state, then calculates
  * the status of cells for the next stage. Then it changes the
  * cells current status to the next stage and updates the UI */
  function next_stage() {

    var board = set_array_from_html(length);
    board = mark_board(board);
    board = mark_next_stage(board);
    set_html_from_array(board);
  } /* End next_stage function */

  /* Iterates through the board and calls count_living_neighbors to mark cells
  * for death or life */
  function mark_board(board) {
    var index = 0;

    while(index < board.length) {
      var index2 = 0;

      while(index2 < board.length) {

        if(board[index][index2][0] === "1" &&
           (count_living_neighbors([index, index2], board) < 2 ||
           count_living_neighbors([index, index2], board) > 3)) {
          board[index][index2][1] = "0";

        }else if(board[index][index2][0] === "1" &&
                 (count_living_neighbors([index, index2], board) === 2 ||
                 count_living_neighbors([index, index2], board) === 3)) {
          board[index][index2][1] = "1";

        }else if(board[index][index2][0] === "0" &&
                 count_living_neighbors([index, index2], board) === 3) {
          board[index][index2][1] = "1";
        }
        index2 += 1;
      }
      index += 1;
    }
    return board
  } /* End mark_board function */

  /* Counts the number of living neighbors for a cell.
  * Takes in a 2 element array (integer strings)
  * and a board (array)
  * Returns the number of living neighbors */
  function count_living_neighbors(coord, board) {
    var count = 0;

    /* Set x and y to coordinates */
    var x = coord[0];
    var y = coord[1];

    /* If it is not an edge cell */
    if (!(x === 0 ||
        y === 0 ||
        x === (board.length - 1) ||
        y === (board.length - 1))) {

      /* Count living neighbors clockwise from upper left cell */
      if(board[x - 1][y - 1][0] === "1" ) {
        count += 1;
      }
      if(board[x - 1][y][0] === "1") {
        count += 1;
      }
      if(board[x - 1][y + 1][0] === "1") {
        count += 1;
      }
      if(board[x][y + 1][0] === "1") {
        count += 1;
      }
      if(board[x + 1][y + 1][0] === "1" ) {
        count += 1;
      }
      if(board[x + 1][y][0] === "1") {
        count += 1;
      }
      if(board[x + 1][y - 1][0] === "1") {
        count += 1;
      }
      if(board[x][y - 1][0] === "1") {
        count += 1;
      }
    /* Otherwise the cell is on the edge of the board */
    } else {
      /* Upper left corner */
      if(x === 0 && y === 0) {
        /* Count clockwise from the right cell */
        if(board[x][y + 1][0] === "1") {
          count += 1;
        }
        if(board[x + 1][y + 1][0] === "1" ) {
          count += 1;
        }
        if(board[x + 1][y][0] === "1") {
          count += 1;
        }
      /* Upper right corner */
      }else if(x === 0 && y == (board.length - 1)) {
        /* Count clockwise from lower cell */
        if(board[x + 1][y][0] === "1") {
          count += 1;
        }
        if(board[x + 1][y - 1][0] === "1") {
          count += 1;
        }
        if(board[x][y - 1][0] === "1") {
          count += 1;
        }
      /* Lower right corner */
      }else if(x === (board.length - 1) && y === (board.length - 1)) {
        /* Count clockwise from left cell */
        if(board[x][y - 1][0] === "1") {
          count += 1;
        }
        if(board[x - 1][y - 1][0] === "1" ) {
          count += 1;
        }
        if(board[x - 1][y][0] === "1") {
          count += 1;
        }
      /* Lower left corner cell */
      }else if(x === (board.length - 1) && y === 0) {
        /* Count clockwise from right */
        if(board[x][y + 1][0] === "1") {
          count += 1;
        }
        if(board[x - 1][y][0] === "1") {
          count += 1;
        }
        if(board[x - 1][y + 1][0] === "1") {
          count += 1;
        }
      /* Left side */
      }else if( y === 0) {
        /* Count clockwise from upper cell */
        if(board[x - 1][y][0] === "1") {
          count += 1;
        }
        if(board[x - 1][y + 1][0] === "1") {
          count += 1;
        }
        if(board[x][y + 1][0] === "1") {
          count += 1;
        }
        if(board[x + 1][y + 1][0] === "1" ) {
          count += 1;
        }
        if(board[x + 1][y][0] === "1") {
          count += 1;
        }
      /* Upper side */
      }else if(x === 0) {
        /* Count clockwise from right cell */
        if(board[x][y + 1][0] === "1") {
          count += 1;
        }
        if(board[x + 1][y + 1][0] === "1" ) {
          count += 1;
        }
        if(board[x + 1][y][0] === "1") {
          count += 1;
        }
        if(board[x + 1][y - 1][0] === "1") {
          count += 1;
        }
        if(board[x][y - 1][0] === "1") {
          count += 1;
        }
      /* Right side */
      }else if(y === (board.length - 1)) {
        /* Count clockwise from lower cell */
        if(board[x + 1][y][0] === "1") {
          count += 1;
        }
        if(board[x + 1][y - 1][0] === "1") {
          count += 1;
        }
        if(board[x][y - 1][0] === "1") {
          count += 1;
        }
        if(board[x - 1][y - 1][0] === "1" ) {
          count += 1;
        }
        if(board[x - 1][y][0] === "1") {
          count += 1;
        }
      /* Otherwise lower side */
      }else {
        /* Count clockwise from left side */
        if(board[x][y - 1][0] === "1") {
          count += 1;
        }
        if(board[x - 1][y - 1][0] === "1" ) {
          count += 1;
        }
        if(board[x - 1][y][0] === "1") {
          count += 1;
        }
        if(board[x - 1][y + 1][0] === "1") {
          count += 1;
        }
        if(board[x][y + 1][0] === "1") {
          count += 1;
        }
      }
    }
    return count
  }; /* End count_living_neighbors function */


  /* Sets the next stage of life */
  /* Takes in an array and returns an array */
  function mark_next_stage(board) {

    var index = 0;

    while(index < board.length) {
      var index2 = 0;

      while(index2 < board.length) {
        if(board[index][index2][1] === "0") {
          board[index][index2][0] = "0";
        }else {
          board[index][index2][0] = "1";
        }
        index2 += 1;
      }
      index += 1;
    }
    return board;
  } /* End mark_next_stage function */

  /* Renders the current board state */
  function set_html_from_array(board) {
    var index = 0;

    while(index < board.length) {
      var index2 = 0;

      while(index2 < board.length) {
        if(board[index][index2][0] === "0") {
          $("#" + index + " ." + index2).removeClass("alive").addClass("dead");
        } else {
          $("#" + index + " ." + index2).removeClass("dead").addClass("alive");
        }
      index2 +=1
      }
    index += 1;
    }
  }   /* End set_html_from_array function */

  /* Testing */
  // start();

}); /* End $(document).ready */
