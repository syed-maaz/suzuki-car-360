import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { connect } from "react-redux";

import ImageRendererComponent from "./imageRenderer";
import { updateangleAction } from "../redux/carState.reducer";

import { ImageLoadProvider } from "../contexts/imageLoaderContext";

const CarExteriorComponent = (props) => {
  const { carState } = useSelector((state) => state);

  const [angle, setAngle] = useState(0);

  const [wheel, setWheel] = useState({});
  const [variant, setVariant] = useState({});
  const [color, setColor] = useState({});

  const [rareUpperSpoiler, setRareUpperSpoiler] = useState(false);
  const [rareUnderSpoiler, setRareUnderSpoiler] = useState(false);
  const [sideSpoiler, setSideSpoiler] = useState(false);
  const [frontSpoiler, setFrontSpoiler] = useState(false);
  const [otherOptions, setOtherOptions] = useState([]);
  const [basePath, setBasePath] = useState([]);
  const [startingFrom, setStartingFrom] = useState([]);
  const [spoilers, setSpoilers] = useState({});

  const [render, setRender] = useState(0);

  const [totalActiveComp, setTotalActiveComp] = useState(0);

  const totalAngle = 36;

  useEffect(() => {
    if (!!carState) {
      // console.log(carState);
      if (!!carState.angle) {
        setAngle(carState.angle);
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

      setBasePath(carState.basePath);
      setStartingFrom(carState.variantStartingFrom);

      setSpoilers(carState.spoilers);

      setRender(render + 1);

      calculateNumOfComp({ ...carState });

      localStorage.setItem("carState", carState);
    }
  }, [carState]);

  const calculateNumOfComp = (carState) => {
    let total = 3;
    if (carState.rareUpperSpoiler) {
      total = total + 1;
    }
    if (carState.rareUpperSpoiler) {
      total = total + 1;
    }
    if (carState.sideSpoiler) {
      total = total + 1;
    }
    if (carState.frontSpoiler) {
      total = total + 1;
    }
    total = total + Object.keys(carState.otherOptions).length;
    setTotalActiveComp(total);
  };

  return (
    <ImageLoadProvider>
      <div className="car absolute bottom-0 w-full flex justify-center">
        {[...Array(totalAngle)].map((e, index) => (
          <ImageRendererComponent
            key={index}
            i={index}
            angle={angle}
            wheel={wheel}
            variant={variant}
            color={color}
            otherOptions={otherOptions}
            rareUnderSpoiler={rareUnderSpoiler}
            rareUpperSpoiler={rareUpperSpoiler}
            sideSpoiler={sideSpoiler}
            frontSpoiler={frontSpoiler}
            activeNumOfParts={totalActiveComp}
            basePath={basePath}
            startingFrom={startingFrom}
            render={render}
            spoilers={spoilers}
          />
        ))}
      </div>
    </ImageLoadProvider>
  );
};

export default connect(null, { updateangleAction })(CarExteriorComponent);
