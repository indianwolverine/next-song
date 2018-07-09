import { combineReducers } from "redux";
import spotifyReducer from "./spotifyReducer";
import userReducer from "./userReducer";

export default combineReducers({
  spotify: spotifyReducer,
  user: userReducer
});
