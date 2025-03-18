import { io } from "socket.io-client";
import { GameState } from "../../common/types";
import "./App.css";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const socket = io("ws://localhost:8080", {
  reconnectionDelayMax: 10000,
});

function App() {
  socket.on("gameState:update", (gameState: GameState) => {
    console.log(gameState);
  });
  return (
    <>
      <h1>Black Jack</h1>
    </>
  );
}

export default App;
