import socketClient from "../module/socketClient";

export const assignPlayer = () => socketClient.emit("player:assign");
