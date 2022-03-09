import "./App.css";
// we use socket io client library to connected to the front end
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat";

// connect the socket to where the backend is runnning
const socket = io.connect(
  "https://fguaragna97-chat-app-backend.herokuapp.com/"
);

function App() {
  // we create the state for the username and the room they want to join
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const JoinRoom = () => {
    // here we asked if the username and room are not empty
    if (username !== "" && room !== "") {
      // with socket emit we can pass the information to the backend in this case we pass the room
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join A Chat</h3>
          <input
            type="text"
            placeholder="John"
            onChange={(event) => {
              //setting the value of the input to the username
              setUsername(event.target.value);
            }}
          ></input>
          <input
            type="text"
            placeholder="Room ID"
            // setting the value of the input to the room
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          ></input>
          <button onClick={JoinRoom}>Join A Room</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room}></Chat>
      )}
    </div>
  );
}

export default App;
