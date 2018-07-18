import { SET_USER_ID } from "../actions/types";

export default function(state = [], action) {
  switch (action.type) {
    case SET_USER_ID:
      return action.payload;
    default:
      return state;
  }
}
