import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Treatment from "./Treatment";
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/treatment" element={<Treatment />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
