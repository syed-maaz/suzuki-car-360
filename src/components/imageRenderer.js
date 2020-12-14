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
    basePath,
    startingFrom,
    spoilers,
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

  const fillTemplate = function (templateString, templateVars) {
    var func = new Function(
      ...Object.keys(templateVars),
      "return `" + templateString + "`;"
    );
    return func(...Object.values(templateVars));
  };

  const getVariantSrc = (angle) => {
    // console.log(startingFrom);
    let calAngle = parseInt(angle) + parseInt(variant.variantStartFrom);
    calAngle = ("0" + calAngle).slice(-2);

    const variantFolder = variant.folder;
    const variantName = variant.name;
    const colorFolder = fillTemplate(`${color.folder}`, { variantName });
    const fileName = fillTemplate(`${color.fileName}`, { variantName });

    return `${basePath}/${variantFolder}/${colorFolder}/${fileName}${calAngle}.png`;
  };

  const getWheeltSrc = (angle) => {
    angle = angle + 1;
    angle = ("0" + angle).slice(-2);

    return `${basePath}/${wheel.folder}/${wheel.folder}_${angle}.png`;
  };

  const getShadowtSrc = (angle) => {
    angle = angle;
    angle = ("0" + angle).slice(-2);
    return `${basePath}/shadow/shadow_000${angle}.png`;
  };

  const getRareSpoilertSrc = (angle) => {
    angle = angle + 1;
    angle = ("0" + angle).slice(-2);

    return `${basePath}/${color.rareUpperSpoilerFolder}/${color.rareUpperSpoilerFolder}_${angle}.png`;
  };

  const getRareUnderSpoilertSrc = (angle) => {
    angle = angle + 1;
    angle = ("0" + angle).slice(-2);
    return `${basePath}/${color.rareUnderSpoilerFolder}/${color.rareUnderSpoilerFolder}_${angle}.png`;
  };

  const getSideSpoilertSrc = (angle) => {
    angle = angle + 1;
    angle = ("0" + angle).slice(-2);
    return `${basePath}/${color.sideSpoilerFolder}/${color.sideSpoilerFolder}_${angle}.png`;
  };

  const getFrontSpoilertSrc = (angle) => {
    angle = angle + 1;
    angle = ("0" + angle).slice(-2);
    return `${basePath}/${color.frontSpoilerFolder}/${color.frontSpoilerFolder}_${angle}.png`;
  };

  const renderSpoilers = (an) => {
    if (spoilers && Object.keys(spoilers).length) {
      return Object.keys(spoilers).map((item, i) => {
        let src = "";
        if (!spoilers[item]) {
          return;
        }

        let angle = an;
        angle = parseInt(angle) + parseInt(spoilers[item].startingFrom);
        angle = ("0" + angle).slice(-2);
        console.log(spoilers[item]);
        const folder = fillTemplate(`${spoilers[item].folder}`, {
          colorCode: color.colorCode,
        });
        // spoilers[item].folder;
        src = `${basePath}/${folder}/${folder}_${angle}.png`;

        return (
          <img key={i} src={src} className="w-full absolute left-0 bottom-0" />
        );
      });
    }
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
          src = `${basePath}/${color[ref]}/${color[ref]}_${angle}.png`;
        } else if (!!otherOptions[item].folder) {
          const folder = fillTemplate(`${otherOptions[item].folder}`, {
            colorCode: color.colorCode,
          });
          src = `${basePath}/${folder}/${folder}_${angle}.png`;
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
        <div
          className="flex items-center justify-center fixed inset-0"
          style={{ zIndex: "999999" }}
        >
          <img
            className="w-32 md:w-64"
            src="https://i.ibb.co/FBbkxDD/ezgif-6-8fba730900b1.gif"
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
      {/* {!!rareUpperSpoiler ? (
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
      )} */}
      {renderSpoilers(i)}
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
