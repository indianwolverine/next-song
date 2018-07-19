import { SET_PLAYLIST } from "../actions/types";

export default function(state = [], action) {
  switch (action.type) {
    case SET_PLAYLIST:
      return action.payload;
    default:
      return state;
  }
}
