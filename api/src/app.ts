import { Server as HttpServer } from "http";
import { Server, ServerOptions } from "socket.io";
import { Game } from "./game/game";
import createGameHandlers from "./handlers/game.handlers";
import { ClientEvents, ServerEvents } from "common";
import { PlayerRepository } from "./repositories/player.repository";
import createPlayerHandlers from "./handlers/player.handlers";
import { tableRoomName } from "./shared/constants";
import logger from "./services/logger";

export interface Repositories {
  playerRepository: PlayerRepository;
}

const appLogger = logger.child({ module: "APPLICATION" });

const createApplication = ({
  httpServer,
  serverOptions,
  game,
  repositories,
}: {
  httpServer: HttpServer;
  serverOptions: Partial<ServerOptions>;
  game: Game;
  repositories: Repositories;
}): Server<ClientEvents, ServerEvents> => {
  const io = new Server<ClientEvents, ServerEvents>(httpServer, serverOptions);

  io.on("connection", async (socket) => {
    appLogger.info(`User Connected. Socket id: ${socket.id}`);

    const { startGame, fetchState } = createGameHandlers(
      game,
      socket,
      repositories
    );
    const { fetchPlayers, assignPlayer } = createPlayerHandlers(
      game,
      socket,
      repositories
    );

    socket.on("join-table-room", () => {
      socket.join(tableRoomName);
    });

    socket.on("leave-table-room", () => {
      socket.leave(tableRoomName);
    });

    socket.on("game:start", startGame);
    socket.on("game:fetch-state", fetchState);
    socket.on("players:assign", assignPlayer);
    socket.on("players:fetch", async (callback) =>
      callback(await fetchPlayers())
    );

    socket.emit("gameState:update", game.fetchGameState());
    socket.emit("players:update", await fetchPlayers());
  });

  return io;
};

export default createApplication;
