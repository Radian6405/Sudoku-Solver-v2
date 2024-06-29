import React, { Children, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Board from "./SudokuBoard";
import { useEffect } from "react";

import { IconLockOpen } from "@tabler/icons-react";

function Body() {
  const size = 9;

  const [searchParams, setSearchParams] = useSearchParams();
  const [activeCell, setActiveCell] = useState([]);
  const [currentNum, setCurrentNum] = useState(0);
  const [solve, setSolve] = useState(false);
  /*for currentNum
  -1 indicates dont change the current num
  0 indicates clear
  any +ve num is the num*/

  // maintains current active number
  useEffect(() => {
    setCurrentNum(-1);
  }, [activeCell]);

  function setNum(num) {
    setCurrentNum(num);
  }

  return (
    <div className="py-4 bg-background flex flex-col">
      <div className="flex flex-col items-center justify-center gap-4 m-1 sm:flex-row sm:m-4 md:gap-8">
        {/* Difficulty selector */}
        <div
          className="flex justify-center items-center 
            font-inria text-xl text-clip overflow-hidden text-text sm:text-3xl md:text-4xl"
        >
          Difficulty:
        </div>
        <div className="flex flex-row justify-between items-center gap-2 sm:flex-row sm:gap-2">
          <BigBtn
            OnClick={() => setSearchParams({ difficulty: "easy", next: true })}
          >
            Easy
          </BigBtn>
          <BigBtn
            OnClick={() =>
              setSearchParams({ difficulty: "medium", next: true })
            }
          >
            Medium
          </BigBtn>
          <BigBtn
            OnClick={() => setSearchParams({ difficulty: "hard", next: true })}
          >
            Hard
          </BigBtn>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center my-5 gap-8 lg:flex-row lg:gap-16">
        <Board
          activeCell={activeCell}
          setActiveCell={setActiveCell}
          currentNum={currentNum}
          setCurrentNum={setCurrentNum}
          solve={solve}
          setSolve={setSolve}
        />

        <div className="flex flex-col items-center gap-4 sm:gap-8 ">
          {/* Numpad */}
          <div className=" grid grid-cols-9 gap-1 sm:gap-3 lg:grid-cols-3">
            {[...Array(size).keys()].map((_, j) => {
              return (
                <NumBtn key={j} OnClick={() => setNum(j + 1)}>
                  {j + 1}
                </NumBtn>
              );
            })}
          </div>

          {/* buttons */}
          <div className=" flex flex-col items-center justify-center gap-8 md:gap-12">
            <div className="flex flex-row  items-center justify-center gap-4">
              <BigBtn OnClick={() => setNum(0)}>Clear</BigBtn>
              <BigBtn OnClick={() => setNum(-2)}>Clear all</BigBtn>
            </div>
            <BigBtn OnClick={() => setSolve(true)}>
              <IconLockOpen
                className="size-3 sm:size-5 md:size-6 "
                stroke={2}
              />
              <span className="mx-1">Solve</span>
            </BigBtn>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Body;

export function BigBtn({ OnClick, children }) {
  return (
    <div
      className="w-20 p-1 bg-secondary rounded-md
                  flex justify-center items-center 
                  font-inria text-base text-clip overflow-hidden text-text select-none	
                 hover:bg-accent hover:cursor-pointer sm:text-2xl sm:min-w-32 sm:p-2 sm:rounded-lg md:text-3xl md:min-w-40 md:p-3  "
      onClick={OnClick}
    >
      {children}
    </div>
  );
}

export function NumBtn({ OnClick, children }) {
  return (
    <>
      <div
        className="size-7 
        rounded-md  bg-secondary
        flex justify-center items-center 
        font-inria text-l text-clip overflow-hidden text-text select-none	
      hover:bg-accent hover:cursor-pointer sm:size-14 sm:text-3xl sm:rounded-lg lg:size-[4.5rem] lg:text-4xl lg:rounded-xl "
        onClick={OnClick}
      >
        {children}
      </div>
    </>
  );
}
