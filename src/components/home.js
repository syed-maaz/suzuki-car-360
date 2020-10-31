import React, { useEffect, useState } from "react";

import CarExteriorComponent from "./carExterior";
import BottomNavigationComponent from "./bottonNavigation";
import { loadConfig } from "../crud/loadConfigCrud";

const HomePageComponent = () => {
  const [config, setConfig] = useState();
  useEffect(async () => {
    setConfig(await loadConfig());

    console.log(config);
  }, []);
  return (
    <>
      <div className="App">
        <div className="bg">
          <CarExteriorComponent />
        </div>
        <div class="wrapper">
          <BottomNavigationComponent />
        </div>
      </div>
    </>
  );
};

export default HomePageComponent;
