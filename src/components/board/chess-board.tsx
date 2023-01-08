import { Position } from "../../game/position";
import "./chess-board.styles.scss";
import Tile from "../tile/tile";
import { useState } from "react";

type ChessBoardProps = {
  initPositions: Position[];
  updateMoves: () => void;
};

export const ChessBoard = ({ initPositions, updateMoves }: ChessBoardProps) => {
  const [positions, setPositions] = useState<Position[]>(initPositions);
  const [isAllMovesUpdated, setIsAllMovesUpdated] = useState<Boolean>(false);

  // if all moves aren't updated => update them
  if (!isAllMovesUpdated) {
    updateMoves();
    setIsAllMovesUpdated(true);
  }

  // when move is maked, need to set variable to false
  function onTileClickCallback(position: Position) {
    if (position.isOccupied() && !isAllMovesUpdated) {
      console.log("click", position);
      // it should highlight possible moves for piece on that tile
    }
  }

  // TODO: refactor so it would pass only position of a tile
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
                onTileClick={onTileClickCallback}
                color={position.tileColor}
                position={position}
                image={position.piece?.image}
                key={position.number_key}
                isHighlighted={false}
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
