

grid = []

grid_next_state = []

puts "Length?"
board_length = gets.chomp

def init_grid(length, board)
  i = 0
  while (i < length)

    i2 = 0
    board << []

    while (i2 < length)

      board[i2] << "00"
      i2 += 1

    end

    i += 1

  end

  board

end

def decide_fate(coord)

  
