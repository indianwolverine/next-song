import { combineReducers } from "redux";
import spotifyReducer from "./spotifyReducer";
import userReducer from "./userReducer";
import userIDReducer from "./userIDReducer";

export default combineReducers({
  spotify: spotifyReducer,
  user: userReducer,
  userID: userIDReducer
});
