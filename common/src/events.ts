import { Player } from "./dtos";
import { GameState } from "./dtos/gameState";

interface Success<T> {
  data: T;
}

export type Response<T> = Error | Success<T>;

export interface ClientEvents {
  "game:start": () => void;
  "player:add": () => void;
}

export interface ServerEvents {
  "gameState:update": (res: GameState) => void;
  "player:update": (res: Player[]) => void;
}
