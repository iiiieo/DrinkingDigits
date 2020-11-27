import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Modal,
  TouchableHighlight,
  Platform,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import ModalWeb from "modal-react-native-web";
import ClickableButton, { ClickableIconButton } from "../util/ClickableButton";
import { getWidth } from "../util/Width";

function JoinModal({ isVisible, toggleVisibility, join }) {
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
        <ModalContent toggleVisibility={toggleVisibility} join={join} />
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
        <ModalContent toggleVisibility={toggleVisibility} join={join} />
      </Modal>
    );
  }
  return modal;
}
const ModalContent = ({ toggleVisibility, join }) => {
  const [roomId, changeRoomId] = React.useState("");
  return (
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <ClickableIconButton
          onPress={() => toggleVisibility()}
          color={"#c0392b"}
          icon={<Icon name={"close"} size={20} color={"white"}></Icon>}
        />

        <View style={styles.modalCenter}>
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => {let inputText = Platform.OS === "web" ? text.toUpperCase(): text;changeRoomId(inputText)}}
            autoCapitalize={'characters'}
            value={roomId}
            underlineColorAndroid="transparent"
            placeholder="CODE ..."
            maxLength={5}
          />
          <ClickableButton
            onPress={() => {
              if (roomId.length === 5) {
                toggleVisibility();
                changeRoomId("");
                join(roomId);
              }
            }}
            color={"#e67e22"}
            tintColor={"#fff"}
            title={"join"}
            style={styles.button}
          />
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  centeredView: {
    backgroundColor: "#0002",
    flex: 1,
    justifyContent: "center",
    padding: 30,
  },
  modalView: {
    backgroundColor: "#444",
    borderRadius: 10,
    paddingVertical: 10,
  },
  modalCenter: {
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    borderBottomWidth: 0,
    borderColor: "#222",
    color: "#222",
    backgroundColor: "#eee",
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    fontSize: 30,
    textAlign: "center",
    marginVertical: 20,
  },
});

export default JoinModal;
