import React from "react";
import Home from "./pages/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Detail from "./pages/Detail/Detail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/clubs/:clubId" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
