import { GameState } from "../../../common/types";

const initialGameState = {
  started: false,
};

export class Game {
  _gameState: GameState = initialGameState;

  updateGameState(): GameState {
    return this._gameState;
  }

  startGame() {
    this._gameState.started = true;
  }
}
