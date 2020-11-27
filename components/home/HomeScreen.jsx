import React, { Fragment } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableHighlight,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import StoreContainer from "../Store";

import ClickableButton from "../util/ClickableButton";
import NumberList from "./NumberList";
import DrinkActionButton from "./DrinkActionButton";

function HomeScreen() {
  let store = StoreContainer.useContainer();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        {store.drink && <Text style={styles.heading}>{store.drink.type}!</Text>}
        {store.drink && (
          <Text style={styles.usernameDrinking}>
            {store.drink.user || "Jemand"} trinkt!
          </Text>
        )}
        <NumberList numbers={store.numbers} />
        <Fragment>
          <ClickableButton
            title={store.numbers.length === 0 ? "Start!" : "Next Number!"}
            color="#27ae60"
            onPress={() => store.generateNumber()}
          />
          <ClickableButton
            title="Clear"
            color="#f39c12"
            onPress={() => store.clearNumbers()}
          />
        </Fragment>
        <StatusBar hidden={true} />
      </View>
      <DrinkActionButton />
    </SafeAreaView>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#222",
  },
  innerContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 100,
    backgroundColor: "#222",
  },
});
