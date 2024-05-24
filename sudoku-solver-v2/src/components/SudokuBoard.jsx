import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import {
  initBoard,
  isValidCell,
  loadSudoku,
  showError,
} from "./util/Helpers";

function Board({ activeCell, setActiveCell, currentNum, setCurrentNum }) {
  const size = 9;
  const emptyBoard = initBoard(size);

  const [Board, setBoard] = useState(emptyBoard);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    //loads sudoku based on parameters in url
    
    if (
      //PS: i cant figure out what searchParams returns when there are no params so this has to do
      searchParams.get("difficulty") === "easy" ||
      searchParams.get("difficulty") === "medium" ||
      searchParams.get("difficulty") === "hard"
    ) {
      setBoard(loadSudoku(searchParams.get("difficulty"), size));
    }
  }, [searchParams]);

  useEffect(() => {
    //updates board when current num changes
    if (
      currentNum !== -1 &&
      activeCell.length !== 0 &&
      !Board[activeCell[0]][activeCell[1]].isLocked
    ) {
      //validity check for cells
      let check = isValidCell(Board, activeCell, currentNum);
      updateBoard(currentNum, activeCell[0], activeCell[1]);
      setBoard(showError(Board, check, activeCell));
    }
  }, [currentNum]);

  function updateBoard(num, row, col) {
    //updates board by creating a new board
    var newBoard = { ...Board };
    newBoard[row][col].value = num;
    setBoard(newBoard);
  }

  function changeActiveCell(row, col) {
    //changes active cell
    activeCell[0] === row && activeCell[1] === col
      ? setActiveCell([]) //if current active cell is same as new
      : setActiveCell([row, col]);

    setCurrentNum(-1);
  }

  return (
    <>
      <div
        className="bg-darkbg  border-2 border-text text-text 
                      size-min flex flex-col"
      >
        {/* rows */}
        {[...Array(size).keys()].map((_, i) => {
          return (
            <div key={i} className="flex flex-row gap-0">
              {/* columns */}
              {[...Array(size).keys()].map((_, j) => {
                return (
                  // cells
                  <Cell
                    key={size * i + j}
                    row={i}
                    col={j}
                    cell={Board[i][j]}
                    size={size}
                    isActive={
                      activeCell.length !== 0 &&
                      activeCell[0] === i &&
                      activeCell[1] === j
                    }
                    onClick={() => {
                      if (!Board.isLocked) changeActiveCell(i, j);
                    }}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </>
  );
}

function Cell({ row, col, cell, size, onClick, isActive }) {
  const subdiv = Math.floor(Math.sqrt(size));

  return (
    <div
      className={"size-[3.5rem] flex items-center justify-center text-3xl select-none hover:cursor-pointer"
        //sudoku board border logic
        .concat(" ", col % subdiv === subdiv - 1 && !isActive && " border-r-2")
        .concat(" ", col % subdiv === 0 && !isActive && " border-l-2")
        .concat(" ", row % subdiv === subdiv - 1 && !isActive && " border-b-2")
        .concat(" ", row % subdiv === 0 && !isActive && " border-t-2")
        // active and error cell logic
        .concat(" ", isActive || cell.isError ? "border-4" : "border-[1px]")
        .concat(" ", cell.isError && "border-red-500")
        .concat(" ", isActive && "border-accent ")
        // preloaded cell logic
        .concat(" ", cell.isLocked ? "text-white" : "text-primary")}
      onClick={onClick}
    >
      {cell.value !== 0 ? cell.value : " "}
    </div>
  );
}

export default Board;
