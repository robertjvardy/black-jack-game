import { ClientEvents, ServerEvents } from "common";
import { io, Socket } from "socket.io-client";

// TODO make configurable
const socketClient: Socket<ServerEvents, ClientEvents> = io(
  "ws://localhost:8080",
  {
    reconnectionDelayMax: 10000,
  }
);

socketClient.on("connect", () => {
  console.log("Connected: ", socketClient.id);
});

export default socketClient;
