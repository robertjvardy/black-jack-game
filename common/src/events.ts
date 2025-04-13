import { Player, SeatIndexType } from "./dtos";
import { GameState } from "./dtos/gameState";

interface Success<T> {
  data: T;
}

export type Response<T> = Error | Success<T>;

export interface ClientEvents {
  "game:start": () => void;
  "game:fetch-state": (callBack: (gameState: GameState) => void) => void;
  "join-table-room": () => void;
  "leave-table-room": () => void;
  "players:assign": (
    seatIndex: SeatIndexType,
    callBack: (player: Player) => void
  ) => void;
  "players:fetch": (callBack: (players: Player[]) => void) => void;
}

export interface ServerEvents {
  "gameState:update": (res: GameState) => void;
  "players:update": (res: Player[]) => void;
}
