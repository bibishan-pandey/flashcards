import {
  ADD_CARD_TO_DECK,
  ADD_DECK,
  GET_DECKS,
  REMOVE_DECK,
} from "./actionTypes";

/**
 * GetDecks action creator that fetches all the decks available
 * @param decks: gets decks object as a parameter
 * @returns {{decks, type: string}}
 */
export const getDecks = (decks) => {
  return {
    type: GET_DECKS,
    decks,
  };
};

/**
 * AddDeck action creator that adds a new deck
 * @param deck: takes in a deck object as a parameter
 * @returns {{deck, type: string}}
 */
export const addDeck = (deck) => {
  return {
    type: ADD_DECK,
    deck,
  };
};

/**
 * AddCardToDeck action creator that adds some card to that particular deck
 * using its id and card object
 * @param deckId, represents in which deck the card should be added to
 * @param card, takes in a card object to add in the deck
 * @returns {{deckId, type: string, card}}
 */
export const addCardToDeck = (deckId, card) => {
  return {
    type: ADD_CARD_TO_DECK,
    deckId,
    card,
  };
};

/**
 * RemoveDeck action creator that removes the deck from all available decks
 * @param deckId, takes in the deckId that needs to be removed
 * @returns {{deckId, type: string}}
 */
export const removeDeck = (deckId) => {
  return {
    type: REMOVE_DECK,
    deckId,
  };
};
