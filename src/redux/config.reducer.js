/**
 * Types
 */
export const ADD_CONFIG = "ADD_CONFIG";

/**
 * Actions
 */
export const addConfig = (config) => {
  return {
    type: ADD_CONFIG,
    value: config,
  };
};

/**
 * Initial State
 */
const INITIAL_STATE = {
  config: {},
};

/**
 * Reducer
 * @param {*} state
 * @param {*} action
 */
const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_CONFIG:
      return {
        ...state,
        config: action.value,
      };

    default:
      return state;
  }
};

export default reducer;
