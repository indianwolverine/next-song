import SpotifyWebApi from "spotify-web-api-js";
import axios from "axios";

import { SET_SPOTIFY_OBJECT, SET_USER_ID, SET_USER } from "./types";

export const setSpotifyObject = spotify => async dispatch => {
  dispatch({ type: SET_SPOTIFY_OBJECT, payload: spotify });
};

export const setUserID = userID => async dispatch => {
  dispatch({ type: SET_USER_ID, payload: userID });
};

export const setUser = user => async dispatch => {
  dispatch({ type: SET_USER, payload: user });
};
