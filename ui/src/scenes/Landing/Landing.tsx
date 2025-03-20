import { useNavigate } from "react-router";
import { useGameContext } from "../../module/useGameContext";

const StartGame = ({ handleStartGame }: { handleStartGame: () => void }) => {
  return (
    <div>
      <h3>Start Game</h3>
      <button onClick={handleStartGame}>Start</button>
    </div>
  );
};

const Navigation = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h3>Start Game</h3>
      <button onClick={() => navigate("table")}>View Table</button>
      <button onClick={() => navigate("join")}>Join Game</button>
    </div>
  );
};

const Landing = () => {
  const { gameState, socket } = useGameContext();
  const { started } = gameState;
  const handleStartGame = () => socket.emit("game:start");
  return (
    <div>
      <h1>Welcome to Black Jack</h1>
      {!started && <StartGame handleStartGame={handleStartGame} />}
      {started && <Navigation />}
    </div>
  );
};

export default Landing;
