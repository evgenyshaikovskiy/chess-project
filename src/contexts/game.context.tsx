import { createContext, useState } from "react";
import { Piece } from "../chess/piece";
import { Position } from "../chess/position";
import { defaultPositions } from "../chess/constants";
import { GameState } from "../chess/types";

interface GameContextType {
  selectedPiece: Piece | null;
  isWhiteTurnToMove: boolean;
  positions: Position[];
  gameState: GameState;
  pieces: Piece[];
  pickPiece: (piece: Piece | null) => void;
  transferRightToMove: () => void;
  modifyPieces: (piece: Piece[]) => void;
  modifyPositions: (positions: Position[]) => void;
  modifyGameState: (state: GameState) => void;
}

export const GameContext = createContext<GameContextType>({
  selectedPiece: null,
  isWhiteTurnToMove: true,
  positions: defaultPositions.flatMap((x) => x.reverse()).reverse(),
  gameState: GameState.GameIsRunning,
  pieces: [],
  pickPiece: (piece: Piece | null) => {},
  transferRightToMove: () => {},
  modifyPositions: (positions: Position[]) => {},
  modifyGameState: (state: GameState) => {},
  modifyPieces: (piece: Piece[]) => {},
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
  const [pieces, setPieces] = useState<Piece[]>(
    positions.filter((pos) => pos.piece).map((pos) => pos.piece!)
  );

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

  const modifyPieces = (pieces: Piece[]) => {
    setPieces([...pieces]);
  };

  const value = {
    selectedPiece,
    isWhiteTurnToMove,
    positions,
    gameState,
    pieces,
    pickPiece,
    transferRightToMove,
    modifyPositions,
    modifyGameState,
    modifyPieces,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
