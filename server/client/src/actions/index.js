import axios from "axios";

import {
  SET_SPOTIFY_OBJECT,
  SET_USER_ID,
  SET_USER,
  SET_PLAYLIST,
  ADD_SONG_TO_QUEUE,
  SET_ROOM,
  SET_USER_PLAYLISTS
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

export const setPlaylist = data => async dispatch => {
  dispatch({ type: SET_PLAYLIST, payload: data.playlist });

  await axios.post("/api/setRoomPlaylist", {
    playlist: data.playlist,
    room: data.room
  });
};

export const setUserPlaylists = playlists => async dispatch => {
  dispatch({ type: SET_USER_PLAYLISTS, payload: playlists });
};

export const addSongToQueue = song => async dispatch => {
  dispatch({ type: ADD_SONG_TO_QUEUE, payload: song });
};

export const setRoom = room => async dispatch => {
  dispatch({ type: SET_ROOM, payload: room });
};
