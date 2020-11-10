import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";

import CarExteriorComponent from "./carExterior";
import BottomNavigationComponent from "./bottomNavigation";
import { loadConfig } from "../crud/loadConfigCrud";

import { addConfig } from "../redux/data.reducer";

import backgroundImg from "../images/bg.jpg";

const HomePageComponent = (props) => {
  const [config, setConfig] = useState();

  const count = useSelector((state) => state.config);

  useEffect(async () => {
    const { data } = await loadConfig();
    setConfig(data);
  }, []);

  useEffect(async () => {
    // console.log(config);
    props.addConfig(config);
  }, [config]);

  return (
    <>
      <div className="App">
        <div className="bg">
          <div className="wrapper relative">
            <img src={backgroundImg} className="w-full" alt="cover" />
            <div class="absolute inset-0">
              <CarExteriorComponent />
            </div>
            <BottomNavigationComponent />
          </div>
        </div>
      </div>
    </>
  );
};

export default connect(null, { addConfig })(HomePageComponent);
