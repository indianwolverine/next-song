import { SET_SPOTIFY_OBJECT } from "../actions/types";

export default function(state = [], action) {
  switch (action.type) {
    case SET_SPOTIFY_OBJECT:
      return action.payload;
    default:
      return state;
  }
}
