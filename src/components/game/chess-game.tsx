import { useState } from "react";
import { Board } from "../../game/board";
import { initialBoard } from "../../game/constants";
import ChessBoard from "../board/chess-board";
import { Piece } from "../../game/piece";
import { Position } from "../../game/position";

export default function ChessGame() {
  const [board] = useState<Board>(initialBoard);
  const [isWhiteTurn, setIsWhiteTurn] = useState<Boolean>(
    board.isWhiteTurnToMove
  );

  function toggleTurn() {
    setIsWhiteTurn(!isWhiteTurn);
    board.isWhiteTurnToMove = !board.isWhiteTurnToMove;
  }

  function updateMovesCallback() {
    board.updateMovesForAllPieces();
  }

  function movePieceToPositionCallback(piece: Piece, position: Position) {
    board.movePieceTo(piece, position);
  }

  return (
    <div className="chess-game-wrapper">
      <ChessBoard
        isWhiteTurn={isWhiteTurn}
        initPositions={board.positions}
        movePiece={movePieceToPositionCallback}
        toggleTurn={toggleTurn}
        updateMoves={updateMovesCallback}
      ></ChessBoard>
      <div>
        It is {isWhiteTurn ? "white turn to move" : "black turn to move"}
      </div>
    </div>
  );
}
