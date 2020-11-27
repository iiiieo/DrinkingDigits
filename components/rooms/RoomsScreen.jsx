import React from "react";
import { SafeAreaView, Text, View, StyleSheet } from "react-native";
import ClickableButton from "../util/ClickableButton";
import LocaleContext from "../util/LocalContext";
import JoinModal from "./JoinModal"
import LoadingModal from "./LoadingModal"

class Rooms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isJoinModalVisible: false};
  }
  toggleModal = () => {
    this.setState({isJoinModalVisible: !this.state.isJoinModalVisible});
  };
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <LocaleContext.Consumer>
          {(loc) => (
            <React.Fragment>
              <ClickableButton
                onPress={() =>
                  loc.room ? loc.leaveRoom(loc.room) : loc.createRoom()
                }
                color={loc.room ? "#c0392b" : "#2980b9"}
                tintColor={"#fff"}
                title={loc.room ? "Leave Room" : "Create Room"}
              />
              {loc.room ? null : (
                <ClickableButton
                  onPress={() => this.toggleModal()}
                  color={"#16a085"}
                  tintColor={"#fff"}
                  title={"Join Room"}
                />
              )}
              <Text style={styles.roomText}>Room: {loc.room || "none"}</Text>
              <LoadingModal isVisible={loc.isLoading}/>
              <JoinModal isVisible={this.state.isJoinModalVisible} toggleVisibility={this.toggleModal} join={loc.joinRoom}/>
              {console.log(loc.isLoading)}
            </React.Fragment>
          )}
        </LocaleContext.Consumer>
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
  roomText: {
    color: "#fff",
    fontSize: 20,
    marginTop: 30,
  },
});

export default Rooms;
