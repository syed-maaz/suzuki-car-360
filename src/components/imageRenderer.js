import React, { useEffect, useState, useContext } from "react";

import ImageTag from "./imageTag";

import { ImageLoadContext } from "../contexts/imageLoaderContext";
import loaderImg from "../images/loading.gif";

const ImageRendererComponent = (props) => {
  const {
    i,
    angle,
    variant,
    color,
    wheel,
    otherOptions,
    rareUnderSpoiler,
    rareUpperSpoiler,
    sideSpoiler,
    frontSpoiler,
    activeNumOfParts,
  } = props;

  const [loadedNumComp, setLoadedNumComp] = useState(0);

  const [loadState, setLoadState] = useContext(ImageLoadContext);

  const [isVariantLoading, setIsVariantLoading] = useState(false);
  const [isWheelLoading, setIsWheelLoading] = useState(false);

  useEffect(() => {
    console.log("loadState", loadState);
  }, [loadState]);

  useEffect(() => {
    if (variant) {
      setIsVariantLoading(true);
    }
  }, [variant, color]);

  useEffect(() => {
    if (variant) {
      setIsWheelLoading(true);
    }
  }, [wheel]);

  // useEffect(() => {
  //   console.log(activeNumOfParts);
  //   if (!prevProps) return;
  //   if (
  //     activeNumOfParts > 0 &&
  //     prevProps.activeNumOfParts !== activeNumOfParts
  //   ) {
  //     setLoadedNumComp(activeNumOfParts);
  //   }
  // }, [activeNumOfParts]);

  const getVariantSrc = (angle) => {
    angle = ("0" + angle).slice(-2);
    const variantFolder = variant.folder;
    const variantName = variant.name;
    const colorFolder = `${variantName}${color.folder}`;

    return `images/baleno-items/${variantFolder}/${colorFolder}/${variantName}${color.fileName}${angle}.png`;
  };

  const getWheeltSrc = (angle) => {
    angle = angle + 1;
    angle = ("0" + angle).slice(-2);

    return `images/baleno-items/${wheel.folder}/${wheel.folder}_${angle}.png`;
  };

  const getShadowtSrc = (angle) => {
    angle = angle;
    angle = ("0" + angle).slice(-2);
    return `images/baleno-items/shadow/shadow_000${angle}.png`;
  };

  const getRareSpoilertSrc = (angle) => {
    angle = angle + 1;
    angle = ("0" + angle).slice(-2);

    return `images/baleno-items/${color.rareUpperSpoilerFolder}/${color.rareUpperSpoilerFolder}_${angle}.png`;
  };

  const getRareUnderSpoilertSrc = (angle) => {
    angle = angle + 1;
    angle = ("0" + angle).slice(-2);
    return `images/baleno-items/${color.rareUnderSpoilerFolder}/${color.rareUnderSpoilerFolder}_${angle}.png`;
  };

  const getSideSpoilertSrc = (angle) => {
    angle = angle + 1;
    angle = ("0" + angle).slice(-2);
    return `images/baleno-items/${color.sideSpoilerFolder}/${color.sideSpoilerFolder}_${angle}.png`;
  };

  const getFrontSpoilertSrc = (angle) => {
    angle = angle + 1;
    angle = ("0" + angle).slice(-2);
    return `images/baleno-items/${color.frontSpoilerFolder}/${color.frontSpoilerFolder}_${angle}.png`;
  };

  const renderOtherOption = (an) => {
    if (Object.keys(otherOptions).length) {
      return Object.keys(otherOptions).map((item, i) => {
        let src = "";
        if (!otherOptions[item]) {
          return;
        }

        let angle = an;
        angle = parseInt(angle) + parseInt(otherOptions[item].startingFrom);
        angle = ("0" + angle).slice(-2);

        if (!!otherOptions[item].reference) {
          const ref = otherOptions[item].reference;
          src = `images/baleno-items/${color[ref]}/${color[ref]}_${angle}.png`;
        } else if (!!otherOptions[item].folder) {
          const folder = otherOptions[item].folder;
          src = `images/baleno-items/${folder}/${folder}_${angle}.png`;
        }
        return (
          <img key={i} src={src} className="w-full absolute left-0 bottom-0" />
        );
      });
    }
  };
  return (
    <div
      className="car-box w-1/2 h-1/2 relative"
      style={{
        display: angle === i ? "" : "none",
      }}
    >
      {isVariantLoading || isWheelLoading ? (
        <div className="flex items-center justify-center fixed inset-0">
          <img
            src={loaderImg}
            className="w-32 md:w-64 image-loading w-full absolute left-0 bottom-0"
          />
        </div>
      ) : (
        ""
      )}

      <img
        src={getVariantSrc(i)}
        onLoad={(e) => setIsVariantLoading(false)}
        className="w-full absolute left-0 bottom-0"
      />
      {/* <ImageTag imgSrc={getVariantSrc(i)}></ImageTag> */}
      <img
        src={getShadowtSrc(i)}
        onLoad={(e) => setLoadedNumComp(loadedNumComp + 1)}
        className="w-full absolute left-0 bottom-0"
      />
      <img
        src={getWheeltSrc(i)}
        onLoad={(e) => setIsWheelLoading(false)}
        className="w-full absolute left-0 bottom-0"
      />
      {!!rareUpperSpoiler ? (
        <img
          src={getRareSpoilertSrc(i)}
          onLoad={(e) => setLoadedNumComp(loadedNumComp + 1)}
          className="w-full absolute left-0 bottom-0"
        />
      ) : (
        " "
      )}
      {!!rareUnderSpoiler ? (
        <img
          src={getRareUnderSpoilertSrc(i)}
          onLoad={(e) => setLoadedNumComp(loadedNumComp + 1)}
          className="w-full absolute left-0 bottom-0"
        />
      ) : (
        " "
      )}
      {!!sideSpoiler ? (
        <img
          src={getSideSpoilertSrc(i)}
          onLoad={(e) => setLoadedNumComp(false)}
          className="w-full absolute left-0 bottom-0"
        />
      ) : (
        " "
      )}
      {!!frontSpoiler ? (
        <img
          src={getFrontSpoilertSrc(i)}
          onLoad={(e) => setLoadedNumComp(false)}
          className="w-full absolute left-0 bottom-0"
        />
      ) : (
        " "
      )}
      {renderOtherOption(i)}
    </div>
  );
};

// export default ImageRendererComponent;

export default React.memo(ImageRendererComponent, (props, nextProps) => {
  if (props.render === nextProps.render) {
    return true;
  }
  return false;
});
