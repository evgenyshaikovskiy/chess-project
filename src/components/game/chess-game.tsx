import { useState } from "react";
import { Board } from "../../game/board";
import { initialBoard } from "../../game/constants";
import ChessBoard from "../board/chess-board";
import { Piece } from "../../game/piece";
import { Position } from "../../game/position";

export default function ChessGame() {
  const [board] = useState<Board>(initialBoard);

  function updateMovesCallback() {
    board.updateMovesForAllPieces();
  }

  function movePieceToPositionCallback(piece: Piece, position: Position) {
    board.movePieceTo(piece, position);
  }

  return (
    <div className="chess-game-wrapper">
      <ChessBoard
        movePiece={movePieceToPositionCallback}
        initPositions={board.positions}
        updateMoves={updateMovesCallback}
      ></ChessBoard>
    </div>
  );
}
