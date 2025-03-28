import { Socket } from "socket.io";
import { Game } from "../game/game";
import logger from "../services/logger";
import { ClientEvents, PLAYER_STATUSES, ServerEvents } from "common";
import { Repositories } from "../app";
import { v4 as uuidv4 } from "uuid";
import { PlayerIdType, SeatIndexType, PlayerStatusType } from "common/dtos";
import { PlayerEntity } from "../entities/player";

const gameLogger = logger.child({ module: "GAME" });

const createNewPlayer = (
  playerId: PlayerIdType,
  seatIndex: SeatIndexType
): PlayerEntity => {
  return {
    id: playerId,
    holdings: 500, // TODO make this configurable
    seatIndex,
    status: PLAYER_STATUSES.waiting,
  };
};

const createPlayerHandlers = (
  game: Game,
  socket: Socket<ClientEvents, ServerEvents>,
  repositories: Repositories
) => {
  const { playerRepository } = repositories;
  return {
    addPlayer: async (seatIndex: SeatIndexType) => {
      const playerId = uuidv4();
      gameLogger.info(`Adding Player: ${playerId}`);
      const player = createNewPlayer(playerId, seatIndex);
      await playerRepository.save(player);

      socket.emit("gameState:update", game.fetchGameState());
    },
  };
};

export default createPlayerHandlers;
