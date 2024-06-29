import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { initBoard, isValidCell, loadSudoku, showError } from "./util/Helpers";
import { solveBoard } from "./util/Solvers";

function Board({
  activeCell,
  setActiveCell,
  currentNum,
  setCurrentNum,
  solve,
  setSolve,
}) {
  const size = 9;
  const emptyBoard = initBoard(size);

  const [Board, setBoard] = useState(emptyBoard);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    //updates board when current num changes

    if (
      currentNum >= 0 &&
      activeCell.length !== 0 &&
      !Board[activeCell[0]][activeCell[1]].isLocked
    ) {
      //validity check for cells
      let check = isValidCell(Board, activeCell, currentNum);
      updateBoard(currentNum, activeCell[0], activeCell[1]);
      setBoard(showError(Board, check, activeCell));
    } else if (currentNum < -1) {
      for (let i = 0; i < Board.size; i++) {
        for (let j = 0; j < Board.size; j++) {
          if (!Board[i][j].isLocked) {
            updateBoard(0, i, j);
          }
        }
      }
      setCurrentNum(-1);
    }
  }, [currentNum]);

  useEffect(() => {
    //loads new sudoku based on parameters in url

    let difficulty = searchParams.get("difficulty");
    if (
      //PS: i cant figure out what searchParams.get() returns when there are no params so this has to do
      (difficulty === "easy" ||
        difficulty === "medium" ||
        difficulty === "hard") &&
      searchParams.get("next")
    ) {
      setBoard(loadSudoku(difficulty, size));
      setSearchParams({ difficulty: difficulty });
      setSolve(false); //reset solve for the new sudoku
    }
  }, [searchParams]);

  useEffect(() => {
    //solves the board
    if (solve) {
      setBoard(solveBoard(Board));
    }
  }, [solve]);

  function updateBoard(num, row, col) {
    //updates board
    Board[row][col].value = num;
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
      className={"size-8 flex items-center justify-center text-l select-none hover:cursor-pointer sm:size-16 sm:text-3xl "
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
