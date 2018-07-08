import { GET_SPOTIFY_OBJECT } from "./types";

export const getSpotifyObject = spotify => async dispatch => {
  dispatch({ type: GET_SPOTIFY_OBJECT, payload: spotify });
};
