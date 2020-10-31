import React from "react";
import "./styles/App.css";
import "./styles/reset.css";

import { BrowserRouter } from "react-router-dom";

import { Routes } from "./Routes";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </>
  );
}

export default App;
