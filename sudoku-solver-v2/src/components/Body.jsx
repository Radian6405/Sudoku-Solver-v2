import React, { Children, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Unlock from "./icons/unlock";
import Board from "./SudokuBoard";
import { useEffect } from "react";

function Body() {
  const size = 9;

  const [searchParams, setSearchParams] = useSearchParams();
  const [activeCell, setActiveCell] = useState([]);
  const [currentNum, setCurrentNum] = useState(0);
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
    <div className="px-1 py-1 sm:px-20 sm:py-10 bg-background flex flex-col ">
      <div className="h-28   flex flex-row items-center justify-center gap-32 ">
        {/* Difficulty selector */}
        <div
          className="w-42 h-16
            flex justify-center items-center 
            font-inria text-3xl text-clip overflow-hidden text-text"
        >
          Difficulty:
        </div>
        <div className="h-28 flex flex-row items-center gap-20">
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

      <div className="flex justify-center p-5 gap-16">
        {/* Sudoku board */}
        <Board
          activeCell={activeCell}
          setActiveCell={setActiveCell}
          currentNum={currentNum}
          setCurrentNum={setCurrentNum}
        />

        <div className=" w-96  flex flex-col items-center gap-8 ">
          {/* Numpad */}
          <div className=" grid grid-cols-3 gap-6 ">
            {[...Array(size).keys()].map((_, j) => {
              return (
                <NumBtn key={j} OnClick={() => setNum(j + 1)}>
                  {j + 1}
                </NumBtn>
              );
            })}
          </div>

          {/* buttons */}
          <div className=" flex flex-col  items-center justify-center gap-8">
            <BigBtn OnClick={() => setNum(0)}>Clear</BigBtn>
            <div className="flex flex-row  items-center justify-center gap-8">
              <BigBtn>Solve</BigBtn>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Body;

function BigBtn({ OnClick, children }) {
  return (
    <div
      className="w-40 h-16 bg-secondary rounded-lg
                  flex justify-center items-center 
                  font-inria text-3xl text-clip overflow-hidden text-text select-none	
                 hover:bg-accent hover:cursor-pointer"
      onClick={OnClick}
    >
      {children}
    </div>
  );
}

function NumBtn({ OnClick, children }) {
  return (
    <>
      <div
        className="size-[4.5rem] 
        rounded-[7px] bg-secondary
        flex justify-center items-center 
        font-inria text-4xl text-clip overflow-hidden text-text select-none	
                    hover:bg-accent hover:cursor-pointer"
        onClick={OnClick}
      >
        {" "}
        {children}{" "}
      </div>
    </>
  );
}
