import React from "react";
import { useState, useEffect } from "react";
import SocketProvider, { useSocket } from "./SocketProvider";
import Menu from "./components/Menu";
import Game from "./components/Game";

const SocketManager = () => {
  const [inGame, setInGame] = useState(false);
  const [roomCode, setRoomCode] = useState("");
  const [username, setUsername] = useState("");
  const socket = useSocket();

  useEffect(() => {
    const handleGameCreated = (data) => {
      setRoomCode(data.room); 
      setInGame(true); 
    };

    const handGameJoined = (data) => {
        setRoomCode(data.room);
        setInGame(true);
    }

  
    if (socket) {
      socket.on('game_created', handleGameCreated);
    
      socket.on('game_joined', handGameJoined)

      return () => {
        socket.off('game_created');
        socket.off('game_joined')
      };
    }
  }, [socket]);

  return (

      <>
        {!inGame ? <Menu username={username} setUsername={setUsername} /> :<Game roomCode={roomCode} />}
      </>

  );
};

export default SocketManager;
