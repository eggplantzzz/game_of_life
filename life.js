$(document).ready(function() {


  $(".reset").on("click", start);
  $(".next_stage").on("click", nextStage);

  var LENGTH = 23;

  /* Initializes the array and view */
  function start() {

    $("#board").html("");

    initBoard(parseInt(LENGTH));

    /* Generates a grid                                    */
    /* Allows the user to designate cells as dead or alive */
    for (index = 0; index < LENGTH; index += 1) {
      $("#board").append("<tr id=\"" + index + "\">");

      for (index2 = 0; index2 < LENGTH; index2 += 1) {
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
  }     /* End start            */


  /* Sets up an array to model the board for the game
  * Takes the board length as a parameter and returns an array
  * A 2 element denotes a cells current state and its next state
  * The first element is its current state and the second is its
  * next state.  "0" for dead and "1" for live */
  function initBoard(LENGTH) {
    var index = 0;
    var board = [];

    while(index < LENGTH) {
      var index2 = 0;
      board[index] = [];

      while(index2 < LENGTH) {

        /* Initialize all cells to be dead */
        board[index][index2] = ["0", "0"];
        index2 += 1;

      }
        index += 1;
    }
    return board;
  } /* End initBoard function */

  /* Reads the html and syncs the array with it  */
  /* Sig: Takes in a length and returns an array */
  function setArrayFromHTML(LENGTH) {
    var board = initBoard(LENGTH);

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
  function nextStage() {

    var board = setArrayFromHTML(LENGTH);
    board = calculateAndSetNextStage(board);
    board = markBoardAndSetHTML(board);
  } /* End nextStage function */

  /* Iterates through the board and calls count_living_neighbors to mark cells
* for death or life */
  function calculateAndSetNextStage(board) {

    var index = 0;

    while(index < board.length) {
      var index2 = 0;

      while(index2 < board.length) {
        var living_neighbors = count_living_neighbors([index, index2], board)

        if(board[index][index2][0] === "1" && (living_neighbors < 2 || living_neighbors > 3)) {
          board[index][index2][1] = "0";
        }else if(board[index][index2][0] === "1" && (living_neighbors === 2 || living_neighbors === 3)) {
          board[index][index2][1] = "1";
        }else if(board[index][index2][0] === "0" && living_neighbors === 3) {
          board[index][index2][1] = "1";
        }
        index2 += 1;
      }
      index += 1;
    }
    return board
  } /* End calculateAndSetNextStage function */


  /* Iterates through the board and calls count_living_neighbors to mark cells
  * for death or life */
  function markBoardAndSetHTML(board) {
    var index = 0;

    while(index < board.length) {
      var index2 = 0;

      while(index2 < board.length) {

        if(board[index][index2][1] === "0") {
          board[index][index2][0] = "0";
          $("#" + index + " ." + index2).removeClass("alive").addClass("dead");
        }else {
          board[index][index2][0] = "1";
          $("#" + index + " ." + index2).removeClass("dead").addClass("alive");
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

  /* Initializes board on the display */
  start(LENGTH);

}); /* End $(document).ready */
