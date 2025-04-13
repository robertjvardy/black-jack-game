import { Socket } from "socket.io";
import { Game } from "../game/game";
import logger from "../services/logger";
import { ClientEvents, ServerEvents } from "common";
import { Repositories } from "../app";
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
      gameLogger.info(
        `Assigning Player: "${socket.id}" to seat index: ${seatIndex}`
      );
      const player = createNewPlayer(socket.id, seatIndex);
      await playerRepository.save(player);
      const players = await playerRepository.findAll();
      socket.broadcast.emit("players:update", players);
      socket.join(`player-room-${socket.id}`);
      callBack(player);
    },
  };
};

export default createPlayerHandlers;
