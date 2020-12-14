import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { FAB, Text } from "react-native-paper";
import CardFlip from "react-native-card-flip";

import { connect } from "react-redux";

import { Button, TextHeader, Paragraph } from "../components";
import {
  error,
  primaryDark,
  primaryLight,
  secondary,
  secondaryLight,
  success,
  white,
} from "../utils/colors";
import { clearLocalNotification, setLocalNotification } from "../utils/helpers";

class Quiz extends React.Component {
  state = {
    cardRotated: false,
    questionIndex: 0,
    correctCount: 0,
    quizCompleted: false,
    viewedAnswer: 0,
    actionsDisabled: false,
  };

  handleCardFlip() {
    if (!this.state.quizCompleted) {
      this.card.flip();
      if (!this.state.cardRotated) {
        this.setState({
          viewedAnswer: ++this.state.viewedAnswer,
        });
      }
    }
  }

  setupNotification() {
    clearLocalNotification().then(setLocalNotification);
  }

  handleMarkQuestion(isCorrect) {
    if (!this.state.quizCompleted) {
      const updatedQuestionIndex = this.state.questionIndex + 1;
      this.state.viewedAnswer === 0 && this.handleCardFlip();
      this.setState({
        actionsDisabled: true,
      });

      setTimeout(
        function () {
          if (this.props.deck.questions.length !== updatedQuestionIndex) {
            this.handleCardFlip();
          }
          this.setState((state, props) => {
            return {
              correctCount: isCorrect
                ? ++state.correctCount
                : state.correctCount,
              questionIndex: updatedQuestionIndex,
              quizCompleted:
                props.deck.questions.length === updatedQuestionIndex,
              viewedAnswer: 0,
              actionsDisabled: false,
            };
          });
        }.bind(this),
        100
      );
    } else {
      this.setupNotification();
    }
  }

  restartQuiz() {
    this.setState({
      cardRotated: false,
      correctCount: 0,
      questionIndex: 0,
      quizCompleted: false,
      viewedAnswer: 0,
    });
    if (!this.state.cardRotated) {
      this.handleCardFlip();
    }
  }

  renderQuiz() {
    const { questions } = this.props.deck;
    const { questionIndex } = this.state;

    return (
      <>
        <View style={styles.cardContainer}>
          <CardFlip style={styles.cardFlip} ref={(card) => (this.card = card)}>
            <TouchableOpacity
              style={[styles.card, styles.cardFront]}
              activeOpacity={0.9}
              onPress={() => this.handleCardFlip()}
            >
              <Text style={[styles.label, styles.labelFront]}>
                {questions[questionIndex].question}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.card, styles.cardBack]}
              activeOpacity={0.9}
              onPress={() => this.handleCardFlip()}
            >
              <Text style={[styles.label, styles.labelBack]}>
                {questions[questionIndex].answer}
              </Text>
            </TouchableOpacity>
          </CardFlip>
          <Text style={{ color: secondary }}>
            Press on the card above to view answer
          </Text>
          <Text style={styles.remainingQuestionText}>
            {this.props.deck.questions.length - questionIndex}{" "}
            {this.props.deck.questions.length - questionIndex > 1
              ? "questions "
              : "question "}
            remaining
          </Text>
        </View>
        <View style={styles.actionContainer}>
          <FAB
            style={[styles.fab, styles.fabLeft]}
            disabled={this.state.actionsDisabled}
            color={error}
            icon={require("../assets/cross-mark.png")}
            onPress={() => this.handleMarkQuestion(false)}
          />
          <FAB
            style={[styles.fab, styles.fabRight]}
            disabled={this.state.actionsDisabled}
            color={success}
            icon={require("../assets/check-mark.png")}
            onPress={() => this.handleMarkQuestion(true)}
          />
        </View>
      </>
    );
  }

  renderQuizCompleted() {
    return (
      <>
        <View style={styles.quizCompletedContainer}>
          <TextHeader style={styles.deckTitle}>Quiz Completed</TextHeader>
          <Paragraph style={styles.deckCardCount}>
            You have answered{" "}
            {Math.round(
              (this.state.correctCount / this.props.deck.questions.length) * 100
            )}
            % correct
          </Paragraph>
          <Button mode="contained" onPress={() => this.restartQuiz()}>
            Restart Quiz
          </Button>

          <Button
            mode="outlined"
            onPress={() => this.props.navigation.goBack()}
          >
            Back to Deck
          </Button>
        </View>
      </>
    );
  }

  render() {
    if (this.state.quizCompleted) {
      return this.renderQuizCompleted();
    } else {
      return this.renderQuiz();
    }
  }
}

function mapStateToProps({ decks }, props) {
  const { deckId } = props.route.params;
  return {
    deck: decks[deckId],
  };
}

export default connect(mapStateToProps)(Quiz);

const styles = StyleSheet.create({
  root: {
    backgroundColor: secondaryLight,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  animatedCardContainer: { flex: 1 },
  cardContainer: {
    flex: 2,
    alignItems: "center",
  },
  cardFlip: {
    flex: 1,
    height: hp("50%"),
    width: wp("100%") - 45,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 10,
  },
  actionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    flex: 1,
    borderRadius: 10,
    shadowColor: "rgba(0,0,0,0.5)",
    shadowOffset: {
      width: 2,
      height: 1,
    },
    shadowOpacity: 0.8,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  cardFront: {
    backgroundColor: secondaryLight,
  },
  cardBack: {
    backgroundColor: primaryDark,
  },
  label: {
    textAlign: "center",
    fontSize: 24,
    padding: 20,
    fontFamily: "System",
  },
  labelFront: { color: white },
  labelBack: { color: white },
  fab: {
    position: "absolute",
    margin: 20,
    bottom: 20,
    zIndex: 9999,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: white,
  },
  fabLeft: {
    left: 0,
    marginBottom: 20,
    borderColor: error,
  },
  fabRight: {
    right: 0,
    marginBottom: 20,
    borderColor: success,
  },
  quizCompletedContainer: {
    flex: 1,
    padding: 20,
    width: "100%",
    maxWidth: 340,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  remainingQuestionText: {
    fontSize: 16,
    paddingTop: 20,
    color: primaryLight,
  },
});
