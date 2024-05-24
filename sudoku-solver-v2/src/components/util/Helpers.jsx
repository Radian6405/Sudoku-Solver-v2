import EasyBoards from "../../../public/easy.json";
import MediumBoards from "../../../public/medium.json";
import HardBoards from "../../../public/hard.json";

export function initBoard(size) {
  // returns basic empty board
  
  let Board = {};
  for (let i = 0; i < size; i++) {
    Board[i] = {};
    for (let j = 0; j < size; j++) {
      Board[i][j] = { value: 0, isLocked: false, isError: false };
    }
  }
  Board["isLocked"] = false;
  Board["size"] = size;
  Board["subdiv"] = Math.floor(Math.sqrt(size));
  return Board;
}

//cell checker functions
export function isValidCell(Board, loc, num) {
  //ignoring when clear is pressed 
  if (num === 0) return { isValid: true };

  //row check
  for (let i = 0; i < Board.size; i++) {
    if (Board[loc[0]][i].value === num && i !== loc[1])
      return { isValid: false, row: loc[0], col: i };
  }
  //column check
  for (let i = 0; i < Board.size; i++) {
    if (Board[i][loc[1]].value === num && i !== loc[0])
      return { isValid: false, row: i, col: loc[1] };
  }
  //smaller grid check
  const rnew = loc[0] - (loc[0] % Board.subdiv);
  const cnew = loc[1] - (loc[1] % Board.subdiv);
  for (let i = rnew; i < rnew + 3; i++) {
    for (let j = cnew; j < cnew + 3; j++) {
      if (Board[i][j].value === num && i !== loc[0] && j !== loc[1])
        return { isValid: false, row: i, col: j };
    }
  }

  //default
  return { isValid: true };
}
export function showError(Board, check, cell) {
  //updates board with error cells

  //removes all erros initially
  let newBoard = { ...Board };
  for (let i = 0; i < Board.size; i++) {
    for (let j = 0; j < Board.size; j++) {
      newBoard[i][j].isError = false;
    }
  }

  //when clear or valid number is pressed
  if (check.isValid) {
    newBoard.isLocked = false;
    return newBoard;
  }
  //adds errors based on check and current cell
  newBoard[check["row"]][check["col"]].isError = true;
  newBoard[cell[0]][cell[1]].isError = true;
  newBoard.isLocked = true;

  return newBoard;
}

//loader functions
export function loadSudoku(difficulty, size) {
  let Board = initBoard(size);
  let sudoku = getSudokuData(difficulty);

  //loads data into board object
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      Board[i][j].value = sudoku[i * 9 + j];
      if (Board[i][j].value !== 0) Board[i][j].isLocked = true;
    }
  }

  return Board;
}

function getSudokuData(difficulty) {
  //loads json data
  switch (difficulty) {
    case "easy":
      return EasyBoards[Math.round(Math.random() * 1000)];
    case "medium":
      return MediumBoards[Math.round(Math.random() * 1000)];
    case "hard":
      return HardBoards[Math.round(Math.random() * 1000)];
    default:
      return {};
  }
}
