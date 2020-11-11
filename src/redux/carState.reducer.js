/**
 * Types
 */
export const UPDATE_VARIANT = "UPDATE_VARIANT";
export const UPDATE_COLOR = "UPDATE_COLOR";
export const UPDATE_WHEEL = "UPDATE_WHEEL";
export const UPDATE_ANGLE = "UPDATE_ANGLE";
export const UPDATE_RARE_UPPER_SPOILER = "UPDATE_RARE_UPPER_SPOILER";
export const UPDATE_RARE_UNDER_SPOILER = "UPDATE_RARE_UNDER_SPOILER";
export const UPDATE_SIDE_SPOILER = "UPDATE_SIDE_SPOILER";
export const UPDATE_FRONT_SPOILER = "UPDATE_FRONT_SPOILER";
export const UPDATE_OTHER_OPTION = "UPDATE_OTHER_OPTION";

/**
 * Actions
 */
export const updateVariantAction = (config) => {
  return {
    type: UPDATE_VARIANT,
    value: config,
  };
};

export const updateColorAction = (config) => {
  return {
    type: UPDATE_COLOR,
    value: config,
  };
};

export const updateWheelAction = (config) => {
  return {
    type: UPDATE_WHEEL,
    value: config,
  };
};

export const updateangleAction = (config) => {
  return {
    type: UPDATE_ANGLE,
    value: config,
  };
};

export const updateRareUpperSpoiler = (config) => {
  return {
    type: UPDATE_RARE_UPPER_SPOILER,
    value: config,
  };
};

export const updateRareUnderSpoiler = (config) => {
  return {
    type: UPDATE_RARE_UNDER_SPOILER,
    value: config,
  };
};

export const updateSideSpoiler = (config) => {
  return {
    type: UPDATE_SIDE_SPOILER,
    value: config,
  };
};

export const updateFrontSpoiler = (config) => {
  return {
    type: UPDATE_FRONT_SPOILER,
    value: config,
  };
};

export const updateOtherOptions = (config) => {
  return {
    type: UPDATE_OTHER_OPTION,
    value: config,
  };
};

/**
 * Initial State
 */
const INITIAL_STATE = {
  angle: 4,
  wheel: {
    name: "Wheel Type 1",
    folder: "EXT-WH_001-BG_A",
  },
  variant: {
    name: "GL",
    folder: "GL base",
  },
  color: {
    name: "Blue",
    folder: "_Base_Blue",
    fileName: "_BASE _BLUE_000",
    rareUpperSpoilerFolder: "EXT-A_001-BC_ZYR",
    rareUnderSpoilerFolder: "EXT-L_001-BC_ZYR",
    sideSpoilerFolder: "EXT-K_001-BC_ZYR",
    frontSpoilerFolder: "EXT-J_001-BC_ZYR",
    parkingSensor: "EXT-H_001-BC_ZYR",
  },
  rareUpperSpoiler: false,
  rareUnderSpoiler: false,
  sideSpoiler: false,
  frontSpoiler: false,
  otherOptions: {},
};

/**
 * Reducer
 * @param {*} state
 * @param {*} action
 */
const reducer = (state = INITIAL_STATE, action) => {
  console.log("state", action.type);
  console.log(state);
  switch (action.type) {
    case UPDATE_VARIANT:
      return {
        ...state,
        variant: action.value,
      };

    case UPDATE_COLOR:
      return {
        ...state,
        color: action.value,
      };

    case UPDATE_WHEEL:
      return {
        ...state,
        wheel: action.value,
      };

    case UPDATE_ANGLE:
      return {
        ...state,
        angle: action.value,
      };

    case UPDATE_RARE_UPPER_SPOILER:
      return {
        ...state,
        rareUpperSpoiler: action.value,
      };

    case UPDATE_RARE_UNDER_SPOILER:
      return {
        ...state,
        rareUnderSpoiler: action.value,
      };

    case UPDATE_SIDE_SPOILER:
      console.log(action.value);
      return {
        ...state,
        sideSpoiler: action.value,
      };

    case UPDATE_FRONT_SPOILER:
      return {
        ...state,
        frontSpoiler: action.value,
      };

    case UPDATE_OTHER_OPTION:
      return {
        ...state,
        otherOptions: action.value,
      };

    default:
      return state;
  }
};

export default reducer;
