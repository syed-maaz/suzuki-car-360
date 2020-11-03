import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { connect } from "react-redux";

import { updateangleAction } from "../redux/carState.reducer";

const CarExteriorComponent = (props) => {
  const { carState } = useSelector((state) => state);

  const [angle, setAngle] = useState(0);
  const [wheel, setWheel] = useState({});
  const [variant, setVariant] = useState({});
  const [color, setColor] = useState({});
  const [slider, setSlider] = useState({});

  useEffect(() => {
    console.log(carState);
    if (!!carState && !!carState.angle) {
      setAngle(carState.angle);
      setSlider(carState.angle);
    }
    if (!!carState && !!carState.variant) {
      setVariant(carState.variant);
    }
    if (!!carState && !!carState.color) {
      setColor(carState.color);
    }
    if (!!carState && !!carState.wheel) {
      setWheel(carState.wheel);
    }
  }, [carState]);

  const getVariantSrc = (angle) => {
    angle = ("0" + angle).slice(-2);
    const variantFolder = variant.folder;
    const variantName = variant.name;
    const colorFolder = `${variantName}${color.folder}`;

    return `images/baleno-items/${variantFolder}/${colorFolder}/${variantName}${color.fileName}${angle}.png`;
  };

  const getWheeltSrc = (angle) => {
    angle = angle + 1;
    angle = ("0" + angle).slice(-2);

    return `images/baleno-items/${wheel.folder}/${wheel.folder}_${angle}.png`;
  };

  const getShadowtSrc = (angle) => {
    angle = angle;
    angle = ("0" + angle).slice(-2);

    return `images/baleno-items/shadow/shadow_000${angle}.png`;
  };

  const getRareSpoilertSrc = (angle) => {
    angle = angle + 1;
    return `images/baleno-items/${color.rareWindspoiler}/${color.rareWindspoiler}_${angle}.png`;
  };

  return (
    <>
      <div className="slider">
        <input
          type="range"
          min="0"
          max="31"
          value={slider}
          step="0"
          onChange={(e) => {
            console.log(e.target.value);
            setSlider(parseInt(e.target.value));
            props.updateangleAction(parseInt(e.target.value));
          }}
        />
      </div>
      <div className="car">
        {[...Array(32)].map((e, i) => (
          <div
            key={i}
            style={{
              position: "relative",
              width: "900px",
              display: angle === i ? "" : "none",
            }}
          >
            <img
              src={getVariantSrc(i)}
              z-index="1"
              style={{ position: "absolute", left: "0px" }}
              alt=""
            />
            <img
              src={getShadowtSrc(i)}
              z-index="1.5"
              style={{ position: "absolute", left: "0" }}
              alt=""
            />
            <img
              src={getWheeltSrc(i)}
              z-index="2"
              style={{ position: "absolute", left: "0" }}
              alt=""
            />
            {/* TODO: add the radio option on bottom images */}
            <img
              src={getRareSpoilertSrc(i)}
              z-index="3"
              style={{ position: "absolute", left: "0" }}
              alt=""
            />
            <img
              src="images/baleno-items/EXT-B_001/EXT-B_001_04.png"
              z-index="4"
              style={{ position: "absolute", left: "0" }}
              alt=""
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default connect(null, { updateangleAction })(CarExteriorComponent);
