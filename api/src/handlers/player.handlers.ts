import { Socket } from "socket.io";
import { Game } from "../game/game";
import logger from "../services/logger";
import { ClientEvents, ServerEvents } from "common";
import { Repositories } from "../app";
import { v4 as uuidv4 } from "uuid";
import { SeatIndexType, Player } from "common/dtos";
import { createNewPlayer } from "../entities/player";

const gameLogger = logger.child({ module: "PLAYER" });

const createPlayerHandlers = (
  game: Game,
  socket: Socket<ClientEvents, ServerEvents>,
  repositories: Repositories
) => {
  const { playerRepository } = repositories;
  return {
    fetchPlayers: async () => {
      const players = await playerRepository.findAll();
      return players;
    },
    assignPlayer: async (
      seatIndex: SeatIndexType,
      callBack: (players: Player) => void
    ) => {
      const playerId = uuidv4();
      gameLogger.info(
        `Assigning Player: "${playerId}" to seat index: ${seatIndex}`
      );
      const player = createNewPlayer(playerId, seatIndex);
      await playerRepository.save(player);
      const players = await playerRepository.findAll();
      socket.emit("player:update", players);
      callBack(player);
    },
  };
};

export default createPlayerHandlers;
