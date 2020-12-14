import React from "react";
import { Platform } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import Ionicons from "react-native-vector-icons/Ionicons";

import { primaryDark, white } from "../utils/colors";

import Decks from "../screens/Decks";
import AddDeck from "../screens/AddDeck";

const Tab =
  Platform.OS === "ios"
    ? createBottomTabNavigator()
    : createMaterialTopTabNavigator();

const NavTab = () => (
  <Tab.Navigator
    tabBarOptions={{
      activeTintColor: Platform.OS === "ios" ? primaryDark : white,
      style: {
        backgroundColor: Platform.OS === "ios" ? white : primaryDark,
        shadowColor: "rgba(0, 0, 0, 0.24)",
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowRadius: 6,
        shadowOpacity: 1,
      },
    }}
    navigationOptions={{
      header: null,
    }}
  >
    <Tab.Screen
      name="Decks"
      component={Decks}
      options={{
        tabBarLabel: "Decks",
        tabBarIcon: ({ size, color }) => (
          <Ionicons name="albums-outline" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Add Deck"
      component={AddDeck}
      options={{
        tabBarLabel: "Add Deck",
        tabBarIcon: ({ size, color }) => (
          <Ionicons name="ios-add-circle-outline" size={size} color={color} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default NavTab;
