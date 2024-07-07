import { useState } from "react";
import React from "react";
import { useSocket } from "../SocketProvider";

const Menu = ({username, setUsername}) => {
  const socket = useSocket();
  const [roomCode, setRoomCode] = useState("");

  const handleHost = () => {
    if (socket && username) {
      socket.emit("createRoom", { username: username });
      
    } else {
      console.error(
        "Socket connection not available or username not provided."
      );
    }
  };

  const handleJoin = () => {
    if (socket) {
      socket.emit("joinRoom", { username: username, room: roomCode });
    }
  };

  return (
    <>
   <div className="hero bg-base-200 min-h-screen flex items-center justify-center">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">1v1 Hangman</h1>
            <br></br>
            <div>
              <input
                className="input input-bordered join-item"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <br></br>
            <button className="btn btn-secondary" onClick={handleHost}>
              Host
            </button>
            <br></br>
            <br></br>
            <div className="join">
              <div>
                <div>
                  <input
                    className="input input-bordered join-item"
                    placeholder="Enter room code"
                    value={roomCode}
                    onChange={(e) => setRoomCode(e.target.value)}
                  />
                </div>
              </div>
              <div className="indicator">
                <button
                  className="btn join-item btn-accent"
                  onClick={handleJoin}
                >
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Menu;
