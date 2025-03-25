import { Socket } from "socket.io";
import { Game } from "../game/game";
import logger from "../services/logger";
import { ClientEvents, ServerEvents } from "common";

const gameLogger = logger.child({ module: "GAME" });

const createGameHandlers = (
  game: Game,
  socket: Socket<ClientEvents, ServerEvents>
) => {
  return {
    startGame: () => {
      game.startGame();
      gameLogger.info("Game Started");

      socket.emit("gameState:update", game.fetchGameState());
    },
  };
};

export default createGameHandlers;
