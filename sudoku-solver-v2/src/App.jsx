import React from "react";
import Navbar from "./components/Navbar";
import Body from "./components/Body";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
const App = () => {
  return (
    <>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Body />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
};

export default App;
