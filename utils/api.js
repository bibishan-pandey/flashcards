import { AsyncStorage } from "react-native";

const MOBILE_FLASHCARDS_STORAGE_KEY = "MOBILE_FLASHCARDS_STORAGE_KEY";

/**
 * Get decks list from async storage
 * @returns {Promise<any>}
 */
export async function getDecksFromStorage() {
  let decks = await AsyncStorage.getItem(MOBILE_FLASHCARDS_STORAGE_KEY);
  return JSON.parse(decks);
}

/**
 * Save a deck in async storage
 * @param deck
 * @returns {Promise<void>}
 */
export async function saveDeckInStorage(deck) {
  await AsyncStorage.mergeItem(
    MOBILE_FLASHCARDS_STORAGE_KEY,
    JSON.stringify(deck)
  );
}

/**
 * Save all decks in async storage
 * @param decks
 * @returns {Promise<void>}
 */
export async function saveAllDecksInStorage(decks) {
  await AsyncStorage.setItem(
    MOBILE_FLASHCARDS_STORAGE_KEY,
    JSON.stringify(decks)
  );
}

/**
 * Save a card in async storage
 * @param card
 * @param deckId
 * @returns {Promise<void>}
 */
export async function saveCardInStorage(card, deckId) {
  const decksData = await AsyncStorage.getItem(MOBILE_FLASHCARDS_STORAGE_KEY);
  const decks = JSON.parse(decksData);

  decks[deckId] = {
    ...decks[deckId],
    questions: [...decks[deckId].questions, card],
  };
  await AsyncStorage.setItem(
    MOBILE_FLASHCARDS_STORAGE_KEY,
    JSON.stringify(decks)
  );
}

/**
 * Remove all decks from async storage
 * @returns {Promise<void>}
 */
export async function removeAllDecksFromStorage() {
  await AsyncStorage.clear();
}

/**
 * Remove a deck from async storage
 * @param deckId
 * @returns {Promise<void>}
 */
export async function removeDeckFromStorage(deckId) {
  const decksData = await AsyncStorage.getItem(MOBILE_FLASHCARDS_STORAGE_KEY);
  const decks = JSON.parse(decksData);
  decks[deckId] = undefined;
  delete decks[deckId];
  await AsyncStorage.setItem(
    MOBILE_FLASHCARDS_STORAGE_KEY,
    JSON.stringify(decks)
  );
}
