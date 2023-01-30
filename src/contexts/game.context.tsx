import { createContext, useState } from "react";
import { Piece } from "../chess/piece";
import { Position } from "../chess/position";
import { GameState } from "../chess/types";
import useToggle from "../hooks/useToggle";
import { prepareClassicBoard, prepareCustomBoard } from "../chess/game";
import { Move } from "../chess/move";

// reflects context of game during unit of time
interface GameContextType {
  selectedPiece: Piece | null;
  isWhiteTurnToMove: boolean;
  positions: Position[];
  gameState: GameState;
  verticalAxis: string[];
  horizontalAxis: string[];
  gameMoves: Move[];
  pickPiece: (piece: Piece | null) => void;
  transferRightToMove: () => void;
  modifyPositions: (positions: Position[]) => void;
  modifyGameState: (state: GameState) => void;
  addMove: (move: Move) => void;
}

export const GameContext = createContext<GameContextType>({
  selectedPiece: null,
  isWhiteTurnToMove: true,
  positions: [],
  gameState: GameState.GAME_IS_RUNNING,
  verticalAxis: [],
  horizontalAxis: [],
  gameMoves: [],
  pickPiece: () => {},
  transferRightToMove: () => {},
  modifyPositions: () => {},
  modifyGameState: () => {},
  addMove: () => {},
});

type GameContextProviderProps = {
  children: any;
  isClassic: boolean;
};

export const GameContextProvider = ({
  children,
  isClassic,
}: GameContextProviderProps) => {
  const { horizontal_axis_start, vertical_axis_start, positions_start } =
    isClassic ? prepareClassicBoard() : prepareCustomBoard();

  const [selectedPiece, setSelectedPiece] = useState<Piece | null>(null);

  const [isWhiteTurnToMove, toggle] = useToggle(true);

  const [positions, setPositions] = useState<Position[]>(
    positions_start.flatMap((x) => x.reverse()).reverse()
  );

  const [gameState, setGameState] = useState<GameState>(
    GameState.GAME_IS_RUNNING
  );

  const [verticalAxis, setVerticalAxis] = useState<string[]>(
    vertical_axis_start.slice().reverse()
  );

  const [horizontalAxis, setHorizontalAxis] = useState<string[]>(
    horizontal_axis_start
  );

  const [gameMoves, setGameMoves] = useState<Move[]>([]);

  const pickPiece = (piece: Piece | null) => {
    setSelectedPiece(piece);
  };

  const transferRightToMove = () => {
    toggle();
    setVerticalAxis([...verticalAxis.reverse()]);
    setHorizontalAxis([...horizontalAxis.reverse()]);
  };

  const modifyPositions = (positions: Position[]) => {
    setPositions([...positions]);
  };

  const modifyGameState = (state: GameState) => {
    setGameState(state);
  };

  const addMove = (move: Move) => {
    setGameMoves([...gameMoves, move]);
  };

  const value = {
    selectedPiece,
    isWhiteTurnToMove,
    positions,
    gameState,
    verticalAxis,
    horizontalAxis,
    gameMoves,
    pickPiece,
    transferRightToMove,
    modifyPositions,
    modifyGameState,
    addMove,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
