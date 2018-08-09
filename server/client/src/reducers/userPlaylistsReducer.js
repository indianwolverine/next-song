import { SET_USER_PLAYLISTS } from "../actions/types";

export default function(state = [], action) {
  switch (action.type) {
    case SET_USER_PLAYLISTS:
      return action.payload;
    default:
      return state;
  }
}
