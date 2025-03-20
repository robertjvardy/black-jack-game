import { GameState } from "../../../common/types";
import { ReactNode, useState } from "react";
import socketClient from "./socketClient";
import { defaultGameState, GameContext } from "./useGameContext";

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [gameState, setGameState] = useState<GameState>(defaultGameState);

  socketClient.on("gameState:update", (gameState: GameState) => {
    console.log(gameState);
    setGameState(gameState);
  });

  const actions = {};

  return (
    <GameContext.Provider value={{ socket: socketClient, gameState, actions }}>
      {children}
    </GameContext.Provider>
  );
};
