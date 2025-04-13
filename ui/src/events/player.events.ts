import { Player, SeatIndexType } from "common/dtos";
import socketClient from "../module/socketClient";

export const assignPlayer = (
  seatIndex: SeatIndexType,
  callback: (player: Player) => void
) => socketClient.emit("players:assign", seatIndex, callback);
