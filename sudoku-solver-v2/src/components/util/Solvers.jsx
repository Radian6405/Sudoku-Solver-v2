import { isValidCell } from "./Helpers";

export function solveBoard(Board) {
  //initalizing the grid to solve with all possible options(1 to size)
  let Grid = { ...Board };
  for (let i = 0; i < Grid.size; i++) {
    for (let j = 0; j < Grid.size; j++) {
      if (!Grid[i][j].isLocked) {
        Grid[i][j].value = 0;
        Grid[i][j].options = Array.from(
          { length: Board.size },
          (_, i) => i + 1
        );
      }
    }
  }

  //main solve loop
  while (!isSolved(Grid)) {
    let isModified = false;

    //modifies all cell possibilities
    for (let i = 0; i < Board.size; i++) {
      for (let j = 0; j < Board.size; j++) {
        if (Grid[i][j].value === 0 && modifyCellOptions(Grid, i, j)) {
          isModified = true;
        }
      }
    }

    //multiple solve methods applied
    if (cellSolve(Grid)) continue;
    if (rowSolve(Grid)) continue;
    if (colSolve(Grid)) continue;
    if (subgridSolve(Grid)) continue;

    //all prev solve methods fail
    if (!isModified) break;
  }

  //finally solved by backtracking
  if (!isSolved(Grid)) {
    //starts backtracking from first cell
    backtrackSolve(Grid, 0, 0);
  }

  return Grid;
}

//solve functions
function cellSolve(Grid) {
  //looks for naked single cells and solves them
  let isModified = false;

  for (let i = 0; i < Grid.size; i++) {
    for (let j = 0; j < Grid.size; j++) {
      if (Grid[i][j].value === 0 && Grid[i][j].options.length === 1) {
        Grid[i][j].value = Grid[i][j].options[0];
        delete Grid[i][j].options;

        isModified = true;
      }
    }
  }

  return isModified;
}
function rowSolve(Grid) {
  //looks for hidden single cells in each row and solves them

  //numCount array stores number of occurances of a number in a row in the corresponding location of the array
  //example: if 2 is at index 4, number 5 (4+1) occurs 2 times only
  let isModified = false;

  for (let i = 0; i < Grid.size; i++) {
    let numCount = Array.from({ length: Grid.size }, (_, i) => 0); //generates array of 0s of required size
    //fills up numCount array with appropriate count for each number
    for (let j = 0; j < Grid.size; j++) {
      if (Grid[i][j].value === 0) {
        Grid[i][j].options.map((num) => {
          numCount[num - 1]++;
          return num;
        });
      }
    }

    const index = numCount.indexOf(1); //finding if any number occurs only once
    if (index !== -1) {
      //finding which cell has the single number
      for (let j = 0; j < Grid.size; j++) {
        if (
          Grid[i][j].value === 0 &&
          Grid[i][j].options.indexOf(index + 1) !== -1
        ) {
          Grid[i][j].value = index + 1;
          delete Grid[i][j].options;

          isModified = true;
        }
      }
    }
  }

  return isModified;
}
function colSolve(Grid) {
  //looks for hidden single cells in each column and solves them

  //numCount array stores number of occurances of a number in a column in the corresponding location of the array
  //example: if 2 is at index 4, number 5 (4+1) occurs 2 times only
  let isModified = false;

  for (let i = 0; i < Grid.size; i++) {
    let numCount = Array.from({ length: Grid.size }, (_, i) => 0); //generates array of 0s of required size
    //fills up numCount array with appropriate count for each number
    for (let j = 0; j < Grid.size; j++) {
      if (Grid[j][i].value === 0) {
        Grid[j][i].options.map((num) => {
          numCount[num - 1]++;
          return num;
        });
      }
    }

    const index = numCount.indexOf(1); //finding if any number occurs only once
    if (index !== -1) {
      //finding which cell has the single number
      for (let j = 0; j < Grid.size; j++) {
        if (
          Grid[j][i].value === 0 &&
          Grid[j][i].options.indexOf(index + 1) !== -1
        ) {
          Grid[j][i].value = index + 1;
          delete Grid[j][i].options;

          isModified = true;
        }
      }
    }
  }

  return isModified;
}
function subgridSolve(Grid) {
  //looks for hidden single cells in each subgrid and solves them

  //numCount array stores number of occurances of a number in a subgrid in the corresponding location of the array
  //example: if 2 is at index 4, number 5 (4+1) occurs 2 times only
  let isModified = false;

  for (let i = 0; i < Grid.size; i += Grid.subdiv) {
    for (let j = 0; j < Grid.size; j += Grid.subdiv) {
      let numCount = Array.from({ length: Grid.size }, (_, i) => 0); //generates array of 0s of required size
      //fills up numCount array with appropriate count for each number
      for (let k = i; k < i + Grid.subdiv; k++) {
        for (let l = j; l < j + Grid.subdiv; l++) {
          if (Grid[k][l].value === 0) {
            Grid[k][l].options.map((num) => {
              numCount[num - 1]++;
              return num;
            });
          }
        }
      }
      //   console.log(numCount);

      const index = numCount.indexOf(1); //finding if any number occurs only once
      if (index !== -1) {
        //finding which cell has the single number
        for (let k = i; k < i + Grid.subdiv; k++) {
          for (let l = j; l < j + Grid.subdiv; l++) {
            if (
              Grid[k][l].value === 0 &&
              Grid[k][l].options.indexOf(index + 1) !== -1
            ) {
              Grid[k][l].value = index + 1;
              delete Grid[k][l].options;

              isModified = true;
            }
          }
        }
      }
    }
  }

  return isModified;
}
function backtrackSolve(Grid, row, col) {
  //backtracks from first cell to last cell

  if (col === Grid.size) {
    if (row === Grid.size - 1) return true;
    row++;
    col = 0;
  }

  //finding unsolved cells
  if (Grid[row][col].value !== 0) {
    return backtrackSolve(Grid, row, col + 1);
  }

  //main logic
  for (let i = 0; i < Grid[row][col].options.length; i++) {
    let num = Grid[row][col].options[i];
    if (isValidCell(Grid, [row, col], num).isValid) {
      Grid[row][col].value = num;
      if (backtrackSolve(Grid, row, col + 1)) return true;
    }
    //backing out of recursion
    Grid[row][col].value = 0;
  }

  return false; //should never happen in a solvable sudoku
}

