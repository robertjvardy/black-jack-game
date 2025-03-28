import classNames from "classnames";
import styles from "./styles.module.scss";
import { useEffect } from "react";
import { useGameContext } from "../../module/useGameContext";
import { Player } from "common/dtos";
import { assignPlayer } from "../../events/player.events";
import { fetchSeatIndex, fetchSeatKey } from "../../module/localStorageUtils";
import { useNavigate } from "react-router";

const Seat = ({ index, present }: { index: number; present: boolean }) => {
  return (
    <button
      disabled={present}
      className={classNames(styles.seat, { [styles.disabled]: present })}
      onClick={assignPlayer}
    >
      {index + 1}
    </button>
  );
};

const SeatAssignment = () => {
  const navigate = useNavigate();
  const { gameState } = useGameContext();

  useEffect(() => {
    const seatKey = fetchSeatKey();
    const seatIndex = fetchSeatIndex();
    if (seatKey && seatIndex) {
      navigate("/playerControls");
    }
  }, [navigate]);

  return (
    <div className={styles.container}>
      <h1>Select a Seat</h1>
      <div className={styles["seat-selection-container"]}>
        {gameState.players.map((player: Player) => (
          <Seat {...player} key={player.seatIndex} />
        ))}
      </div>
    </div>
  );
};

export default SeatAssignment;
