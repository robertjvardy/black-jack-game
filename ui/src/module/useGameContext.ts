import { createContext, useContext } from "react";
import { GameState, Player } from "common/dtos";

export type GameContextType = {
  gameState: GameState;
  players: Player[];
};

export const defaultGameState = {
  started: false,
  players: [],
};

export const GameContext = createContext<GameContextType>({
  gameState: defaultGameState,
  players: [],
});

export const useGameContext = () => {
  return useContext(GameContext);
};
