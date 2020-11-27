import { useState } from "react";
import { createContainer } from "unstated-next";
import Debug from "./util/Debug";
import { io } from "socket.io-client";

export const useStore = () => {
  let [room, setRoom] = useState();
  let [isLoading, setLoading] = useState(false);
  let [theme, setTheme] = useState("dark");
  let [numbers, setNumbers] = useState([]);
  let [drink, setDrink] = useState({});

  let socket = io("https://trinkspiel.glitch.me", {
    transports: ["websocket"],
  });
  handleSocketEvents(socket);
  socket.on("newNumber", (num) => {
    addNumber(num);
    Debug("ADDING::" + num);
  });
  socket.on("clear", () => {
    setNumbers([]);
    Debug("CLEAR");
  });
  socket.on("joined", (id) => {
    setRoom(id)
    setLoading(false)
    Debug("ROOM-ID::" + id);
  });
  function addNumber(value) {
    let currentNumbers = [...numbers];
    currentNumbers.unshift({ id: generateUID(), value });
    setNumbers(currentNumbers);
  }
  function generateNumber() {
    let value = Math.floor(Math.random() * 10);
    setTheme(value);
    if (!(socket.connected && room)) {
      Debug("No room or connection");
      addNumber(value);
      return;
    }
    Debug("SENDING::" + value);
    socket.emit("newNumber", room, value);
  }
  function clearNumbers() {
    setNumbers([]);
    if (!(socket.connected && room)) {
      Debug("No room or connection");
      return;
    }
    socket.emit("clear", room);
  }

  let createRoom = () => {
    Debug("Creating room");
    setLoading(true);
    socket.emit("createRoom");
  };
  let joinRoom = (id) => {
    Debug("Joining::" + id);
    setLoading(false);
    socket.emit("joinRoom", id);
  };
  let leaveRoom = (id) => {
    socket.emit("leaveRoom", id);
    setRoom(undefined);
  };

  return {
    room,
    isLoading,
    theme,
    numbers,
    socket,
    createRoom,
    joinRoom,
    leaveRoom,
    clearNumbers,
    generateNumber,
  };
};
function handleSocketEvents(socket) {
  socket.on("connection", () => {
    Debug("connected");
  });
  socket.on("error", (msg) => {
    Debug(msg);
  });
}

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

const StoreContainer = createContainer(useStore);
export default StoreContainer;
