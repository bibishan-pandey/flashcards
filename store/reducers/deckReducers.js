import {
  ADD_CARD_TO_DECK,
  ADD_DECK,
  GET_DECKS,
  REMOVE_DECK,
} from "../actions/actionTypes";

const decks = (state = {}, action) => {
  switch (action.type) {
    case GET_DECKS:
      return {
        ...state,
        ...action.decks,
      };
    case ADD_DECK:
      return {
        ...state,
        ...action.deck,
      };
    case ADD_CARD_TO_DECK:
      return {
        ...state,
        [action.deckId]: {
          ...state[action.deckId],
          questions: [...state[action.deckId].questions, action.card],
        },
      };
    case REMOVE_DECK:
      delete state[action.deckId];
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default decks;
