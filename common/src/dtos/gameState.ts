import { Player } from "./player";

export interface GameState {
  started: boolean;
  players: Player[];
}
