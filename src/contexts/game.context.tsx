import { createContext, useState } from "react";
import { Piece } from "../chess/piece";
import { Position } from "../chess/position";
import { defaultPositions } from "../chess/constants";
import { GameState } from "../chess/types";

// reflects context of game during unit of time(aka move)
interface GameContextType {
  selectedPiece: Piece | null;
  isWhiteTurnToMove: boolean;
  positions: Position[];
  gameState: GameState;
  pawnToPromote: Piece | null;
  pickPiece: (piece: Piece | null) => void;
  transferRightToMove: () => void;
  modifyPositions: (positions: Position[]) => void;
  modifyGameState: (state: GameState) => void;
  selectPromotionPiece: (piece: Piece | null) => void;
}

export const GameContext = createContext<GameContextType>({
  selectedPiece: null,
  isWhiteTurnToMove: true,
  positions: defaultPositions.flatMap((x) => x.reverse()).reverse(),
  gameState: GameState.GameIsRunning,
  pawnToPromote: null,
  pickPiece: () => {},
  transferRightToMove: () => {},
  modifyPositions: () => {},
  modifyGameState: () => {},
  selectPromotionPiece: () => {},
});

type GameContextProviderProps = {
  children: any;
};

export const GameContextProvider = ({ children }: GameContextProviderProps) => {
  const [selectedPiece, setSelectedPiece] = useState<Piece | null>(null);
  const [isWhiteTurnToMove, setIsWhiteTurnToMove] = useState<boolean>(true);
  const [positions, setPositions] = useState<Position[]>(
    defaultPositions.flatMap((x) => x.reverse()).reverse()
  );
  const [gameState, setGameState] = useState<GameState>(
    GameState.GameIsRunning
  );
  const [pawnToPromote, selectPromotionPiece] = useState<Piece | null>(null);

  const pickPiece = (piece: Piece | null) => {
    setSelectedPiece(piece);
  };

  const transferRightToMove = () => {
    setIsWhiteTurnToMove(!isWhiteTurnToMove);
  };

  const modifyPositions = (positions: Position[]) => {
    setPositions([...positions]);
  };

  const modifyGameState = (state: GameState) => {
    setGameState(state);
  };

  // const pickPromotionPiece = (piece: Piece | null) => {
  //   selectPromotionPiece(piece);
  // };

  const value = {
    selectedPiece,
    isWhiteTurnToMove,
    positions,
    gameState,
    pawnToPromote,
    pickPiece,
    transferRightToMove,
    modifyPositions,
    modifyGameState,
    selectPromotionPiece,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
