import { createContext, useContext } from "react";
import { GameState } from "common/dtos";

export type GameContextType = {
  gameState: GameState;
};

export const defaultGameState = {
  started: false,
  roundInProgress: false,
};

export const GameContext = createContext<GameContextType>({
  gameState: defaultGameState,
});

export const useGameContext = () => {
  return useContext(GameContext);
};
