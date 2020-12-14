import React from "react";
import {
  Alert,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { Card, Colors } from "react-native-paper";

import { connect } from "react-redux";

import { TextHeader, Button, TextInput } from "../components";

import { addDeck as handleAddDeck } from "../store/actions/actionCreators";
import { createDeckObject } from "../utils/helpers";
import { saveDeckInStorage } from "../utils/api";

class AddDeck extends React.Component {
  state = {
    deckTitle: "",
  };

  handleChange = (name) => (value) => {
    this.setState({ [name]: value });
  };

  handleAddDeckPress = async () => {
    const { deckTitle } = this.state;
    const { navigate } = this.props.navigation;

    if (!deckTitle) {
      Alert.alert(
        "Title Required",
        "Please provide a deck title!",
        [{ text: "OK" }],
        { cancelable: false }
      );
      return;
    }

    const { decks } = this.props;
    if (decks[deckTitle]) {
      Alert.alert(
        "Deck Exists",
        "Please provide a different deck title!",
        [{ text: "OK" }],
        { cancelable: false }
      );
      return;
    }

    const { addDeck } = this.props;
    const deck = createDeckObject(deckTitle);
    addDeck(deck);
    await saveDeckInStorage(deck);
    this.setState({ deckTitle: "" });
    navigate("Decks", { deckId: deckTitle });
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <KeyboardAvoidingView behavior="padding">
            <Card style={styles.card}>
              <Card.Content style={styles.cardContent}>
                <TextHeader>Enter the title of your new deck</TextHeader>
                <TextInput
                  label="Deck Title"
                  returnKeyType="done"
                  value={this.state.deckTitle}
                  onChangeText={this.handleChange("deckTitle")}
                  autoCapitalize="sentences"
                />
              </Card.Content>
              <Card.Actions>
                <Button
                  mode="contained"
                  onPress={() => this.handleAddDeckPress()}
                  style={styles.button}
                >
                  Create New Deck
                </Button>
              </Card.Actions>
            </Card>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    );
  }
}

function mapStateToProps({ decks }) {
  return {
    decks,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addDeck: (deckTitle) => {
      dispatch(handleAddDeck(deckTitle));
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

export default connect(mapStateToProps, mapDispatchToProps)(AddDeck);
