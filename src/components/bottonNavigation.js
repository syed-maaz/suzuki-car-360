import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";

const BottomNavigationComponent = () => {
  const { config } = useSelector((state) => state.config);

  const [variants, setVariants] = useState([]);
  const [colors, setColors] = useState([]);
  const [wheels, setWheels] = useState([]);

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
                    <li key={i}>
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
                    <li key={i}>
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
                    <li key={i}>
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

export default BottomNavigationComponent;
