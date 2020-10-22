import React from "react";
import "./styles/App.css";

function App() {
  console.log(process.env.PUBLIC_URL);
  return (
    <div className="App">
      <div className="bg">
        <div className="car">
          <div id="layer-0" style={{ position: "relative", width: "900px" }}>
            <img
              src={require("./images/baleno-items/GL base/GL_Base_Blue/GL_BASE _BLUE_00001.png")}
              z-index="1"
              style={{ position: "absolute", left: "0px" }}
              alt=""
            />
            <img
              src={require("./images/baleno-items/EXT-WH_003-BG_A/EXT-WH_003-BG_A_02.png")}
              z-index="2"
              style={{ position: "absolute", left: "23px" }}
              alt=""
            />
            <img
              src={require("./images/baleno-items/EXT-L_001-BC_Z4Q/EXT-L_001-BC_Z4Q_01.png")}
              z-index="2"
              style={{ position: "absolute", left: "23px" }}
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
