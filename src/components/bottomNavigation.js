import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { connect } from "react-redux";

import {
  updateVariantAction,
  updateColorAction,
  updateWheelAction,
  updateRareUpperSpoiler,
  updateRareUnderSpoiler,
  updateSideSpoiler,
  updateFrontSpoiler,
  updateOtherOptions,
} from "../redux/carState.reducer";

const BottomNavigationComponent = (props) => {
  const { config } = useSelector((state) => state.config);
  const { carState } = useSelector((state) => state);

  const [variants, setVariants] = useState([]);
  const [colors, setColors] = useState([]);
  const [wheels, setWheels] = useState([]);
  const [otherOptions, setOtherOptions] = useState([]);

  const [rareUpperSpoiler, setRareUpperSpoiler] = useState(false);
  const [rareUnderSpoiler, setRareUnderSpoiler] = useState(false);
  const [sideSpoiler, setSideSpoiler] = useState(false);
  const [frontSpoiler, setFrontSpoiler] = useState(false);

  const [cWheel, setCWheel] = useState({});
  const [cVariant, setCVariant] = useState({});
  const [cColor, setCColor] = useState({});
  const [cOther, setCOther] = useState({});

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
    if (!!config && !!config.otherOptions) {
      setOtherOptions(config.otherOptions);
    }
  }, [config]);

  useEffect(() => {
    if (!!carState) {
      if (!!carState.variant) {
        setCVariant(carState.variant);
      }
      if (!!carState.color) {
        setCColor(carState.color);
      }
      if (!!carState.wheel) {
        setCWheel(carState.wheel);
      }
      if (!!carState.otherOptions) {
        setCOther(carState.otherOptions);
      }

      setRareUpperSpoiler(carState.rareUpperSpoiler);
      setRareUnderSpoiler(carState.rareUnderSpoiler);
      setFrontSpoiler(carState.frontSpoiler);
      setSideSpoiler(carState.sideSpoiler);
    }
  }, [carState]);

  const updateOtherOptions = (op) => {
    if (!!cOther[op.name]) {
      delete cOther[op.name];
    } else {
      cOther[op.name] = op;
    }

    props.updateOtherOptions(cOther);
  };

  const isOptionActive = (name) => {
    return !!cOther[name];
  };

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
                            className="fas fa-check-circle"
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
          <li className="thirdchild">
            <a href="#">Spray</a>
            <div className="sub-menu">
              <ul>
                {!!colors.length &&
                  colors.map((d, i) => (
                    <li key={i} onClick={(e) => props.updateColorAction(d)}>
                      {cColor.name === d.name ? (
                        <>
                          <i
                            className="fas fa-check-circle"
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
                      {cWheel.name === d.name ? (
                        <>
                          <i
                            className="fas fa-check-circle"
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
          {/* Spoilers */}
          <li>
            <a href="#">Setting</a>
            <div className="sub-menu">
              <ul>
                {/* Front Under Spoiler */}
                <li>
                  {frontSpoiler ? (
                    <>
                      <i
                        className="fas fa-check-circle"
                        style={{ color: "green" }}
                      ></i>{" "}
                    </>
                  ) : (
                    " "
                  )}
                  <a
                    href="#"
                    onClick={(e) => {
                      props.updateFrontSpoiler(!frontSpoiler);
                      e.preventDefault();
                    }}
                  >
                    Front Under Spoiler
                  </a>
                </li>
                {/* Side Under Spoiler */}
                <li>
                  {sideSpoiler ? (
                    <>
                      <i
                        className="fas fa-check-circle"
                        style={{ color: "green" }}
                      ></i>{" "}
                    </>
                  ) : (
                    " "
                  )}
                  <a
                    href="#"
                    onClick={(e) => {
                      props.updateSideSpoiler(!sideSpoiler);
                      e.preventDefault();
                    }}
                  >
                    Side Under Spoiler
                  </a>
                </li>
                {/* Rare View Spoiler */}
                <li>
                  {rareUpperSpoiler ? (
                    <>
                      <i
                        className="fas fa-check-circle"
                        style={{ color: "green" }}
                      ></i>{" "}
                    </>
                  ) : (
                    " "
                  )}
                  <a
                    href="#"
                    onClick={(e) => {
                      props.updateRareUpperSpoiler(!rareUpperSpoiler);
                      e.preventDefault();
                    }}
                  >
                    Rear Upper Spoiler
                  </a>
                </li>
                {/* Rare Under Spoiler */}
                <li>
                  {rareUnderSpoiler ? (
                    <>
                      <i
                        className="fas fa-check-circle"
                        style={{ color: "green" }}
                      ></i>{" "}
                    </>
                  ) : (
                    " "
                  )}
                  <a
                    href="#"
                    onClick={(e) => {
                      props.updateRareUnderSpoiler(!rareUnderSpoiler);
                      e.preventDefault();
                    }}
                  >
                    Rear Under Spoiler
                  </a>
                </li>
              </ul>
            </div>
          </li>
          <li className="fifthchild">
            <a href="#">Setting</a>
            <div className="sub-menu">
              <ul>
                {!!otherOptions.length &&
                  otherOptions.map((d, i) => (
                    <li key={i} onClick={(e) => updateOtherOptions(d)}>
                      {isOptionActive(d.name) ? (
                        <>
                          <i
                            className="fas fa-check-circle"
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
  updateRareUpperSpoiler,
  updateRareUnderSpoiler,
  updateSideSpoiler,
  updateFrontSpoiler,
  updateOtherOptions,
})(BottomNavigationComponent);
