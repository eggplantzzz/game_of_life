



def create_new_board()
  puts "How long would you like the board to be?"
  board_length = (gets.chomp).to_i
  init_board(board_length)
end

# def render_board(board)
#   board_length = board.length
#   for i in 1..board.length
#     puts board[i - 1]
#   end
# end

# Sets up an array to model the board for the game
# Takes the board length as a parameter and returns an array
def init_board(length)
  i = 0
  board = []

  while (i < length)

    i2 = 0
    board[i] = []

    while (i2 < length)

      board[i][i2] = "00"
      i2 += 1

    end
    i += 1

  end
  board

end


# Analyzes a given cell to determine whether it will live or die
# in the next stage according to how many live cells surround it
# Takes in a 2 char string(2 non negative integers) and a board (array)
# Returns the number of living neighbors
def count_living_neighbors(coord, board)
  count = 0

  # Parse the string coord into integer coordinates
  x = coord[0].to_i
  y = coord[1].to_i

  # If it is not an edge cell
  if !(x == 0 ||
       y == 0 ||
       x == (board.length - 1) ||
       y == (board.length - 1))

    # Count living neighbors clockwise from top-left using variable count
    if (board[x - 1][y - 1])[0] == "1"
      count = count + 1
    end

    if (board[x - 1][y])[0] == "1"
      count = count + 1
    end

    if (board[x - 1][y + 1])[0] == "1"
      count = count + 1
    end

    if (board[x][y + 1])[0] == "1"
       count = count + 1
    end

    if (board[x + 1][y + 1])[0] == "1"
      count = count + 1
    end

    if (board[x + 1][y])[0] == "1"
      count = count + 1
    end

    if (board[x + 1][y - 1])[0] == "1"
      count = count + 1
    end

    if (board[x][y - 1])[0] == "1"
      count = count + 1
    end

  # If it is an edge piece
  else
    # Top-left corner
    if (x == 0 && y == 0)
      # Count living neighbors clockwise from the adjacent cell to the right
      if (board[x][y + 1])[0] == "1"
         count = count + 1
      end

      if (board[x + 1][y + 1])[0] == "1"
        count = count + 1
      end

      if (board[x + 1][y])[0] == "1"
        count = count + 1
      end

    # Top-right corner
    elsif (x == 0 && y == (board.length - 1))
      if (board[x + 1][y])[0] == "1"
         count = count + 1
      end

      if (board[x + 1][y - 1])[0] == "1"
        count = count + 1
      end

      if (board[x][y - 1])[0] == "1"
        count = count + 1
      end

    # Bottom-right corner
    elsif (x == (board.length - 1) && y == (board.length - 1))
      if (board[x][y - 1])[0] == "1"
         count = count + 1
      end

      if (board[x - 1][y - 1])[0] == "1"
        count = count + 1
      end

      if (board[x - 1][y])[0] == "1"
        count = count + 1
      end

    # Bottom-left corner
    elsif (x == (board.length - 1) && y == 0)
      if (board[x -1][y])[0] == "1"
         count = count + 1
      end

      if (board[x - 1][y + 1])[0] == "1"
        count = count + 1
      end

      if (board[x][y + 1])[0] == "1"
        count = count + 1
      end

    # Left side
    elsif y == 0
      if (board[x - 1][y])[0] == "1"
        count = count + 1
      end

      if (board[x - 1][y + 1])[0] == "1"
        count = count + 1
      end

      if (board[x][y + 1])[0] == "1"
         count = count + 1
      end

      if (board[x + 1][y + 1])[0] == "1"
        count = count + 1
      end

      if (board[x + 1][y])[0] == "1"
        count = count + 1
      end

    # Top side
    elsif x == 0
      if (board[x][y + 1])[0] == "1"
        count = count + 1
      end

      if (board[x + 1][y + 1])[0] == "1"
        count = count + 1
      end

      if (board[x + 1][y])[0] == "1"
         count = count + 1
      end

      if (board[x + 1][y - 1])[0] == "1"
        count = count + 1
      end

      if (board[x][y - 1])[0] == "1"
        count = count + 1
      end

    # Right side
    elsif y == (board.length - 1)
      if (board[x - 1][y - 1])[0] == "1"
        count = count + 1
      end

      if (board[x - 1][y])[0] == "1"
        count = count + 1
      end

      if (board[x + 1][y])[0] == "1"
        count = count + 1
      end

      if (board[x + 1][y - 1])[0] == "1"
        count = count + 1
      end

      if (board[x][y - 1])[0] == "1"
        count = count + 1
      end
    # Otherwise bottom side
    else
      if (board[x - 1][y - 1])[0] == "1"
        count = count + 1
      end

      if (board[x - 1][y])[0] == "1"
        count = count + 1
      end

      if (board[x - 1][y + 1])[0] == "1"
        count = count + 1
      end

      if (board[x][y + 1])[0] == "1"
         count = count + 1
      end

      if (board[x][y - 1])[0] == "1"
        count = count + 1
      end

    end
  end
  count
end


# Iterates through the board and calls count_living_neighbors to mark cells
# for death or life
def mark_board(board)
  i = 0
  while (i < board.length)

    i2 = 0

    while (i2 < board.length)
      if (board[i][i2][0] == "1" &&
          count_living_neighbors(i.to_s + i2.to_s, board) < 2)
        board[i][i2][1] = "0"
      elsif (board[i][i2][0] == "1" &&
            (count_living_neighbors(i.to_s + i2.to_s, board) == 2 ||
             count_living_neighbors(i.to_s + i2.to_s, board) == 3))
        board[i][i2][1] = "1"
      elsif (board[i][i2][0] == "1" &&
             count_living_neighbors(i.to_s + i2.to_s, board) > 3)
        board[i][i2][1] = "0"
      elsif (board[i][i2][0] == "0" &&
             count_living_neighbors(i.to_s + i2.to_s, board) == 3)
        board[i][i2][1] = "1"
      end
      i2 += 1
    end
    i += 1

  end
  board
end


# # Iterates through the board and sets the cells to alive or dad
def next_stage(board)
  i = 0
  while (i < board.length)
    i2 = 0
    while (i2 < board.length)
      if board[i][i2][1] == "0"
        board[i][i2][0] = "0"
      elsif board[i][i2][1] == "1"
        board[i][i2][0] = "1"
      end
      i2 += 1
    end
    i += 1
  end
  board
end

# again = true
# def run(board, length)
#   mark_board(board)
#   next_stage(board)
# end

# while again? do
#   puts "Next stage? y/n"
#   y_n = gets.chomp
#   if y_n == "y"
#     run(grid, board_length)
#   else
#     again? = false
#   end
# end
