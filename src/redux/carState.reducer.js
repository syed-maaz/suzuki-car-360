/**
 * Types
 */
export const UPDATE_VARIANT = "UPDATE_VARIANT";
export const UPDATE_COLOR = "UPDATE_COLOR";
export const UPDATE_WHEEL = "UPDATE_WHEEL";
export const UPDATE_ANGLE = "UPDATE_ANGLE";
export const TOGGLE_RARE_SPOILER = "TOGGLE_RARE_SPOILER";

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
    rareWindspoiler: "EXT-A_001-BC_ZYR",
  },
};

/**
 * Reducer
 * @param {*} state
 * @param {*} action
 */
const reducer = (state = INITIAL_STATE, action) => {
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
      console.log("wah awh");
      return {
        ...state,
        angle: action.value,
      };

    default:
      return state;
  }
};

export default reducer;
