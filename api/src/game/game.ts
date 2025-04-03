import { GameState } from "common/dtos";

const initialGameState = {
  started: false,
  roundInProgress: false,
};

export class Game {
  #gameState: GameState = initialGameState;

  fetchGameState(): GameState {
    return this.#gameState;
  }

  startGame() {
    this.#gameState.started = true;
  }

  restartGame() {
    this.#gameState = initialGameState;
  }
}
