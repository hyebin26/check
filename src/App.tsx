import React from "react";
import Home from "./pages/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Clubs from "./pages/Clubs/Clubs";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/clubs/:clubId" element={<Clubs />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
