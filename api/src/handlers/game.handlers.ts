import { Socket } from "socket.io";
import { Game } from "../game/game";
import logger from "../services/logger";
import { ClientEvents, ServerEvents } from "common";
import { Repositories } from "../app";
import { createDealerPlayer } from "../entities/player";
import { GameState } from "common/dtos";
import { application } from "..";

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
      application.emit("gameState:update", game.fetchGameState());
    },
    fetchState: async (callBack: (state: GameState) => void) => {
      const state = game.fetchGameState();
      callBack(state);
    },
  };
};

export default createGameHandlers;
