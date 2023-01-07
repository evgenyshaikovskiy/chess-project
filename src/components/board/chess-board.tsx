import { Position } from "../../game/position";
import "./chess-board.styles.scss";
import Tile from "../tile/tile";
import { useState } from "react";

type ChessBoardProps = {
  initPositions: Position[];
};

export const ChessBoard = ({ initPositions }: ChessBoardProps) => {
  const [positions, setPositions] = useState<Position[]>(initPositions);

  // when first created need to initialize tiles
  // careful with rerendering, so it does not call tiles method again
  return (
    <div className="chess-board-wrapper">
      <div className="tiles-wrapper">
        {/* could be refactored later */}
        {positions
          .flatMap((x) => x)
          .map((position) => {
            return (
              <Tile
                color={position.tileColor}
                position={position}
                image={position.piece?.image}
                key={position.number_key}
              ></Tile>
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
