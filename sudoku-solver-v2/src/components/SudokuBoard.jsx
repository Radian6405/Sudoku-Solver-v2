import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { initBoard, isValidCell, loadSudoku, showError } from "./util/Helpers";
import { isSolved, solveBoard } from "./util/Solvers";
import { BigBtn } from "./Body";

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

  const [preOverlay, setPreOverlay] = useState(true);
  const [postOverlay, setPostOverlay] = useState(true);

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
      (difficulty === "easy" ||
        difficulty === "medium" ||
        difficulty === "hard") &&
      searchParams.get("next")
    ) {
      setBoard(loadSudoku(difficulty, size));
      setSearchParams({ difficulty: difficulty });
      setPreOverlay(false);
      setPostOverlay(true);
      setSolve(false); //reset solve for the new sudoku
    }
  }, [searchParams]);

  useEffect(() => {
    //solves the board
    if (solve && !preOverlay) {
      setBoard(solveBoard(Board));
    }
  }, [solve]);

  function updateBoard(num, row, col) {
    //updates board
    Board[row][col].value = num;
    setSolve(isSolved(Board));
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
        className="relative bg-darkbg border-2 border-text text-text 
        size-min flex flex-col"
      >
        {preOverlay && (
          <div className="z-10 absolute inset-0 bg-opacity-90 bg-darkbg flex flex-col items-center justify-center p-10">
            <div className="text-5xl text-text text-center leading-24 sm:text-6xl md:text-7xl">
              Pick a difficulty to begin
            </div>
          </div>
        )}
        {solve && postOverlay && !preOverlay && (
          <div className="z-10 absolute inset-0 bg-opacity-90 bg-darkbg flex flex-col items-center justify-center p-10 gap-5 sm:gap-10">
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="text-5xl text-text text-center leading-24 sm:text-6xl md:text-7xl">
                Congrats!
              </div>
              <div className="text-lg text-text text-center leading-24 sm:text-xl md:text-2xl">
                try another puzzle here
              </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-1 sm:gap-5">
              <BigBtn
                OnClick={() => {
                  setSearchParams({
                    difficulty: searchParams.get("difficulty"),
                    next: true,
                  });
                }}
              >
                Next
              </BigBtn>
              <div
                className="text-sm text-text text-center underline hover:cursor-pointer sm:text-lg md:text-xl"
                onClick={() => setPostOverlay(false)}
              >
                close
              </div>
            </div>
          </div>
        )}
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
        .concat(
          " ",
          isActive || cell.isError
            ? "border-[3px] md:border-4 "
            : "border-[1px]"
        )
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
