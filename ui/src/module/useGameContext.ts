import { createContext, useContext } from "react";
import { Socket } from "socket.io-client";
import { GameState } from "../../../common/types";
import { ServerEvents } from "../../../common/events";
import socketClient from "./socketClient";

export type GameContextType = {
  socket: Socket;
  gameState: GameState;
  actions: Record<string, ServerEvents>;
};

export const defaultGameState = {
  started: false,
};

export const GameContext = createContext<GameContextType>({
  socket: socketClient,
  gameState: defaultGameState,
  actions: {},
});

export const useGameContext = () => {
  return useContext(GameContext);
};
