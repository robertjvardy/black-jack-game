import { Server as HttpServer } from "http";
import { Server, ServerOptions } from "socket.io";
import { Game } from "./game/game";
import { CrudRepository } from "./repositories/types";
import { Repositories } from "./types";
import createGameHandlers from "./handlers/game.handlers";
import { ClientEvents, ServerEvents } from "common";
import { PlayerIdType } from "common/dtos";

const createApplication = ({
  httpServer,
  serverOptions,
  game,
  repositories,
}: {
  httpServer: HttpServer;
  serverOptions: Partial<ServerOptions>;
  game: Game;
  repositories: CrudRepository<Repositories, PlayerIdType>[];
}): Server<ClientEvents, ServerEvents> => {
  const io = new Server<ClientEvents, ServerEvents>(httpServer, serverOptions);

  io.on("connection", (socket) => {
    console.log("User Connected. Socket id: ", socket.id);

    const { startGame } = createGameHandlers(game, socket);

    socket.on("game:start", startGame);

    socket.emit("gameState:update", game.fetchGameState());
  });

  return io;
};

export default createApplication;
