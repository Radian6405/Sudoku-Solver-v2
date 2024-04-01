import React, { useState } from "react";

function Board() {
  const size = 9;
  const [activeCell, setActiveCell] = useState([]);

  return (
    <>
      <div
        className="bg-darkbg  border-2 border-text text-text 
                      size-min flex flex-row"
      >
        {[...Array(size).keys()].map((_, i) => {
          return (
            <div key={i} className="flex flex-col gap-0">
              {[...Array(size).keys()].map((_, j) => {
                return (
                  <Cell
                    key={j}
                    row={i}
                    col={j}
                    size={size}
                    activeCell={activeCell}
                    onClick={() => {
                      activeCell[0] === i && activeCell[1] === j
                        ? setActiveCell([])
                        : setActiveCell([i, j]);
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

function Cell({ row, col, size, onClick, activeCell }) {
  const subdiv = Math.floor(Math.sqrt(size));
  return (
    <div
      className={"size-[3.5rem] border-[1px] border-text flex items-center justify-center text-3xl select-none hover:cursor-pointer"
        .concat(" ", row % subdiv === subdiv - 1 && " border-r-2  ")
        .concat(" ", row % subdiv === 0 && " border-l-2  ")
        .concat(" ", col % subdiv === subdiv - 1 && " border-b-2  ")
        .concat(" ", col % subdiv === 0 && " border-t-2  ")
        .concat(
          " ",
          activeCell[0] === row && activeCell[1] === col && "bg-primary"
        )}
      onClick={onClick}
    >
      
    </div>
  );
}

export default Board;
