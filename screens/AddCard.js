import React from "react";
import {
  Alert,
  StyleSheet,
  ScrollView,
  View,
  KeyboardAvoidingView,
} from "react-native";
import { Card, Colors } from "react-native-paper";

import { connect } from "react-redux";

import { Button, TextHeader, TextInput } from "../components";
import { addCardToDeck as handleAddCardToDeck } from "../store/actions/actionCreators";
import { createCardObject } from "../utils/helpers";
import { saveCardInStorage } from "../utils/api";

class AddCard extends React.Component {
  state = {
    question: "",
    answer: "",
  };

  handleChange = (name) => (value) => {
    this.setState({ [name]: value });
  };

  async onAddCardPress() {
    const { deckId } = this.props.route.params;
    const { question, answer } = this.state;
    if (!question || !answer) {
      Alert.alert(
        "Both Fields Required",
        "Please provide question and answer.",
        [{ text: "OK" }],
        { cancelable: false }
      );
      return;
    }

    const { addCardToDeck } = this.props;
    const { goBack } = this.props.navigation;
    const card = createCardObject(question, answer);
    await saveCardInStorage(card, deckId);
    addCardToDeck(deckId, card);
    goBack();
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <KeyboardAvoidingView behavior="padding">
            <Card style={styles.card}>
              <Card.Content style={styles.cardContent}>
                <TextHeader>Enter the title of your card</TextHeader>
                <TextInput
                  label="Question"
                  returnKeyType="done"
                  value={this.state.question}
                  onChangeText={this.handleChange("question")}
                  autoCapitalize="sentences"
                />
                <TextHeader>Enter the answer of your card</TextHeader>
                <TextInput
                  label="Answer"
                  returnKeyType="done"
                  value={this.state.answer}
                  onChangeText={this.handleChange("answer")}
                  autoCapitalize="sentences"
                />
              </Card.Content>
              <Card.Actions>
                <Button
                  mode="contained"
                  style={styles.button}
                  onPress={() => this.onAddCardPress()}
                >
                  Add New Card
                </Button>
              </Card.Actions>
            </Card>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addCardToDeck: (deckId, card) => {
      dispatch(handleAddCardToDeck(deckId, card));
    },
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.grey100,
  },
  card: {
    flex: 1,
  },
  cardContent: {
    paddingTop: 30,
    paddingBottom: 30,
  },
});

export default connect(null, mapDispatchToProps)(AddCard);
