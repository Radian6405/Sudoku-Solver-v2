import React, { useState } from "react";
import { useEffect } from "react";

function Board({ activeCell, setActiveCell, num }) {
  const size = 9;
  const [currentNum, setCurrentNum] = useState(0);

  useEffect(() => {
    setCurrentNum(num);
  }, [num]);
  function changeActiveCell(row, col) {
    activeCell[0] === row && activeCell[1] === col
      ? setActiveCell([])
      : setActiveCell([row, col]);
    setCurrentNum(0);
  }

  return (
    <>
      <div
        className="bg-darkbg  border-2 border-text text-text 
                      size-min flex flex-col"
      >
        {[...Array(size).keys()].map((_, i) => {
          return (
            <div key={i} className="flex flex-row gap-0">
              {[...Array(size).keys()].map((_, j) => {
                return (
                  <Cell
                    key={10 * i + j}
                    row={i}
                    col={j}
                    size={size}
                    activeCell={activeCell}
                    num={
                      activeCell[0] === i && activeCell[1] === j
                        ? currentNum
                        : 0
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

function Cell({ row, col, size, onClick, activeCell, num }) {
  const subdiv = Math.floor(Math.sqrt(size));
  const [currentNum, setCurrentNum] = useState(0);

  useEffect(() => {
    if (num !== 0) {
      setCurrentNum(num);
    }
  }, [num]);

  return (
    <div
      className={"size-[3.5rem] border-[1px] border-text flex items-center justify-center text-3xl select-none hover:cursor-pointer"
        .concat(" ", col % subdiv === subdiv - 1 && " border-r-2  ")
        .concat(" ", col % subdiv === 0 && " border-l-2  ")
        .concat(" ", row % subdiv === subdiv - 1 && " border-b-2  ")
        .concat(" ", row % subdiv === 0 && " border-t-2  ")
        .concat(
          " ",
          activeCell[0] === row && activeCell[1] === col && "bg-primary"
        )}
      onClick={onClick}
    >
      {currentNum !== 0 ? currentNum : " "}
    </div>
  );
}

export default Board;
