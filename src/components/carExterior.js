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
  const [rareUpperSpoiler, setRareUpperSpoiler] = useState(false);
  const [rareUnderSpoiler, setRareUnderSpoiler] = useState(false);
  const [sideSpoiler, setSideSpoiler] = useState(false);
  const [frontSpoiler, setFrontSpoiler] = useState(false);
  const [otherOptions, setOtherOptions] = useState([]);

  useEffect(() => {
    console.log(carState);
    if (!!carState) {
      if (!!carState.angle) {
        setAngle(carState.angle);
        setSlider(carState.angle);
      }
      if (!!carState.variant) {
        setVariant(carState.variant);
      }
      if (!!carState.color) {
        setColor(carState.color);
      }
      if (!!carState.wheel) {
        setWheel(carState.wheel);
      }
      if (!!carState.otherOptions) {
        setOtherOptions(carState.otherOptions);
      }

      setRareUpperSpoiler(carState.rareUpperSpoiler);
      setRareUnderSpoiler(carState.rareUnderSpoiler);
      setSideSpoiler(carState.sideSpoiler);
      setFrontSpoiler(carState.frontSpoiler);
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
    return `images/baleno-items/${color.rareUpperSpoilerFolder}/${color.rareUpperSpoilerFolder}_${angle}.png`;
  };

  const getRareUnderSpoilertSrc = (angle) => {
    angle = angle + 1;
    return `images/baleno-items/${color.rareUnderSpoilerFolder}/${color.rareUnderSpoilerFolder}_${angle}.png`;
  };

  const getSideSpoilertSrc = (angle) => {
    angle = angle + 1;
    angle = ("0" + angle).slice(-2);
    return `images/baleno-items/${color.sideSpoilerFolder}/${color.sideSpoilerFolder}_${angle}.png`;
  };

  const getFrontSpoilertSrc = (angle) => {
    angle = angle + 1;
    angle = ("0" + angle).slice(-2);
    return `images/baleno-items/${color.frontSpoilerFolder}/${color.frontSpoilerFolder}_${angle}.png`;
  };

  const renderOtherOption = () => {
    if (otherOptions) {
      return Object.keys(otherOptions).map((item, i) => {
        let src = "";
        if (!otherOptions[item]) {
          return "";
        }
        let an = parseInt(angle) + parseInt(otherOptions[item].startingFrom);
        an = ("0" + an).slice(-2);

        if (!!otherOptions[item].reference) {
          const ref = otherOptions[item].reference;
          src = `images/baleno-items/${color[ref]}/${color[ref]}_${an}.png`;
        } else if (!!otherOptions[item].folder) {
          const folder = otherOptions[item].folder;
          src = `images/baleno-items/${folder}/${folder}_${an}.png`;
        }
        return (
          <img
            key={i}
            src={src}
            z-index="4"
            style={{ position: "absolute", left: "0" }}
            alt=""
            draggable="true"
          />
        );
      });
    }
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
              draggable="true"
            />
            <img
              src={getShadowtSrc(i)}
              z-index="1.5"
              style={{ position: "absolute", left: "0" }}
              alt=""
              draggable="true"
            />
            <img
              src={getWheeltSrc(i)}
              z-index="2"
              style={{ position: "absolute", left: "0" }}
              alt=""
              draggable="true"
            />
            {!!rareUpperSpoiler ? (
              <img
                src={getRareSpoilertSrc(i)}
                z-index="3"
                style={{ position: "absolute", left: "0" }}
                alt=""
                draggable="true"
              />
            ) : (
              " "
            )}
            {!!rareUnderSpoiler ? (
              <img
                src={getRareUnderSpoilertSrc(i)}
                z-index="4"
                style={{ position: "absolute", left: "0" }}
                alt=""
                draggable="true"
              />
            ) : (
              " "
            )}
            {!!sideSpoiler ? (
              <img
                src={getSideSpoilertSrc(i)}
                z-index="4"
                style={{ position: "absolute", left: "0" }}
                alt=""
                draggable="true"
              />
            ) : (
              " "
            )}
            {!!frontSpoiler ? (
              <img
                src={getFrontSpoilertSrc(i)}
                z-index="4"
                style={{ position: "absolute", left: "0" }}
                alt=""
                draggable="true"
              />
            ) : (
              " "
            )}
            {renderOtherOption()}
            {/* <img
              src="images/baleno-items/EXT-B_001/EXT-B_001_04.png"
              z-index="4"
              style={{ position: "absolute", left: "0" }}
              alt=""
            /> */}
          </div>
        ))}
      </div>
    </>
  );
};

export default connect(null, { updateangleAction })(CarExteriorComponent);
