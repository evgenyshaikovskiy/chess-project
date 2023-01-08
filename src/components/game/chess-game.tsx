import { useState } from "react";
import { Board } from "../../game/board";
import { initialBoard } from "../../game/constants";
import ChessBoard from "../board/chess-board";

export default function ChessGame() {
  const [board] = useState<Board>(initialBoard);

  function updateMovesCallback() {
    board.updateMovesForAllPieces();
  }

  return (
    <div className="chess-game-wrapper">
      <ChessBoard
        initPositions={board.positions}
        updateMoves={updateMovesCallback}
      ></ChessBoard>
    </div>
  );
}
