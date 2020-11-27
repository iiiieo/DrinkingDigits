import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import ActionButton from "../fab/ActionButton";
import IconIon from "react-native-vector-icons/Ionicons";
import IconMCI from "react-native-vector-icons/MaterialCommunityIcons";

class DrinkActionButton extends Component {
  render() {
    return (
      <ActionButton buttonColor="rgba(231,76,60,1)" hideShadow={true}>
        <ActionButton.Item
          buttonColor="#9b59b6"
          title="Schnaps"
          onPress={() => console.log("notes tapped!")}
        >
        <IconIon name="md-pint" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item
          buttonColor="#3498db"
          title="Wein"
          onPress={() => {}}
        >
        <IconIon name="md-wine" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item
          buttonColor="#1abc9c"
          title="Bier"
          onPress={() => {}}
        >
        <IconIon name="md-beer" style={styles.actionButtonIcon} />
        </ActionButton.Item>
      </ActionButton>
    );
  }
}

const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: "white",
  },
});

export default DrinkActionButton;
