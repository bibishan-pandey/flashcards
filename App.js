import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { Provider as StoreProvider } from "react-redux";

import store from "./store";
import { theme } from "./utils/themes";

import Routes from "./routes/Routes";
import { setLocalNotification } from "./utils/helpers";

class App extends React.Component {
  async componentDidMount() {
    await setLocalNotification();
  }

  render() {
    return (
      <>
        <StoreProvider store={store}>
          <PaperProvider theme={theme}>
            <Routes />
          </PaperProvider>
        </StoreProvider>
      </>
    );
  }
}

export default App;
