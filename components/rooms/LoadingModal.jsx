import React from "react";
import {
  View,
  StyleSheet,
  Modal,
  Platform,
  ActivityIndicator,
  Text,
} from "react-native";
import ModalWeb from "modal-react-native-web";

function JoinModal({ isVisible }) {
  let modal;
  if (Platform.OS === "web") {
    modal = (
      <ModalWeb
        animationType="slide"
        transparent={true}
        visible={isVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <ModalContent />
      </ModalWeb>
    );
  } else {
    modal = (
      <Modal
        animationType="slide"
        transparent={true}
        visible={isVisible}
        onRequestClose={() => {
          toggleVisibility();
        }}
      >
        <ModalContent />
      </Modal>
    );
  }
  return modal;
}
const ModalContent = () => {
  return (
    <View style={styles.centeredView}>
        <ActivityIndicator size="large" color="#0000ff" /> 
    </View>
  );
};
const styles = StyleSheet.create({
  centeredView: {
    backgroundColor: "#0004",
    flex: 1,
    justifyContent: "center",
    padding: 30,
  },
});

export default JoinModal;
