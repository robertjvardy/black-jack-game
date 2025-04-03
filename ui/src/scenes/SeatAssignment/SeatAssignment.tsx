import classNames from "classnames";
import styles from "./styles.module.css";
import { useEffect } from "react";
import { useGameContext } from "../../module/useGameContext";
import { Player, SeatIndexType } from "common/dtos";
import { SEAT_INDEXES } from "common";
import { assignPlayer } from "../../events/player.events";
import {
  fetchSeatIndex,
  fetchSeatKey,
  storeSeatIndex,
  storeSeatKey,
} from "../../module/localStorageUtils";
import { useNavigate } from "react-router";

const Seat = ({
  index,
  present,
}: {
  index: SeatIndexType;
  present: boolean;
}) => {
  const navigate = useNavigate();
  return (
    <button
      disabled={present}
      className={classNames(styles.seat, { [styles.disabled]: present })}
      onClick={() =>
        assignPlayer(index, (player: Player) => {
          storeSeatKey(player.id);
          storeSeatIndex(player.seatIndex as SeatIndexType);
          navigate("/playerControls");
        })
      }
    >
      {(index as number) + 1}
    </button>
  );
};

const SeatAssignment = () => {
  const navigate = useNavigate();
  const { players } = useGameContext();
  const takenSeatIndexes = players.map((player) => player.seatIndex);

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
        {SEAT_INDEXES.map((index) => {
          return (
            <Seat
              index={index as SeatIndexType}
              present={takenSeatIndexes.includes(index as SeatIndexType)}
              key={index}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SeatAssignment;
