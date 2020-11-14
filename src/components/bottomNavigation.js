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
} from "../redux/carState.reducer";

import { Modal, Header, Title, Body, Footer, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Iframe from "react-iframe";

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

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [donutData, setDonutData] = useState({
    datasets: [
      {
        data: [40, 40, 40, 40, 40, 40, 40, 40, 40],
        backgroundColor: [
          "#0000FF",
          "#676767",
          "#6D6D64",
          "#c0c0c0",
          "#f92420",
          "#f4f3ef",
          "#1b1e23",
          "#ce2029",
          "#ffffff",
        ],
        hoverBackgroundColor: [
          "#0000FF",
          "#676767",
          "#6D6D64",
          "#c0c0c0",
          "#f92420",
          "#f4f3ef",
          "#1b1e23",
          "#ce2029",
          "#ffffff",
        ],
      },
    ],

    labels: [
      "Blue",
      "Granite Gray",
      "Magma Grey",
      "Premium Silver",
      "PHOENIX RED",
      "Arctic white",
      "Midnight Black",
      "Fire Red",
      "White",
    ],
  });

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

  const applyCarColorByIndex = (idx) => {
    props.updateColorAction(colors[idx]);
  };

  return (
    <nav className="absolute inset-x-0 bottom-0 mb-8 md:mb-16 flex items-center justify-center">
      <Modal show={show} onHide={handleClose} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Interior</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Iframe
            url="http://suzuki-360-1100.surge.sh/"
            width="100%"
            height="600px"
            id="myId"
            className="myClassname"
            display="initial"
            position="relative"
          />
        </Modal.Body>
      </Modal>
      <ul className="flex items-center">
        <li>
          <button className="h-12 px-10 rounded text-white bg-black bg-opacity-75 hover:bg-opacity-100 transition ease-in-out duration-300">
            Exterior
          </button>
        </li>
        <li>
          <a className="h-12 rounded text-white" href="#">
            Car Type
          </a>
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
        <li className="color-menu">
          <a className="h-12 rounded text-white" href="#">
            Spray
          </a>
          <div
            className="sub-menu"
            style={{
              height: "200px",
              width: "274px",
              top: "-145px",
              left: "-107px",
            }}
          >
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
                  console.log(element._index);
                  console.log(dataset + " at " + xLabel + ": " + value);
                  applyCarColorByIndex(element._index);
                },
              }}
            />
          </div>
        </li>
        <li>
          <a className="h-12 rounded text-white" href="#">
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
        <li>
          <a className="h-12 rounded text-white" href="#">
            Setting
          </a>
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
        <li>
          <a className="h-12 rounded text-white" href="#">
            Other Options
          </a>
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
            </ul>
          </div>
        </li>
        <li>
          <a className="h-12 rounded text-white" href="#">
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
        <li>
          <button
            className="right h-12 px-10 rounded text-white bg-black bg-opacity-75 hover:bg-opacity-100 transition ease-in-out duration-300"
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
})(BottomNavigationComponent);
