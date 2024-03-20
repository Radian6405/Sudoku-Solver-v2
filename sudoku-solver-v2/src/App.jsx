import React from "react";
import Navbar from "./components/Navbar";
import Body from "./components/Body";
import { Route, Routes } from "react-router-dom";
const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Body />} />
      </Routes>
    </>
  );
};

export default App;
