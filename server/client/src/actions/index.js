import SpotifyWebApi from "spotify-web-api-js";
import axios from "axios";

import { GET_SPOTIFY_OBJECT, /*GET_USER_ID*/ GET_USER } from "./types";

export const getSpotifyObject = spotify => async dispatch => {
  dispatch({ type: GET_SPOTIFY_OBJECT, payload: spotify });
};

// export const getUserId = spotify => async dispatch => {
//   dispatch({ type: GET_USER_ID, payload: spotify});
// };

// export const getUser = spotify => async dispatch => {
//   dispatch({ type: GET_USER, payload: spotify });
// };

/* GET_USER --> all the logic for User and UserID will occur outside of this?*/
export function getUser(api) {
  const user = axios.get("/api/user");

  return {
    type: GET_USER,
    payload: user
  };
}
