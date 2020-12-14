import React from "react";
import { StyleSheet, Text } from "react-native";
import { theme } from "../utils/themes";

const TextHeader = ({ style, children }) => (
  <Text style={[styles.header, style]}>{children}</Text>
);

const styles = StyleSheet.create({
  header: {
    fontSize: 18,
    color: theme.colors.primary,
    fontWeight: "bold",
    paddingTop: 16,
    paddingBottom: 4,
  },
});

export default TextHeader;
