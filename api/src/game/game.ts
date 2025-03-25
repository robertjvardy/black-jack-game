import { GameState } from "common/dtos";

const initialGameState = {
  started: false,
  players: [],
};

export class Game {
  #gameState: GameState = initialGameState;

  fetchGameState(): GameState {
    return this.#gameState;
  }

  startGame() {
    this.#gameState.started = true;
  }
}
