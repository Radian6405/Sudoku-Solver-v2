import React from "react";

import { IconGridPattern } from "@tabler/icons-react";
import { IconBrandGithub } from "@tabler/icons-react";

const Navbar = () => {
  return (
    <>
      <div className="bg-background text-text flex justify-evenly border-b-2 p-4 border-accent">
        <div className="flex items-center gap-4 sm:gap-8">
          {/* Logo */}
          <a href="/Sudoku-Solver-v2" className="flex items-center">
            <IconGridPattern size={64} className="hidden sm:block" />
            <IconGridPattern size={32} className="block sm:hidden" />
          </a>

          {/* Title */}
          <a href="/Sudoku-Solver-v2" className="flex items-center">
            <div className="font-inria font-bold text-3xl text-clip overflow-hidden inline-block sm:text-5xl">
              Sudoku Solver
            </div>
          </a>
        </div>

        <div className="flex items-center justify-center">
          <div className="p-2 rounded bg-secondary flex items-center hover:bg-primary hover:text-background sm:p-3">
            {/* github link button */}
            <a
              href="https://github.com/Radian6405/Sudoku-Solver-v2"
              className="flex items-center font-inria text-3xl text-clip overflow-hidden"
            >
              <div className="hidden md:block">GitHub Project</div>
              <IconBrandGithub
                size={32}
                className="hidden sm:block md:hidden"
              />
              <IconBrandGithub size={16} className="block sm:hidden" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
