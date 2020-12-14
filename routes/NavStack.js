import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { primaryDark, white } from "../utils/colors";

import NavTab from "./NavTab";
import Deck from "../screens/Deck";
import Quiz from "../screens/Quiz";
import AddCard from "../screens/AddCard";

const Stack = createStackNavigator();

const stackScreenOptions = {
  headerTintColor: white,
  headerStyle: {
    backgroundColor: primaryDark,
  },
};

const NavStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Mobile Flashcards"
      component={NavTab}
      options={stackScreenOptions}
    />
    <Stack.Screen
      name="AddCard"
      component={AddCard}
      options={stackScreenOptions}
    />
    <Stack.Screen name="Deck" component={Deck} options={stackScreenOptions} />
    <Stack.Screen name="Quiz" component={Quiz} options={stackScreenOptions} />
  </Stack.Navigator>
);

export default NavStack;
