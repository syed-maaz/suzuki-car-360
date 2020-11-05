import React, { useEffect, useState, useRef } from "react";

const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

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

  const prevAmount = usePrevious(props);

  const [loadedNumComp, setLoadedNumComp] = useState(0);

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
        an = parseInt(an) + parseInt(otherOptions[item].startingFrom);
        an = ("0" + an).slice(-2);

        if (!!otherOptions[item].reference) {
          const ref = otherOptions[item].reference;
          src = `images/baleno-items/${color[ref]}/${color[ref]}_${an}.png`;
        } else if (!!otherOptions[item].folder) {
          const folder = otherOptions[item].folder;
          src = `images/baleno-items/${folder}/${folder}_${an}.png`;
        }
        return <img key={i} src={src} />;
      });
    }
  };
  return (
    <div
      className="car-box"
      style={{
        display: angle === i ? "" : "none",
      }}
    >
      {/* {activeNumOfParts !== loadedNumComp ? (
        <div className="image-loading"></div>
      ) : (
        ""
      )}
      {activeNumOfParts}, {loadedNumComp} */}
      <img
        src={getVariantSrc(i)}
        onLoad={(e) => setLoadedNumComp(loadedNumComp + 1)}
      />
      <img
        src={getShadowtSrc(i)}
        onLoad={(e) => setLoadedNumComp(loadedNumComp + 1)}
      />
      <img
        src={getWheeltSrc(i)}
        onLoad={(e) => setLoadedNumComp(loadedNumComp + 1)}
      />
      {!!rareUpperSpoiler ? (
        <img
          src={getRareSpoilertSrc(i)}
          onLoad={(e) => setLoadedNumComp(loadedNumComp + 1)}
        />
      ) : (
        " "
      )}
      {!!rareUnderSpoiler ? (
        <img
          src={getRareUnderSpoilertSrc(i)}
          onLoad={(e) => setLoadedNumComp(loadedNumComp + 1)}
        />
      ) : (
        " "
      )}
      {!!sideSpoiler ? (
        <img
          src={getSideSpoilertSrc(i)}
          onLoad={(e) => setLoadedNumComp(loadedNumComp + 1)}
        />
      ) : (
        " "
      )}
      {!!frontSpoiler ? (
        <img
          src={getFrontSpoilertSrc(i)}
          onLoad={(e) => setLoadedNumComp(loadedNumComp + 1)}
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
