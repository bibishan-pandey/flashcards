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
