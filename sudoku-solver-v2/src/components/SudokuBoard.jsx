import React, { useState } from "react";
import { useEffect } from "react";

function Board({ activeCell, setActiveCell, currentNum, setCurrentNum }) {
  const size = 9;
  const initBoard = {
    0: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    1: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    2: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    3: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    4: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    5: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    6: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    7: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    8: [0, 0, 0, 0, 0, 0, 0, 0, 0],
  };

  const [Board, setBoard] = useState(initBoard);

  useEffect(() => {
    if (currentNum !== -1 && activeCell.length !== 0) {
      updateBoard(currentNum, activeCell[0], activeCell[1]);
    }
  }, [currentNum]);

  function updateBoard(num, row, col) {
    const newRow = Board[row].map((value, index) => {
      if (col === index) return num;
      else return value;
    });
    var newBoard = { ...Board };
    newBoard[row] = newRow;

    setBoard(newBoard);
  }

  function changeActiveCell(row, col) {
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
                    value={Board[i][j]}
                    size={size}
                    isActive={
                      activeCell.length !== 0 &&
                      activeCell[0] === i &&
                      activeCell[1] === j
                    }
                    onClick={() => changeActiveCell(i, j)}
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

function Cell({ row, col, value, size, onClick, isActive }) {
  const subdiv = Math.floor(Math.sqrt(size));

  return (
    <div
      className={"size-[3.5rem] border-[1px] border-text flex items-center justify-center text-3xl select-none hover:cursor-pointer"
        .concat(" ", col % subdiv === subdiv - 1 && " border-r-2  ")
        .concat(" ", col % subdiv === 0 && " border-l-2  ")
        .concat(" ", row % subdiv === subdiv - 1 && " border-b-2  ")
        .concat(" ", row % subdiv === 0 && " border-t-2  ")
        .concat(" ", isActive && "bg-primary")}
      onClick={onClick}
    >
      {value !== 0 ? value : " "}
    </div>
  );
}

export default Board;
