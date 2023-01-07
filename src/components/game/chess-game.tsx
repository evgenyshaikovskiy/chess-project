import { useState } from "react";
import { Board } from "../../game/board";
import { COLS_COUNT, ROWS_COUNT, initialBoard } from "../../game/constants";
import ChessBoard from "../board/chess-board";
import Tile from "../tile/tile";
import { Color } from "../../game/types";
import { Position } from "../../game/position";

export default function ChessGame() {
  const [board, setBoard] = useState<Board>(initialBoard);

  return (
    <div className="chess-game-wrapper">
      <ChessBoard
        initPieces={board.pieces}
        initPositions={board.positions}
      ></ChessBoard>
    </div>
  );
}
