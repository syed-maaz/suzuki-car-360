import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";

import CarExteriorComponent from "./carExterior";
import BottomNavigationComponent from "./bottomNavigation";
import { loadConfig } from "../crud/loadConfigCrud";

import { addConfig } from "../redux/data.reducer";
import { updateangleAction } from "../redux/carState.reducer";

import backgroundImg from "../images/bg.jpg";

const HomePageComponent = (props) => {
  const [config, setConfig] = useState();

  const count = useSelector((state) => state.config);

  const [isRotateActive, setIsRotateActive] = useState(false);
  const [prevPosX, setPrevPosX] = useState(false);

  const { carState } = useSelector((state) => state);

  const [angle, setAngle] = useState(0);

  const totalAngle = 36;

  useEffect(async () => {
    const { data } = await loadConfig();
    setConfig(data);
  }, []);

  useEffect(async () => {
    // console.log(config);
    props.addConfig(config);
  }, [config]);

  useEffect(async () => {
    if (!!carState) {
      if (!!carState.angle) {
        setAngle(carState.angle);
      }
    }
  }, [carState]);

  const handleMouseUp = (e) => {
    // e.preventDefault();
    setIsRotateActive(false);
    setPrevPosX(0);
  };

  const handleMouseDown = (e) => {
    // e.preventDefault();
    console.log("meow");
    const pageX =
      e.pageX ||
      (e.targetTouches[0]
        ? e.targetTouches[0].pageX
        : e.changedTouches[e.changedTouches.length - 1].pageX);
    setIsRotateActive(true);
    setPrevPosX(pageX);
  };

  const handleMouseMove = (e, moveFactor = 3) => {
    // e.preventDefault();

    if (isRotateActive) {
      console.log("meow1");

      let nAngle = 0;
      const pageX =
        e.pageX ||
        (e.targetTouches[0]
          ? e.targetTouches[0].pageX
          : e.changedTouches[e.changedTouches.length - 1].pageX);
      if (moveFactor > 0) {
        if (pageX % moveFactor != 0) return;
      }
      if (pageX > prevPosX) {
        nAngle = parseInt(angle) + 1 > totalAngle - 1 ? 0 : parseInt(angle) + 1;
        setAngle(nAngle);
      } else {
        nAngle = parseInt(angle) - 1 < 0 ? totalAngle - 1 : parseInt(angle) - 1;
        setAngle(nAngle);
      }
      props.updateangleAction(nAngle);
      setPrevPosX(pageX);
    }
  };
  return (
    <>
      <div className="App">
        <div className="bg">
          <div className="wrapper relative">
            <img src={backgroundImg} className="w-full" alt="cover" />
            <div
              className="absolute inset-0"
              onTouchStart={(e) => handleMouseDown(e)}
              onTouchEnd={() => handleMouseUp()}
              onTouchMove={(e) => handleMouseMove(e, 0)}
              onMouseDown={(e) => {
                e.preventDefault();
                handleMouseDown(e);
              }}
              onMouseUp={(e) => {
                e.preventDefault();
                handleMouseUp();
              }}
              onMouseMove={(e) => {
                e.preventDefault();
                handleMouseMove(e, 5);
              }}
            >
              <CarExteriorComponent />
            </div>
            <BottomNavigationComponent />
          </div>
        </div>
      </div>
    </>
  );
};

export default connect(null, { addConfig, updateangleAction })(
  HomePageComponent
);
