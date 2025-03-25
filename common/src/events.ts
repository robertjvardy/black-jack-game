import { GameState } from "./dtos/gameState";

interface Success<T> {
  data: T;
}

export type Response<T> = Error | Success<T>;

export interface ClientEvents {
  "game:start": () => void;
}

export interface ServerEvents {
  "gameState:update": (res: GameState) => void;
}
