import { GameState } from "common/dtos";
import { ReactNode, useEffect, useState } from "react";
import socketClient from "./socketClient";
import { defaultGameState, GameContext } from "./useGameContext";

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [gameState, setGameState] = useState<GameState>(defaultGameState);

  useEffect(() => {
    socketClient.emit("game:fetch-state", (state) => setGameState(state));
  }, []);

  socketClient.on("gameState:update", (gameState: GameState) => {
    console.log("game state: ", gameState);
    setGameState(gameState);
  });

  return (
    <GameContext.Provider value={{ gameState }}>
      {children}
    </GameContext.Provider>
  );
};
