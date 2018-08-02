import { SET_ROOM } from "../actions/types";

export default function(state = "", action) {
  switch (action.type) {
    case SET_ROOM:
      return action.payload || null;
    default:
      return state;
  }
}
