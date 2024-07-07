import { useState, useEffect } from "react";
import Menu from "./components/Menu";
import "./App.css";
import Game from "./components/Game";
import SocketProvider, { useSocket } from './SocketProvider'; 
import SocketManager from "./SocketManager";


function App() {

  return (
    <SocketProvider>
      <SocketManager/>
    </SocketProvider>
  );
}

export default App;
