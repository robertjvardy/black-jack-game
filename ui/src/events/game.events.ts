import socketClient from "../module/socketClient";

export const startGameEvent = () => socketClient.emit("game:start");
