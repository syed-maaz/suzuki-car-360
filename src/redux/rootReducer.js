import { combineReducers } from "redux";

import configReducer from "./data.reducer";
import carStateReducer from "./carState.reducer";

const rootReducer = combineReducers({
  config: configReducer,
  carState: carStateReducer,
});

export default rootReducer;
