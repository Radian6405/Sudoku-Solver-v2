import React, { Children } from "react";
import { useSearchParams } from "react-router-dom";
import Unlock from "./icons/unlock";
import Board from "./SudokuBoard";

function Body() {
  const [searchParams, setSearchParams] = useSearchParams();
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
          <DiffButton OnClick={() => setSearchParams({ difficulty: "easy" })}>
            Easy
          </DiffButton>
          <DiffButton OnClick={() => setSearchParams({ difficulty: "medium" })}>
            Medium
          </DiffButton>
          <DiffButton OnClick={() => setSearchParams({ difficulty: "hard" })}>
            Hard
          </DiffButton>
        </div>
      </div>
      <div className="flex justify-center p-5 gap-16">
        <Board />
        <div className=" w-96 py-10 flex flex-col items-center gap-16 ">
          <div className=" grid grid-cols-3 gap-8 ">
            <NumButton>1</NumButton>
            <NumButton>2</NumButton>
            <NumButton>3</NumButton>
            <NumButton>4</NumButton>
            <NumButton>5</NumButton>
            <NumButton>6</NumButton>
            <NumButton>7</NumButton>
            <NumButton>8</NumButton>
            <NumButton>9</NumButton>
          </div>
          <div className=" flex flex-row items-center justify-center gap-8">
            <div
              className="w-40 h-20 bg-secondary rounded-lg
                flex justify-center items-center gap-3
                font-inria text-4xl text-clip overflow-hidden text-text
              hover:bg-accent hover:cursor-pointer"
            >
              Solve
            </div>
            <div
              className="w-40 h-20 bg-secondary rounded-lg
                flex justify-center items-center gap-3
                font-inria text-4xl text-clip overflow-hidden text-text
              hover:bg-accent hover:cursor-pointer"
            >
              Next
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DiffButton({ OnClick, children }) {
  return (
    <>
      <div
        className="w-40 h-16 bg-secondary rounded-lg
        flex justify-center items-center 
        font-inria text-3xl text-clip overflow-hidden text-text
        hover:bg-accent hover:cursor-pointer"
        onClick={OnClick}
      >
        {children}
      </div>
    </>
  );
}

export default Body;

function NumButton({ children }) {
  return (
    <>
      <div
        className="w-20 h-20
                    rounded-[7px] bg-secondary
                    flex justify-center items-center 
                    font-inria text-5xl text-clip overflow-hidden text-text
                    hover:bg-accent hover:cursor-pointer"
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
