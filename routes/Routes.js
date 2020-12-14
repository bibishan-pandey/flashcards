import React from "react";
import { StyleSheet, View, StatusBar } from "react-native";

import { NavigationContainer } from "@react-navigation/native";

import { primaryDark, white } from "../utils/colors";

import NavStack from "./NavStack";

const Routes = () => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={primaryDark} barStyle="light-content" />
      <NavigationContainer>
        <NavStack />
      </NavigationContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
  },
});

export default Routes;
