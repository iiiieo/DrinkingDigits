import React from "react";

import TabNavigator from "./components/TabNavigator";
import { io } from "socket.io-client";

import LocaleContext from "./components/util/LocalContext";
import Debug from "./components/util/Debug"

export default class App extends React.Component {
  constructor(props) {
    super(props);
    let socket = io("https://trinkspiel.glitch.me", {
      transports: ["websocket"],
    })
    let createRoom = () => {
      Debug("Creating room")
      this.setState({isLoading: true})
      socket.emit("createRoom");
    }
    let joinRoom = (id) => {
      Debug("Joining::"+id)
      this.setState({isLoading: true})
      socket.emit("joinRoom", id);
    }
    let leaveRoom = (id) => {
      socket.emit("leaveRoom", id);
      this.setState({ room: undefined });
    }
    this.handleConnection(socket)
    this.state = {
      theme: "dark",
      socket,
      createRoom,
      joinRoom,
      leaveRoom,
      isLoading: false,
    };
  }

  handleConnection = (socket) => {
    socket.on("connection", () => {
      Debug("connected");
    });
    socket.on("error", (msg) => {
      Debug(msg);
    });
    socket.on("joined", (id) => {
      this.setState({ room: id, isLoading: false });
      Debug("ROOM-ID::" + id);
    });
  };
  componentDidMount() {}
  render() {
    return (
      <LocaleContext.Provider value={this.state}>
        <TabNavigator />
      </LocaleContext.Provider>
    );
  }
}
