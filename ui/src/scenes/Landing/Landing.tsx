import { useNavigate } from "react-router";
import { useGameContext } from "../../module/useGameContext";
import { startGameEvent } from "../../events/game.events";
import styles from "./styles.module.css";

const StartGame = ({ handleStartGame }: { handleStartGame: () => void }) => {
  return (
    <div className={styles.start}>
      <button onClick={handleStartGame}>Start Game</button>
    </div>
  );
};

const Navigation = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.navigation}>
      <button
        className={styles["table-btn"]}
        onClick={() => navigate("/table")}
      >
        View Table
      </button>
      <button className={styles["join-btn"]} onClick={() => navigate("/join")}>
        Join Game
      </button>
    </div>
  );
};

const Landing = () => {
  const { gameState } = useGameContext();
  const { started } = gameState;
  return (
    <div>
      <h1>Welcome to Black Jack</h1>
      {!started && <StartGame handleStartGame={startGameEvent} />}
      {started && <Navigation />}
    </div>
  );
};

export default Landing;
