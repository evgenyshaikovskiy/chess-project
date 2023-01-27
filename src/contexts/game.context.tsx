import { createContext, useState } from "react";
import { Piece } from "../chess/piece";
import { Position } from "../chess/position";
import { defaultPositions } from "../chess/constants";
import { GameCheckState, GameState } from "../chess/types";
import useToggle from "../hooks/useToggle";

// reflects context of game during unit of time
interface GameContextType {
  selectedPiece: Piece | null;
  isWhiteTurnToMove: boolean;
  positions: Position[];
  gameState: GameState;
  checkState: GameCheckState;
  pickPiece: (piece: Piece | null) => void;
  transferRightToMove: () => void;
  modifyPositions: (positions: Position[]) => void;
  modifyGameState: (state: GameState) => void;
  modifyCheckState: (state: GameCheckState) => void;
}

export const GameContext = createContext<GameContextType>({
  selectedPiece: null,
  isWhiteTurnToMove: true,
  positions: defaultPositions.flatMap((x) => x.reverse()).reverse(),
  gameState: GameState.GAME_IS_RUNNING,
  checkState: GameCheckState.NO_CHECKS,
  pickPiece: () => {},
  transferRightToMove: () => {},
  modifyPositions: () => {},
  modifyGameState: () => {},
  modifyCheckState: () => {},
});

type GameContextProviderProps = {
  children: any;
};

export const GameContextProvider = ({ children }: GameContextProviderProps) => {
  const [selectedPiece, setSelectedPiece] = useState<Piece | null>(null);
  const [isWhiteTurnToMove, toggle] = useToggle(true);
  const [positions, setPositions] = useState<Position[]>(
    defaultPositions.flatMap((x) => x.reverse()).reverse()
  );
  const [gameState, setGameState] = useState<GameState>(
    GameState.GAME_IS_RUNNING
  );
  const [checkState, setCheckState] = useState<GameCheckState>(
    GameCheckState.NO_CHECKS
  );

  const pickPiece = (piece: Piece | null) => {
    setSelectedPiece(piece);
  };

  const transferRightToMove = () => {
    toggle();
  };

  const modifyPositions = (positions: Position[]) => {
    setPositions([...positions]);
  };

  const modifyGameState = (state: GameState) => {
    setGameState(state);
  };

  const modifyCheckState = (state: GameCheckState) => {
    setCheckState(state);
  };

  const value = {
    selectedPiece,
    isWhiteTurnToMove,
    positions,
    gameState,
    checkState,
    pickPiece,
    transferRightToMove,
    modifyPositions,
    modifyGameState,
    modifyCheckState,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
