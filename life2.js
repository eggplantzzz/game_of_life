
/* Sets up an array to model the board for the game
* Takes the board length as a parameter and returns an array
* A 2 digit string denotes a cells current state and its next state
* "0" for dead and "1" for live */
function init_board(length) {
  var index = 0;
  var board = [];

  while(index < length) {
    var index2 = 0;
    board[index] = [];

    while(index2 < length) {

      /* Initialize all cells to be dead */
      board[index][index2] = "00";
      index2 += 1;

    }
      index += 1;
  }
  return board;
} /* End init_board function */



/* Counts the number of living neighbors for a cell.
* Takes in a 2 char string(2 non negative integers) and a board (array)
* Returns the number of living neighbors */
function count_living_neighbors(coord, board) {
  var count = 0;

  /* Parse the string coord into integer coordinates */
  var x = parseInt(coord[0]);
  var y = parseInt(coord[1]);

  /* If it is not an edge cell */
  if !(x === 0 ||
       y === 0 ||
       x === (board.length - 1) ||
       y === (board.length - 2)) {

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


/* Iterates through the board and calls count_living_neighbors to mark cells
* for death or life */
function mark_board(board) {
  var index = 0;

  while(index < board.length) {
    var index2 = 0;

    while(index2 < board.length) {
      if(board[index][index2][0] === "1" &&
         count_living_neighbors(String(index) + String(index2), board) < 2 ||
         count_living_neighbors(String(index) + String(index2) > 3, board)) {
        board[index][index2][1] = "0";
      }else if(board[index][index2][0] === "1" &&
               count_living_neighbors(String(index) + String(index2) === 2, board) ||
               count_living_neighbors(String(index) + String(index2) === 3, board)) {
        board[index][index2][1] = "1";
      }else if(board[index][index2][0] === "0" &&
               count_living_neighbors(String(index) + String(index2) === 3, board)) {
        board[index][index2][1] = "1";
      }
    }
  }
} /* End mark_board function */


/* Sets the next stage of life */
function set_next_stage(board) {
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
} /* End set_next_stage function */
