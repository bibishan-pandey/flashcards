import React from "react";
import { StyleSheet, Text } from "react-native";

import { theme } from "../utils/themes";

const TextParagraph = ({ style, children }) => (
  <Text style={[styles.text, style]}>{children}</Text>
);

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    lineHeight: 26,
    color: theme.colors.secondary,
    textAlign: "center",
    marginBottom: 14,
  },
});

export default TextParagraph;
