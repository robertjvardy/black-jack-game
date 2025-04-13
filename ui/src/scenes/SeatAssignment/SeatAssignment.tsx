import classNames from "classnames";
import styles from "./styles.module.css";
import { useEffect, useState } from "react";
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
import socketClient from "../../module/socketClient";

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
  const [players, setPlayers] = useState<Player[]>([]);
  const navigate = useNavigate();
  const takenSeatIndexes = players.map((player) => player.seatIndex);

  useEffect(() => {
    socketClient.on("players:update", (players: Player[]) => {
      setPlayers(players);
    });

    socketClient.emit("players:fetch", (p: Player[]) => {
      setPlayers(p);
    });
    const seatKey = fetchSeatKey();
    const seatIndex = fetchSeatIndex();
    if (seatKey && seatIndex) {
      navigate("/playerControls");
    }

    return () => {
      socketClient.off("players:update");
    };
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
