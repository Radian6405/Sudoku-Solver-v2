import React from "react";
import Logo from "./icons/logo";

const Navbar = () => {
  return (
    <>
      <div className="bg-background text-text h-24  flex border-b-2 border-accent">
        <div className="w-2/3 h-auto flex items-center gap-16 pl-40 ">
          <Logo size={"48"} className={" inline-block"} />
          <div className="font-inria font-bold text-5xl text-clip overflow-hidden inline-block">
            Sudoku Solver
          </div>
        </div>
        <div className="w-1/3 h-auto flex items-center justify-center">
          <div className=" w-max h-14 px-5 rounded bg-secondary flex items-center hover:bg-primary hover:text-background">
            <a
              href="https://github.com/Radian6405/Sudoku-Solver-v2"
              className="font-inria text-2xl text-clip overflow-hidden inline-block"
            >
              GitHub Project
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
