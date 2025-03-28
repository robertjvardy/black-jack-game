import { createServer } from "http";
import createApplication from "./app";
import { Game } from "./game/game";
import { InMemoryPlayerRepository } from "./repositories/player.repository";

const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || "0.0.0.0";

const httpServer = createServer();

createApplication({
  httpServer,
  serverOptions: { cors: { origin: ["http://localhost:3000"] } },
  game: new Game(),
  repositories: { playerRepository: new InMemoryPlayerRepository() },
});

httpServer.listen({ port: PORT, hostname: HOST }, () => {
  console.log(`Listening on port: ${PORT}`);
});
