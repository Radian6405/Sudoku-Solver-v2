import React, { Children } from "react";
import { useSearchParams } from "react-router-dom";

function Body() {
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <div className="px-32 py-16 bg-background flex justify-center">
      <div className="h-28 flex flex-row gap-32">
        <div
          className="w-40 h-16
            flex justify-center items-center 
            font-inria text-3xl text-clip overflow-hidden text-text"
        >
          Difficulty:
        </div>
        <div className="h-28 flex flex-row gap-10">
          <Button OnClick={() => setSearchParams({ difficulty: "easy" })}>
            Easy
          </Button>
          <Button OnClick={() => setSearchParams({ difficulty: "medium" })}>
            Medium
          </Button>
          <Button OnClick={() => setSearchParams({ difficulty: "hard" })}>
            Hard
          </Button>
        </div>

        {/*<div className="text-white">{searchParams.get("difficulty")}</div>*/}
      </div>
    </div>
  );
}

function Button({ OnClick, children }) {
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
