import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { connect } from "react-redux";

import {
  updateVariantAction,
  updateColorAction,
  updateWheelAction,
} from "../redux/carState.reducer";

const BottomNavigationComponent = (props) => {
  const { config } = useSelector((state) => state.config);
  const { carState } = useSelector((state) => state);

  const [variants, setVariants] = useState([]);
  const [colors, setColors] = useState([]);
  const [wheels, setWheels] = useState([]);

  const [cWheel, setCWheel] = useState({});
  const [cVariant, setCVariant] = useState({});
  const [cColor, setCColor] = useState({});
  const [slider, setSlider] = useState({});

  useEffect(() => {
    if (!!config && !!config.variants) {
      setVariants(config.variants);
    }
    if (!!config && !!config.colors) {
      setColors(config.colors);
    }
    if (!!config && !!config.wheels) {
      setWheels(config.wheels);
    }
  }, [config]);

  useEffect(() => {
    if (!!carState && !!carState.variant) {
      setCVariant(carState.variant);
    }
    if (!!carState && !!carState.color) {
      setCColor(carState.color);
    }
    // if (!!carState && !!carState.wheel) {
    //   setWheel(carState.wheel);
    // }
  }, [carState]);

  return (
    <div className="bottom-nav">
      <button className="left">Exterior</button>
      <nav>
        <ul>
          <li>
            <a href="#">Car Type</a>
            <div className="sub-menu">
              <ul>
                {!!variants.length &&
                  variants.map((d, i) => (
                    <li key={i} onClick={(e) => props.updateVariantAction(d)}>
                      {cVariant.name === d.name ? (
                        <>
                          <i
                            class="fas fa-check-circle"
                            style={{ color: "green" }}
                          ></i>{" "}
                        </>
                      ) : (
                        " "
                      )}
                      <a href="#">{d.name}</a>
                    </li>
                  ))}
              </ul>
            </div>
          </li>
          <li>
            <a href="#">Spray</a>
            <div className="sub-menu">
              <ul>
                {!!colors.length &&
                  colors.map((d, i) => (
                    <li key={i} onClick={(e) => props.updateColorAction(d)}>
                      {cColor.name === d.name ? (
                        <>
                          <i
                            class="fas fa-check-circle"
                            style={{ color: "green" }}
                          ></i>{" "}
                        </>
                      ) : (
                        " "
                      )}
                      <a href="#">{d.name}</a>
                    </li>
                  ))}
              </ul>
            </div>
          </li>
          <li>
            <a href="#">Wheels</a>
            <div className="sub-menu">
              <ul>
                {!!wheels.length &&
                  wheels.map((d, i) => (
                    <li key={i} onClick={(e) => props.updateWheelAction(d)}>
                      <a href="#">{d.name}</a>
                    </li>
                  ))}
              </ul>
            </div>
          </li>
          <li>
            <a href="#">Setting</a>
            <div className="sub-menu">
              <ul>
                <li>
                  <a href="#">Front Under Spoiler</a>
                </li>
                <li>
                  <a href="#">Side Under Spoiler</a>
                </li>
                <li>
                  <a href="#">Rear Under Spoiler</a>
                </li>
              </ul>
            </div>
          </li>
          <li>
            <a href="#">Setting</a>
            <div className="sub-menu">
              <ul>
                <li>
                  <a href="#">Front Under Spoiler</a>
                </li>
                <li>
                  <a href="#">Side Under Spoiler</a>
                </li>
                <li>
                  <a href="#">Rear Under Spoiler</a>
                </li>
              </ul>
            </div>
          </li>
          <li>
            <a href="#">Calender</a>
            <div className="sub-menu">
              <ul>
                <li>
                  <a href="#">Option 1</a>
                </li>
                <li>
                  <a href="#">Option 2</a>
                </li>
                <li>
                  <a href="#">Option 3</a>
                </li>
              </ul>
            </div>
          </li>
          <li>
            <a href="#">View</a>
            <div className="sub-menu">
              <ul>
                <li>
                  <a href="#">Option 1</a>
                </li>
                <li>
                  <a href="#">Option 2</a>
                </li>
                <li>
                  <a href="#">Option 3</a>
                </li>
              </ul>
            </div>
          </li>
          <li>
            <a href="#">Calculator</a>
            <div className="sub-menu">
              <ul>
                <li>
                  <a href="#">Option 1</a>
                </li>
                <li>
                  <a href="#">Option 2</a>
                </li>
                <li>
                  <a href="#">Option 3</a>
                </li>
              </ul>
            </div>
          </li>
        </ul>
        <div className="clear"></div>
      </nav>
      <button className="right">Interior</button>
      <div className="clear"></div>
    </div>
  );
};

export default connect(null, {
  updateVariantAction,
  updateColorAction,
  updateWheelAction,
})(BottomNavigationComponent);
