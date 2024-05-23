export function initBoard(size) {
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

export function isValidCell(Board, loc, num) {
  if (num === 0) return { isValid: true };

  for (let i = 0; i < Board.size; i++) {
    if (Board[loc[0]][i].value === num && i !== loc[1])
      return { isValid: false, row: loc[0], col: i };
  }
  for (let i = 0; i < Board.size; i++) {
    if (Board[i][loc[1]].value === num && i !== loc[0])
      return { isValid: false, row: i, col: loc[1] };
  }

  const rnew = loc[0] - (loc[0] % Board.subdiv);
  const cnew = loc[1] - (loc[1] % Board.subdiv);

  for (let i = rnew; i < rnew + 3; i++) {
    for (let j = cnew; j < cnew + 3; j++) {
      if (Board[i][j].value === num && i !== loc[0] && j !== loc[1])
        return { isValid: false, row: i, col: j };
    }
  }
  return { isValid: true };
}
export function showError(Board, check, cell) {
  let newBoard = { ...Board };
  for (let i = 0; i < Board.size; i++) {
    for (let j = 0; j < Board.size; j++) {
      newBoard[i][j].isError = false;
    }
  }

  if (check.isValid) {
    newBoard.isLocked = false;
    return newBoard;
  }

  newBoard[check["row"]][check["col"]].isError = true;
  newBoard[cell[0]][cell[1]].isError = true;
  newBoard.isLocked = true;
  return newBoard;
}
