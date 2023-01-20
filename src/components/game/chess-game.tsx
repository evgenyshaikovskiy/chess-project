import { useState } from "react";
import { Board } from "../../game/board";
import { initialBoard } from "../../game/constants";
import ChessBoard from "../board/chess-board";
import { Piece } from "../../game/piece";
import { Position } from "../../game/position";
import { GameState } from "../../game/types";

export default function ChessGame() {
  const [board] = useState<Board>(initialBoard);
  const [isWhiteTurn, setIsWhiteTurn] = useState<Boolean>(
    board.isWhiteTurnToMove
  );
  const [gameState, setGameState] = useState<GameState>(
    GameState.GameIsRunning
  );

  function toggleTurn() {
    setIsWhiteTurn(!isWhiteTurn);
    board.isWhiteTurnToMove = !board.isWhiteTurnToMove;
  }

  // caused a bug in console
  function updateMovesCallback() {
    board.updateMovesForAllPieces();
    setGameState(board.gameState);
  }

  function movePieceToPositionCallback(piece: Piece, position: Position) {
    board.movePieceTo(piece, position);
  }

  function tryToMovePieceToCallback(piece: Piece, position: Position) {
    const result =  board.tryToMovePieceTo(piece, position);

    console.log('Result:', !result);

    return result;
  }

  return (
    <div className="chess-game-wrapper">
      <ChessBoard
        isWhiteTurn={isWhiteTurn}
        initPositions={board.positions}
        movePiece={movePieceToPositionCallback}
        tryToMovePiece={tryToMovePieceToCallback}
        toggleTurn={toggleTurn}
        updateMoves={updateMovesCallback}
      ></ChessBoard>
      <div>
        It is {isWhiteTurn ? "white turn to move" : "black turn to move"}
      </div>
      <div>Game state is {gameState}</div>
    </div>
  );
}
