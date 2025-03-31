import { GameState, Player } from "common/dtos";
import { ReactNode, useState } from "react";
import socketClient from "./socketClient";
import { defaultGameState, GameContext } from "./useGameContext";

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [gameState, setGameState] = useState<GameState>(defaultGameState);
  const [playerState, setPlayerState] = useState<Player[]>([]);

  socketClient.on("gameState:update", (gameState: GameState) => {
    console.log("game state: ", gameState);
    setGameState(gameState);
  });

  socketClient.on("player:update", (players: Player[]) => {
    console.log("players: ", players);
    setPlayerState(players);
  });

  return (
    <GameContext.Provider value={{ gameState, players: playerState }}>
      {children}
    </GameContext.Provider>
  );
};
