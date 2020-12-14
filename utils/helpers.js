import { AsyncStorage } from "react-native";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";

const NOTIFICATION_KEY = "FLASHCARDS_NOTIFICATION_KEY";

/**
 * This function creates a deck object
 * @param deckTitle
 * @returns {{}}
 */
export function createDeckObject(deckTitle) {
  return {
    [deckTitle]: {
      title: deckTitle,
      questions: [],
    },
  };
}

/**
 * This function creates a card object
 * @param question
 * @param answer
 * @returns {{question, answer}}
 */
export function createCardObject(question, answer) {
  return { question, answer };
}

/**
 * Returns default deck object
 * @returns {object}
 */
export function setupDummyData() {
  return {
    React: {
      title: "React",
      questions: [
        {
          question: "What is React?",
          answer: "A library for managing user interfaces",
        },
        {
          question: "Where do you make Ajax requests in React?",
          answer: "The componentDidMount lifecycle event",
        },
        {
          question: "What is JSX?",
          answer:
            "Stands for JavaScript XML. It allows combining JavaScript with HTML." +
            "Results in easier implementation and clean code.",
        },
      ],
    },
    JavaScript: {
      title: "JavaScript",
      questions: [
        {
          question: "What is a closure?",
          answer:
            "The combination of a function and the lexical environment within " +
            "which that function was declared.",
        },
        {
          question: "What is the use of isNaN function?",
          answer:
            "isNan function returns true if the argument is not a number otherwise it is false.",
        },
        {
          question: "What is negative infinity?",
          answer:
            "Negative Infinity is a number in JavaScript which can be derived by dividing negative number by zero.",
        },
      ],
    },
    "HTML and CSS": {
      title: "HTML and CSS",
      questions: [
        {
          question: "What does HTML stand for?",
          answer: "Hyper Text Markup Language",
        },
        {
          question: "What does CSS stand for?",
          answer: "Cascading Style Sheets",
        },
        {
          question: "Who is making the Web standards?",
          answer: "The World Wide Web Consortium",
        },
      ],
    },
  };
}

/**
 * Returns a notification object
 * @returns {{android: {sound: boolean, sticky: boolean, vibrate: boolean, priority: string}, title: string, body: string, ios: {sound: boolean}}}
 */
function createNotification() {
  return {
    title: "Practice with Flashcards",
    body: "👋🏻 Don't forget to practice your quiz today!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: "high",
      sticky: false,
      vibrate: true,
    },
  };
}

/**
 * Clears all local notification from async storage
 * @returns {Promise<void>}
 */
export async function clearLocalNotification() {
  AsyncStorage.removeItem(NOTIFICATION_KEY).then(
    Notifications.cancelAllScheduledNotificationsAsync
  );
}

/**
 * Checks if notification permission is allowed and schedules or cancels scheduled notification
 * @returns {Promise<void>}
 */
export async function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
          if (status === "granted") {
            Notifications.cancelAllScheduledNotificationsAsync();
            let trigger = new Date();
            trigger.setDate(trigger.getDate() + 1);
            trigger.setHours(20);
            trigger.setMinutes(0);

            Notifications.scheduleNotificationAsync({
              content: createNotification(),
              trigger,
            });
            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
          }
        });
      }
    });
}
