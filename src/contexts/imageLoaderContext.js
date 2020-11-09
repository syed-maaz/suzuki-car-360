import React, { useState, createContext } from "react";

const ImageLoadContext = createContext();

const ImageLoadProvider = (props) => {
  const [state, setState] = useState(0);
  return (
    <ImageLoadContext.Provider value={[state, setState]}>
      {props.children}
    </ImageLoadContext.Provider>
  );
};

export { ImageLoadContext, ImageLoadProvider };
