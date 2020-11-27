import React, { useState } from "react";
import { SafeAreaView, Text, View, StyleSheet } from "react-native";
import ClickableButton from "../util/ClickableButton";
import JoinModal from "./JoinModal";
import LoadingModal from "./LoadingModal";
import StoreContainer from "../Store";

function Rooms() {
  let store = StoreContainer.useContainer();
  let [isJoinModalVisible, setJoinModalVisible] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
      <ClickableButton
        onPress={() => (store.room ? store.leaveRoom(store.room) : store.createRoom())}
        color={store.room ? "#c0392b" : "#2980b9"}
        tintColor={"#fff"}
        title={store.room ? "Leave Room" : "Create Room"}
      />
      {store.room ? null : (
        <ClickableButton
          onPress={() => {setJoinModalVisible(!isJoinModalVisible)}}
          color={"#16a085"}
          tintColor={"#fff"}
          title={"Join Room"}
        />
      )}
      <Text style={styles.roomText}>Room: {store.room || "none"}</Text>
      <LoadingModal isVisible={store.isLoading} />
      <JoinModal
        isVisible={isJoinModalVisible}
        toggleVisibility={() => {setJoinModalVisible(!isJoinModalVisible)}}
        join={store.joinRoom}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#222",
  },
  roomText: {
    color: "#fff",
    fontSize: 20,
    marginTop: 30,
  },
});

export default Rooms;
