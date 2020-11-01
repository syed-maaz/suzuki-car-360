import React from "react";
import "./styles/App.css";
import "./styles/reset.css";

import { BrowserRouter } from "react-router-dom";
import { Provider, connect } from "react-redux";

import store from "./redux/store";
import { Routes } from "./Routes";

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
