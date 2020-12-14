import { DefaultTheme } from "react-native-paper";
import { error, primary, secondary } from "./colors";

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: primary,
    secondary: secondary,
    error: error,
  },
};
