import { Piece } from "../../game/piece";
import { Position } from "../../game/position";
import "./chess-board.styles.scss";
import { Color } from "../../game/types";
import Tile from "../tile/tile";
import { useState } from "react";

type ChessBoardProps = {
  initPieces: Piece[];
  initPositions: Position[][];
};

export const ChessBoard = ({ initPieces, initPositions }: ChessBoardProps) => {
  const [positions, setPositions] = useState<Position[][]>(initPositions);
  const [pieces, setPieces] = useState<Piece[]>(initPieces);

  // when first created need to initialize tiles
  // careful with rerendering, so it does not call tiles method again

  return (
    <div className="chess-board-wrapper">
      <div className="tiles-wrapper">
        {positions
          .flatMap((x) => x)
          .map((position) => {
            const color =
              (position.x + position.y) % 2 === 0 ? Color.BLACK : Color.WHITE;

            // optimization for react keys
            const uniqKey = (position.x + 1) * 10 + (position.y + 1);
            return (
              <Tile color={color} position={position} key={uniqKey}></Tile>
            );
          })}
      </div>
      <div className="flip-board-btn-wrapper">
        <button
          className="flip-board-btn"
          onClick={() => setPositions([...positions.reverse()])}
        >
          Flip Board
        </button>
      </div>
    </div>
  );
};

export default ChessBoard;