//helper functions
function modifyCellOptions(Grid, row, col) {
  //modifies cell options for a particular cell
  let isModified = false;

  //removing options in
  //row
  for (let i = 0; i < Grid.size; i++) {
    const index = Grid[row][col].options.indexOf(Grid[row][i].value);
    if (index !== -1) {
      Grid[row][col].options.splice(index, 1);
      isModified = true;
    }
  }

  //column
  for (let i = 0; i < Grid.size; i++) {
    const index = Grid[row][col].options.indexOf(Grid[i][col].value);
    if (index !== -1) {
      Grid[row][col].options.splice(index, 1);
      isModified = true;
    }
  }

  //smaller grid
  const rnew = row - (row % Grid.subdiv);
  const cnew = col - (col % Grid.subdiv);
  for (let i = rnew; i < rnew + Grid.subdiv; i++) {
    for (let j = cnew; j < cnew + Grid.subdiv; j++) {
      const index = Grid[row][col].options.indexOf(Grid[i][j].value);
      if (index !== -1) {
        Grid[row][col].options.splice(index, 1);
        isModified = true;
      }
    }
  }

  return isModified;
}
function isSolved(Grid) {
  //checks if Grid is solved

  const solveSum = (Grid.size * (Grid.size + 1)) / 2;

  // row verify
  for (let i = 0; i < Grid.size; i++) {
    let sum = 0;
    for (let j = 0; j < Grid.size; j++) {
      sum += Grid[i][j].value;
    }
    if (sum !== solveSum) return false;
  }

  //column verify
  for (let i = 0; i < Grid.size; i++) {
    let sum = 0;
    for (let j = 0; j < Grid.size; j++) {
      sum += Grid[j][i].value;
    }
    if (sum !== solveSum) return false;
  }

  //smaller grid verify
  for (let i = 0; i < Grid.size; i += Grid.subdiv) {
    for (let j = 0; j < Grid.size; j += Grid.subdiv) {
      let sum = 0;
      for (let k = i; k < i + Grid.subdiv; k++) {
        for (let l = j; l < j + Grid.subdiv; l++) {
          sum += Grid[k][l].value;
        }
      }
      if (sum !== solveSum) return false;
    }
  }

  //default case
  return true;
}
