import React from "react";

const BottomNavigationComponent = () => {
  return (
    <div className="bottom-nav">
      <button className="left">Exterior</button>
      <nav>
        <ul>
          <li>
            <a href="#">Car Type</a>
            <div className="sub-menu">
              <ul>
                <li>
                  <a href="#">GL</a>
                </li>
                <li>
                  <a href="#">GLX</a>
                </li>
                <li>
                  <a href="#">GLX+</a>
                </li>
              </ul>
            </div>
          </li>
          <li>
            <a href="#">Spray</a>
            <div className="sub-menu">
              <ul>
                <li>
                  <a href="#">Grey</a>
                </li>
                <li>
                  <a href="#">Blue</a>
                </li>
                <li>
                  <a href="#">White</a>
                </li>
                <li>
                  <a href="#">Silver</a>
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
