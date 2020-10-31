import React from "react";

const CarExteriorComponent = () => {
  return (
    <div className="car">
      <div
        id="layer-0"
        style={{ position: "relative", width: "900px", display: "none" }}
      >
        <img
          src={
            "/images/baleno-items/GL base/GL_Base_Blue/GL_BASE _BLUE_00001.png"
          }
          z-index="1"
          style={{ position: "absolute", left: "0px" }}
          alt=""
        />
        <img
          src={"images/baleno-items/EXT-WH_003-BG_A/EXT-WH_003-BG_A_02.png"}
          z-index="2"
          style={{ position: "absolute", left: "0" }}
          alt=""
        />
        <img
          src={"images/baleno-items/EXT-L_001-BC_Z4Q/EXT-L_001-BC_Z4Q_01.png"}
          z-index="2"
          style={{ position: "absolute", left: "23px" }}
          alt=""
        />
      </div>
      <div
        id="layer-2"
        style={{ position: "relative", width: "900px", display: "none" }}
      >
        <img
          src={
            "images/baleno-items/GL base/GL_Base_Blue/GL_BASE _BLUE_00002.png"
          }
          z-index="1"
          style={{ position: "absolute", left: "0px" }}
          alt=""
        />
        <img
          src={"images/baleno-items/EXT-WH_003-BG_A/EXT-WH_003-BG_A_03.png"}
          z-index="2"
          style={{ position: "absolute", left: "0" }}
          alt=""
        />
      </div>
      <div
        id="layer-3"
        style={{ position: "relative", width: "900px", display: "none" }}
      >
        <img
          src={
            "images/baleno-items/GL base/GL_Base_Blue/GL_BASE _BLUE_00003.png"
          }
          z-index="1"
          style={{ position: "absolute", left: "0px" }}
          alt=""
        />
        <img
          src={"images/baleno-items/EXT-WH_003-BG_A/EXT-WH_003-BG_A_04.png"}
          z-index="2"
          style={{ position: "absolute", left: "0" }}
          alt=""
        />
      </div>
      <div id="layer-3" style={{ position: "relative", width: "900px" }}>
        <img
          src={
            "images/baleno-items/GL base/GL_Base_Blue/GL_BASE _BLUE_00004.png"
          }
          z-index="1"
          style={{ position: "absolute", left: "0px" }}
          alt=""
        />
        <img
          src={"images/baleno-items/EXT-WH_003-BG_A/EXT-WH_003-BG_A_05.png"}
          z-index="2"
          style={{ position: "absolute", left: "0" }}
          alt=""
        />
      </div>
    </div>
  );
};

export default CarExteriorComponent;
