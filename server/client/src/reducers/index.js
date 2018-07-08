import { combineReducers } from "redux";
import spotifyReducer from "./spotifyReducer";

export default combineReducers({
  spotify: spotifyReducer
});
