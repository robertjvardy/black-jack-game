import "./App.css";
import { useGameContext } from "./module/useGameContext";

function App() {
  const { socket } = useGameContext();
  const startGame = () => socket.emit("game:start");

  return (
    <>
      <h1>Black Jack</h1>
      <button onClick={startGame}>Start</button>
    </>
  );
}

export default App;
