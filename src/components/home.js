import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";

import CarExteriorComponent from "./carExterior";
import BottomNavigationComponent from "./bottomNavigation";
import { loadConfig } from "../crud/loadConfigCrud";

import { addConfig } from "../redux/data.reducer";

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
          <CarExteriorComponent />
        </div>
        <div className="wrapper">
          <BottomNavigationComponent />
        </div>
      </div>
    </>
  );
};

export default connect(null, { addConfig })(HomePageComponent);
