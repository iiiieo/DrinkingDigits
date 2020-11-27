import React, {Fragment} from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableHighlight,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import Debug from "../util/Debug";

import ClickableButton from "../util/ClickableButton";
import NumberList from "./NumberList";
import LocaleContext from "../util/LocalContext";
import DrinkActionButton from "./DrinkActionButton"

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { numbers: [], room: "" };
    this.handlingActivated = false;
  }

  handleConnection = (socket) => {
    if (!this.handlingActivated) {
      this.handlingActivated = true;
      socket.on("newNumber", (num) => {
        this.addNumber(num);
        Debug("ADDING::" + num);
      });
      socket.on("clear", () => {
        this.setState({ numbers: [] });
        Debug("CLEAR");
      });
    }
  };
  addNumber = (value) => {
    let currentNumbers = this.state.numbers;
    currentNumbers.unshift({ id: generateUID(), value });
    this.setState({ numbers: currentNumbers });
  };
  generateNumber = (socket, room) => {
    let value = Math.floor(Math.random() * 10);
    if (!(socket.connected && room)) {
      Debug("No room or connection");
      this.addNumber(value);
      return;
    }
    Debug("SENDING::" + value);
    socket.emit("newNumber", room, value);
  };
  clearNumbers = (socket, room) => {
    this.setState({ numbers: [] });
    if (!(socket.connected && room)) {
      Debug("No room or connection");
      return;
    }
    socket.emit("clear", room);
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.innerContainer}>
          {this.state.drink && <Text style={styles.heading}>{this.state.drink.type}!</Text>}
          {this.state.drink && <Text style={styles.usernameDrinking}>{this.state.drink.user||"Jemand"} trinkt!</Text>}          
          <NumberList numbers={this.state.numbers} />
          <LocaleContext.Consumer>
            {(loc) => {
              this.handleConnection(loc.socket);
              return (
                <Fragment>
                  <ClickableButton
                    title={
                      this.state.numbers.length === 0
                        ? "Start!"
                        : "Next Number!"
                    }
                    color="#27ae60"
                    onPress={() => this.generateNumber(loc.socket, loc.room)}
                  />
                  <ClickableButton
                    title="Clear"
                    color="#f39c12"
                    onPress={() => this.clearNumbers(loc.socket, loc.room)}
                  />
                </Fragment>
              );
            }}
          </LocaleContext.Consumer>
          <StatusBar hidden={true} />
        </View>
          <DrinkActionButton/>
      </SafeAreaView>
    );
  }
}

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
function generateUID() {
  var S4 = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return (
    S4() +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    S4() +
    S4()
  );
}
