import SpotifyWebApi from "spotify-web-api-js";
import axios from "axios";

import {
  SET_SPOTIFY_OBJECT,
  SET_USER_ID,
  SET_USER,
  SET_PLAYLIST,
  ADD_SONG_TO_QUEUE
} from "./types";

export const setSpotifyObject = spotify => async dispatch => {
  dispatch({ type: SET_SPOTIFY_OBJECT, payload: spotify });
};

export const setUserID = userID => async dispatch => {
  dispatch({ type: SET_USER_ID, payload: userID });
};

export const setUser = user => async dispatch => {
  dispatch({ type: SET_USER, payload: user });
};

export const setPlaylist = playlist => async dispatch => {
  dispatch({ type: SET_PLAYLIST, payload: playlist });
};

export const addSongToQueue = song => async dispatch => {
  dispatch({ type: ADD_SONG_TO_QUEUE, payload: song });
};
