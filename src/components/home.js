import React, { useEffect, useState } from "react";

import CarExteriorComponent from "./carExterior";
import BottomNavigationComponent from "./bottonNavigation";
import { loadConfig } from "../crud/loadConfigCrud";

const HomePageComponent = () => {
  const [config, setConfig] = useState();

  useEffect(async () => {
    setConfig(await loadConfig());
  }, []);

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

export default HomePageComponent;
