"use strict";

/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = "red"; // active player: 1 or 2
let board; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  let row = Array(WIDTH);
  row.fill(null);
  board = Array(HEIGHT);
  board.fill(row);
}



/** makeHtmlBoard: make HTML table and row of column tops. */





function makeHtmlBoard() {
// TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  const htmlBoard = document.getElementById("board");

  //creates the top buttons for selecting column where the piece will be put
  let top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  //creates columns for board and sets id to the current col number
  for (var x = 0; x < WIDTH; x++) {
    var headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);

  // dynamically creates the main part of html board
  // uses HEIGHT to create table rows
  // uses WIDTH to create table cells for each row
  for (let y = 0; y < HEIGHT; y++) {
    // TODO: Create a table row element and assign to a "row" variable
    let rowElement = document.createElement("tr");

    for (let x = 0; x < WIDTH; x++) {
      // TODO: Create a table cell element and assign to a "cell" variable
      let cellElement = document.createElement("td");
      // TODO: add an id, y-x, to the above table cell element
      // you'll use this later, so make sure you use y-x
      cellElement.setAttribute("id", `${y}-${x}`)
      // TODO: append the table cell to the table row
      rowElement.append(cellElement);
    }
      // TODO: append the row to the html board
      htmlBoard.append(rowElement);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

//
function



















function findSpotForCol(x) {
  //iterate over board object, backwards
  for(let row=board.length-1; row>=0; row--){
    if(board[row][x] === null){
      board[row][x] = 1;
      return row;
    }
  }
  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  let piece = document.createElement("div");
  piece.classList.add("piece", currPlayer);
  let place = document.getElementById(`${y}-${x}`);
  place.append(piece);
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
}

/** handleClick: handle click of column top to play piece */

function checkBoardFull(){
  for(let row of board){
    //if any element is null, return false
    if(row.some( (elem) => elem === null )){
      return false;
    }
  }
  return true;
}

function handleClick(evt) {
  // get x from ID of clicked cell
  var x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  var y = findSpotForCol(x);
  //whole column is full
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  placeInTable(y, x);

  //check for board full
  if( checkBoardFull() ) {
    return endGame('Tie!');
  }

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame

  // switch players
  // TODO: switch currPlayer 1 <-> 2
  if(currPlayer === "red"){
    currPlayer = "blue";
  }
  else {
    currPlayer = "red";
  }
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {

  /** _win:
   * takes input array of 4 cell coordinates [ [y, x], [y, x], [y, x], [y, x] ]
   * returns true if all are legal coordinates for a cell & all cells match
   * currPlayer
   */
  function _win(cells) {

    // TODO: Check four cells to see if they're all legal & all color of current
    // player

  }

  // using HEIGHT and WIDTH, generate "check list" of coordinates
  // for 4 cells (starting here) for each of the different
  // ways to win: horizontal, vertical, diagonalDR, diagonalDL
  for (var y = 0; y < HEIGHT; y++) {
    for (var x = 0; x < WIDTH; x++) {
      // TODO: assign values to the below variables for each of the ways to win
      // horizontal has been assigned for you
      // each should be an array of 4 cell coordinates:
      // [ [y, x], [y, x], [y, x], [y, x] ]

      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      let vert;
      let diagDL;
      let diagDR;

      // find winner (only checking each win-possibility as needed)
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
