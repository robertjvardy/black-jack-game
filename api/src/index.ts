import { createServer } from "http";
import createApplication from "./app";
import { Game } from "./game/game";
import { InMemoryPlayerRepository } from "./repositories/player.repository";
import logger from "./services/logger";

const appLogger = logger.child({ module: "APPLICATION" });

const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || "0.0.0.0";

const httpServer = createServer();

export const application = createApplication({
  httpServer,
  serverOptions: { cors: { origin: ["http://localhost:3000"] } },
  game: new Game(),
  repositories: { playerRepository: new InMemoryPlayerRepository() },
});

httpServer.listen({ port: PORT, hostname: HOST }, () => {
  appLogger.info(`Listening on port: ${PORT}`);
  appLogger.info(`STARTING_HOLDINGS: ${process.env.STARTING_HOLDINGS}`);
});
