import { useNavigate } from "react-router";
import { useGameContext } from "../../module/useGameContext";
import { startGameEvent } from "../../events/game.events";
import { resetLocalStorage } from "../../module/localStorageUtils";

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
  const { gameState } = useGameContext();
  const { started } = gameState;
  const handleStartGame = () => {
    startGameEvent();
    resetLocalStorage();
  };
  return (
    <div>
      <h1>Welcome to Black Jack</h1>
      {!started && <StartGame handleStartGame={handleStartGame} />}
      {started && <Navigation />}
    </div>
  );
};

export default Landing;
