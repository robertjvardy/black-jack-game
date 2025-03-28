import { Server as HttpServer } from "http";
import { Server, ServerOptions } from "socket.io";
import { Game } from "./game/game";
import createGameHandlers from "./handlers/game.handlers";
import { ClientEvents, ServerEvents } from "common";
import { PlayerRepository } from "./repositories/player.repository";
import createPlayerHandlers from "./handlers/player.handlers";

export interface Repositories {
  playerRepository: PlayerRepository;
}

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
    console.log("User Connected. Socket id: ", socket.id);

    const { startGame } = createGameHandlers(game, socket, repositories);
    const { fetchPlayers, addPlayer } = createPlayerHandlers(
      game,
      socket,
      repositories
    );

    socket.on("game:start", startGame);
    socket.on("player:add", addPlayer);

    socket.emit("gameState:update", game.fetchGameState());
    socket.emit("player:update", await fetchPlayers());
  });

  return io;
};

export default createApplication;
