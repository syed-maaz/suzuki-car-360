import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import CarExteriorComponent from "./carExterior";
import BottomNavigationComponent from "./bottomNavigation";
import { loadConfigByMeta, loadCarsConfig } from "../crud/loadConfigCrud";

import { addConfig } from "../redux/config.reducer";
import { updateBasePath } from "../redux/carState.reducer";
import {
  updateangleAction,
  updateVariantAction,
  updateColorAction,
  updateWheelAction,
  updateVariantStartFrom,
  updateSpoilers,
} from "../redux/carState.reducer";

import backgroundImg from "../images/bg.jpg";

const HomePageComponent = (props) => {
  const [config, setConfig] = useState();

  const [isRotateActive, setIsRotateActive] = useState(false);
  const [prevPosX, setPrevPosX] = useState(false);

  const { carState } = useSelector((state) => state);

  const [angle, setAngle] = useState(0);

  const totalAngle = 36;

  // get url parameter
  const { carName } = useParams();

  useEffect(async () => {
    const carsConfig = await loadCarsConfig();
    // Check if carName (url param) is in carsConfig. Otherwise throw error
    const carMeta = carsConfig.find((d) => d.id === carName);
    console.log(carMeta);
    if (!carMeta) {
      console.error(
        "incorrect car is given in parameter or car is missing in carConfig.json"
      );
      return;
    }
    const { data } = await loadConfigByMeta(carMeta);
    configureSettings(data);
  }, []);

  useEffect(async () => {
    props.addConfig(config);
  }, [config]);

  useEffect(async () => {
    if (!!carState) {
      if (!!carState.angle) {
        setAngle(carState.angle);
      }
    }
  }, [carState]);

  const configureSettings = (config) => {
    props.updateBasePath(config.basePath);
    props.updateVariantAction(config.variants[0]);
    props.updateColorAction(config.colors[0]);
    props.updateWheelAction(config.wheels[0]);
    props.updateVariantStartFrom(config.variantStartFrom);
    // props.updateSpoilers(config.spoilers);
    setConfig(config);
  };

  const handleMouseUp = (e) => {
    setIsRotateActive(false);
    setPrevPosX(0);
  };

  const handleMouseDown = (e) => {
    const pageX =
      e.pageX ||
      (e.targetTouches && e.targetTouches[0]
        ? e.targetTouches[0].pageX
        : e.changedTouches[e.changedTouches.length - 1].pageX);
    setIsRotateActive(true);
    setPrevPosX(pageX);
  };

  const handleMouseMove = (e, moveFactor = 3) => {
    if (isRotateActive) {
      let nAngle = 0;
      const pageX =
        e.pageX ||
        (e.targetTouches && e.targetTouches[0]
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
            <BottomNavigationComponent config={config} />
          </div>
        </div>
      </div>
    </>
  );
};

export default connect(null, {
  addConfig,
  updateBasePath,
  updateangleAction,
  updateVariantAction,
  updateColorAction,
  updateWheelAction,
  updateVariantStartFrom,
  updateSpoilers,
})(HomePageComponent);
