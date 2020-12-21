import React, { useEffect, useState, useContext } from "react";
import { ImageLoadContext } from "../contexts/imageLoaderContext";

const ImageTag = (props) => {
  const { imgSrc } = props;
  const [loadState, setLoadState] = useContext(ImageLoadContext);

  useEffect(() => {
    setLoadState(loadState + 1);
  }, [imgSrc]);

  return (
    <>
      {loadState}
      <img src={imgSrc} />
    </>
  );
};
export default ImageTag;
