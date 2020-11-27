import React from "react";

import TabNavigator from "./components/TabNavigator";

import StoreContainer from "./components/Store";

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <StoreContainer.Provider>
        <TabNavigator />
      </StoreContainer.Provider>
    );
  }
}
