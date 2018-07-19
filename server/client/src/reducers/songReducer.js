import { ADD_SONG_TO_QUEUE } from "../actions/types";

export default function(state = [], action) {
  switch (action.type) {
    case ADD_SONG_TO_QUEUE:
      return [...state, action.payload];
    default:
      return state;
  }
}
