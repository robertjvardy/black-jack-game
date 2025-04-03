import { Socket } from "socket.io";
import { Game } from "../game/game";
import logger from "../services/logger";
import { ClientEvents, ServerEvents } from "common";
import { Repositories } from "../app";
import { createDealerPlayer } from "../entities/player";

const gameLogger = logger.child({ module: "GAME" });

const createGameHandlers = (
  game: Game,
  socket: Socket<ClientEvents, ServerEvents>,
  repositories: Repositories
) => {
  const { playerRepository } = repositories;
  return {
    startGame: async () => {
      game.startGame();
      gameLogger.info("Game Started");
      await playerRepository.save(createDealerPlayer());
      socket.emit("gameState:update", game.fetchGameState());
    },
  };
};

export default createGameHandlers;
