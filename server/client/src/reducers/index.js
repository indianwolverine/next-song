import { combineReducers } from "redux";
import spotifyReducer from "./spotifyReducer";
import userReducer from "./userReducer";
import userIDReducer from "./userIDReducer";
import playlistReducer from "./playlistReducer";
import songReducer from "./songReducer";

export default combineReducers({
  spotify: spotifyReducer,
  user: userReducer,
  userID: userIDReducer,
  playlistID: playlistReducer,
  songs: songReducer
});
