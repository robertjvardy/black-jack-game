import { Server as HttpServer } from "http";
import { Server, ServerOptions } from "socket.io";
import { ClientEvents, ServerEvents } from "../../common/events";
import { Game } from "./game/game";
import { CrudRepository } from "./repositories/types";
import { IdType } from "../../common/types";
import { Repositories } from "./types";
import createGameHandlers from "./handlers/game.handlers";

const createApplication = ({
  httpServer,
  serverOptions,
  game,
  repositories,
}: {
  httpServer: HttpServer;
  serverOptions: Partial<ServerOptions>;
  game: Game;
  repositories: CrudRepository<Repositories, IdType>[];
}): Server<ClientEvents, ServerEvents> => {
  const io = new Server<ClientEvents, ServerEvents>(httpServer, serverOptions);

  io.on("connection", (socket) => {
    console.log("User Connected. Socket id: ", socket.id);

    const { startGame } = createGameHandlers(game);

    socket.on("game:start", startGame);

    socket.emit("gameState:update", game.updateGameState());
  });

  return io;
};

export default createApplication;
