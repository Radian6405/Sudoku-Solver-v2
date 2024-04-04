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

  useEffect(() => {
    setCurrentNum(0);
  }, [activeCell]);

  function setNum(cellPos, num) {
    setCurrentNum(num);
  }

  return (
    <div className="px-1 py-1 sm:px-20 sm:py-10 bg-background flex flex-col ">
      <div className="h-28   flex flex-row items-center justify-center gap-32 ">
        <div
          className="w-42 h-16
            flex justify-center items-center 
            font-inria text-3xl text-clip overflow-hidden text-text"
        >
          Difficulty:
        </div>
        <div className="h-28 flex flex-row items-center gap-20">
          <BigBtn OnClick={() => setSearchParams({ difficulty: "easy" })}>
            Easy
          </BigBtn>
          <BigBtn OnClick={() => setSearchParams({ difficulty: "medium" })}>
            Medium
          </BigBtn>
          <BigBtn OnClick={() => setSearchParams({ difficulty: "hard" })}>
            Hard
          </BigBtn>
        </div>
      </div>
      <div className="flex justify-center p-5 gap-16">
        <Board
          activeCell={activeCell}
          setActiveCell={setActiveCell}
          num={currentNum}
        />
        <div className=" w-96  flex flex-col items-center gap-8 ">
          <div className=" grid grid-cols-3 gap-6 ">
            {[...Array(size).keys()].map((_, j) => {
              return (
                <NumBtn key={j} OnClick={() => setNum(activeCell, j + 1)}>
                  {j + 1}
                </NumBtn>
              );
            })}
          </div>
          <div className="pb-10">
            <BigBtn OnClick={() => setActiveCell([])}>Clear</BigBtn>
          </div>
          <div className=" flex flex-row items-center justify-center gap-8">
            <BigBtn>Solve</BigBtn>
            <BigBtn>Next</BigBtn>
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

{
  /*<div className="text-white">{searchParams.get("difficulty")}</div>*/
}
