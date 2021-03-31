import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { connect } from "react-redux";

import "../styles/color-donut.css";

import { Doughnut } from "react-chartjs-2";

import {
  updateVariantAction,
  updateColorAction,
  updateWheelAction,
  updateRareUpperSpoiler,
  updateRareUnderSpoiler,
  updateSideSpoiler,
  updateFrontSpoiler,
  updateOtherOptions,
  updateSpoilers,
} from "../redux/carState.reducer";

import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Iframe from "react-iframe";

const BottomNavigationComponent = (props) => {
  const { config, carName } = props;

  // const { config } = useSelector((state) => state.config);
  const { carState } = useSelector((state) => state);

  const [variants, setVariants] = useState([]);
  const [colors, setColors] = useState([]);
  const [wheels, setWheels] = useState([]);
  const [otherOptions, setOtherOptions] = useState([]);
  const [spoilers, setSpoilers] = useState([]);

  const [rareUpperSpoiler, setRareUpperSpoiler] = useState(false);
  const [rareUnderSpoiler, setRareUnderSpoiler] = useState(false);
  const [sideSpoiler, setSideSpoiler] = useState(false);
  const [frontSpoiler, setFrontSpoiler] = useState(false);

  const [cWheel, setCWheel] = useState({});
  const [cVariant, setCVariant] = useState({});
  const [cColor, setCColor] = useState({});
  const [cOther, setCOther] = useState({});
  const [cSpoiler, setCSpoiler] = useState({});

  const [isAllOtherOptionSelected, setIsAllOtherOptionSelected] = useState(
    false
  );

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [donutData, setDonutData] = useState({});

  useEffect(() => {
    // console.log(config);
    if (!!config && !!config.variants) {
      setVariants(config.variants);
    }
    if (!!config && !!config.colors) {
      configColorDonut(config.colors);
    }
    if (!!config && !!config.wheels) {
      setWheels(config.wheels);
    }
    if (!!config && !!config.otherOptions) {
      setOtherOptions(config.otherOptions);
      config.otherOptions.forEach((op) => {
        if (!!op.defaultVisible) {
          updateOtherOptions(op);
        }
      });
    }
    if (!!config && !!config.spoilers) {
      setSpoilers(config.spoilers);
    }
  }, [config]);

  useEffect(() => {
    // console.log(carState);
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

  const configColorDonut = (colors) => {
    setColors(colors);
    const donutData = {};
    const datasets = {};

    datasets.backgroundColor = colors.map((d) => d.colorHash);
    datasets.data = [...Array(colors.length)].map(
      (e, index) => 360 / colors.length
    );

    donutData.labels = colors.map((d) => d.name);
    donutData.datasets = new Array(datasets);

    setDonutData(donutData);
    // console.log(donutData);
  };

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

  const isSpoilerActive = (name) => {
    return !!cSpoiler[name];
  };

  const updateSpoilers = (op) => {
    if (!!cSpoiler[op.name]) {
      delete cSpoiler[op.name];
    } else {
      cSpoiler[op.name] = op;
    }

    props.updateSpoilers(cSpoiler);
  };

  const applyCarColorByIndex = (idx) => {
    props.updateColorAction(colors[idx]);
  };

  const renderColorDonut = (donutData) => {
    // console.log(donutData);
    return (
      <>
        <Doughnut
          data={donutData}
          options={{
            legend: {
              display: false,
            },
            tooltips: {
              callbacks: {
                label: function (tooltipItem, data) {
                  return data.labels[tooltipItem.index];
                },
              },
            },
            responsive: true,
            maintainAspectRatio: true,
            onClick: (event, elements) => {
              const chart = elements[0]._chart;
              const element = chart.getElementAtEvent(event)[0];
              const dataset = chart.data.datasets[element._datasetIndex];
              const xLabel = chart.data.labels[element._index];
              const value = dataset.data[element._index];

              applyCarColorByIndex(element._index);
            },
          }}
        />
      </>
    );
  };

  return (
    <nav className="absolute w-full inset-x-0 bottom-0 md:mb-8 md:mb-16 md:flex md:items-center md:justify-center">
      <Modal
        id="interior-modal"
        show={show}
        onHide={handleClose}
        size="xl"
        style={{ zIndex: "9999" }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Interior</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Iframe
            src={`/360/${carName}`}
            width="100%"
            height="600px"
            id="myId"
            className="myClassname"
            display="initial"
            position="relative"
          />
        </Modal.Body>
      </Modal>
      <ul className="flex space-x-px md:space-x-1 items-center">
        <li className="w-full">
          <button className="h-12 px-3 md:px-10 md:rounded text-white bg-black bg-opacity-75 hover:bg-opacity-100 transition ease-in-out duration-300">
            Exterior
          </button>
        </li>
        <li className="w-full">
          <a className="h-12 md:rounded text-white w-full md:w-12" href="#">
            Car Type
          </a>
          <div className="sub-menu">
            <ul>
              {!!variants.length &&
                variants.map((d, i) => (
                  <li
                    key={i}
                    onClick={(e) => {
                      props.updateVariantAction(d);
                      // console.log(d.defaultWheelType);
                      d.defaultWheelType &&
                        props.updateWheelAction(d.defaultWheelType);
                    }}
                  >
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
        <li className="color-menu w-full">
          <a className="h-12 md:rounded text-white w-full md:w-12" href="#">
            Spray
          </a>
          <div
            className="sub-menu"
            style={{
              height: "150px",
              width: "274px",
              top: "-150px",
              left: "-112px",
              background: "none",
            }}
          >
            {renderColorDonut(donutData)}
          </div>
        </li>
        <li className="w-full">
          <a className="h-12 md:rounded text-white w-full md:w-12" href="#">
            Wheels
          </a>
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
        <li className="w-full">
          <a className="h-12 md:rounded text-white w-full md:w-12" href="#">
            Setting
          </a>
          <div className="sub-menu">
            <ul>
              {!!spoilers.length &&
                spoilers.map((d, i) => (
                  <li key={i} onClick={(e) => updateSpoilers(d)}>
                    {isSpoilerActive(d.name) ? (
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
                        e.preventDefault();
                      }}
                    >
                      {d.name}
                    </a>
                  </li>
                ))}
              {!spoilers.length ? <li>No Spoilers</li> : ""}
            </ul>
          </div>
        </li>
        <li className="w-full">
          <a className="h-12 md:rounded text-white w-full md:w-12" href="#">
            Other Options
          </a>
          <div className="sub-menu">
            <ul>
              <li
                onClick={(e) => {
                  e.preventDefault();
                  setIsAllOtherOptionSelected(!isAllOtherOptionSelected);
                  otherOptions.map((d, i) => {
                    updateOtherOptions(d);
                  });
                }}
              >
                {isAllOtherOptionSelected ? (
                  <>
                    <i
                      className="fas fa-check-circle"
                      style={{ color: "green" }}
                    ></i>{" "}
                  </>
                ) : (
                  " "
                )}
                <a href="#">Select All</a>
              </li>
              {!!otherOptions.length &&
                otherOptions.map((d, i) => (
                  <>
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
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                        }}
                      >
                        {d.name}
                      </a>
                    </li>
                  </>
                ))}
            </ul>
          </div>
        </li>
        <li className="w-full">
          <a className="h-12 md:rounded text-white w-full md:w-12" href="#">
            Variant
          </a>
          <div className="sub-menu list whitespace-normal flex">
            <ul className="text-left grid grid-cols-2">
              <li>
                <div className="text-xs md:text-base font-semibold text-red-500">
                  Grade
                </div>
                <div className="text-xs md:text-base mt-1 text-sm text-gray-800">
                  {cVariant.name}
                </div>
                <div className="text-xs md:text-base font-semibold text-red-500 mt-2">
                  Body Colour
                </div>
                <div className="text-xs md:text-base mt-1 text-sm text-gray-800">
                  {cColor.name}
                </div>
                <div className="text-xs md:text-base font-semibold text-red-500 mt-2">
                  Wheel Type
                </div>
                <div className="text-xs md:text-base mt-1 text-sm text-gray-800">
                  {cWheel.name}
                </div>
              </li>
              {/* <!-- left --> */}
              <li>
                <div className="text-xs md:text-base font-semibold text-red-500">
                  Option & Accessories
                </div>

                {rareUpperSpoiler ? (
                  <div className="text-xs md:text-base mt-1 text-sm text-gray-800">
                    Rare Spoiler
                  </div>
                ) : (
                  ""
                )}
                {frontSpoiler ? (
                  <div className="text-xs md:text-base mt-1 text-sm text-gray-800">
                    Front Spoiler
                  </div>
                ) : (
                  ""
                )}
                {sideSpoiler ? (
                  <div className="text-xs md:text-base mt-1 text-sm text-gray-800">
                    Side Spoiler
                  </div>
                ) : (
                  ""
                )}
                {!!Object.keys(cOther).length &&
                  Object.keys(cOther).map((d) => (
                    <div className="text-xs md:text-base mt-1 text-sm text-gray-800">
                      {d}
                    </div>
                  ))}
              </li>
              {/* <!-- right --> */}
            </ul>
          </div>
        </li>
        <li className="w-full">
          <button
            className="right h-12 px-3 md:px-10 md:rounded text-white bg-black bg-opacity-75 hover:bg-opacity-100 transition ease-in-out duration-300"
            onClick={handleShow}
          >
            Interior
          </button>
        </li>
      </ul>
    </nav>
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
  updateSpoilers,
})(BottomNavigationComponent);
