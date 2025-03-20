import { GameState } from "../../../common/types";

const initialGameState = {
  started: false,
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
