import { Game } from "../game/game";

const createGameHandlers = (game: Game) => {
  return {
    startGame: () => {
      game.startGame();
    },
  };
};

export default createGameHandlers;
