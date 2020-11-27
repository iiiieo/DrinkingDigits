import React from "react";
import { Text, TouchableHighlight, StyleSheet } from "react-native";

const ClickableButton = ({ onPress, title, color, tintColor, style }) => {
  return (
    <TouchableHighlight
      onPress={onPress}
      underlayColor={increaseBrightness(color, 25)}
      style={[styles.button, { backgroundColor: color || "#222" }]}
    >
      <Text style={[styles.buttonText, { color: tintColor || "#fff" }, style]}>
        {title}
      </Text>
    </TouchableHighlight>
  );
};
export const ClickableIconButton = ({ onPress, color, icon }) => {
  return (
    <TouchableHighlight
      onPress={onPress}
      underlayColor={increaseBrightness(color, 25)}
      style={[
        styles.button,
        styles.iconButton,
        {
          backgroundColor: color || "#222",
        },
      ]}
    >
      {icon}
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    margin: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  iconButton: {
    paddingHorizontal: 10,
    alignSelf: "flex-end",
  },
  buttonText: {
    fontSize: 30,
    color: "#fff",
  },
});

export default ClickableButton;

function increaseBrightness(hex, percent) {
  hex = hex.replace(/^\s*#|\s*$/g, "");
  if (hex.length == 3) {
    hex = hex.replace(/(.)/g, "$1$1");
  }
  var r = parseInt(hex.substr(0, 2), 16),
    g = parseInt(hex.substr(2, 2), 16),
    b = parseInt(hex.substr(4, 2), 16);
  return (
    "#" +
    (0 | ((1 << 8) + r + ((256 - r) * percent) / 100)).toString(16).substr(1) +
    (0 | ((1 << 8) + g + ((256 - g) * percent) / 100)).toString(16).substr(1) +
    (0 | ((1 << 8) + b + ((256 - b) * percent) / 100)).toString(16).substr(1)
  );
}
