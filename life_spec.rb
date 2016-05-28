require 'rspec'
require_relative 'life'


describe "init_grid" do
  it "should create an array" do
    expect(init_grid(5)).to be_a Array
  end

  it "should return an array with the proper length" do
    expect(init_grid(20).length).to eq 20
  end

end

describe "count_living_neighbors" do

  it "should return an integer" do
    board = [[0, 1, 0],[0, 1, 1],[1, 0, 0]]
    expect(count_living_neighbors("11", board)).to be_a Fixnum
  end

  it "should return correct number of living neighbors" do
    board = [["01", "11", "01"],["01", "11", "11"],["11", "01", "01"]]
    expect(count_living_neighbors("11", board)).to eq 3
  end

  it "should return correct numbers for corners" do
    board = [["01", "11", "01"],
             ["01", "11", "11"],
             ["11", "01", "01"]]
    expect(count_living_neighbors("00", board)).to eq 2
    expect(count_living_neighbors("02", board)).to eq 3
    expect(count_living_neighbors("22", board)).to eq 2
    expect(count_living_neighbors("20", board)).to eq 1
  end

  it "should return correct numbers for sides" do
    board = [["01", "11", "01"],
             ["01", "11", "11"],
             ["11", "01", "01"]]
    expect(count_living_neighbors("10", board)).to eq 3
    expect(count_living_neighbors("01", board)).to eq 2
    expect(count_living_neighbors("12", board)).to eq 2
    expect(count_living_neighbors("21", board)).to eq 3
  end

end

describe "mark_board" do
  it "should return an array" do
    board = [["01", "11", "01"],
             ["01", "11", "11"],
             ["11", "01", "01"]]
    expect(mark_board(board)).to be_a Array
  end

  it "should designate dying cells to die" do
    board = [["01", "11", "01"],
             ["01", "01", "11"],
             ["11", "01", "01"]]
    expect(mark_board(board)[2][0]).to eq "10"
    expect(mark_board(board)[0][1]).to eq "10"
  end
end
