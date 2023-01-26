import { useState, useContext } from "react";
import { GameContext } from "../../contexts/game.context";

import Tile from "../tile/tile";

import { HORIZONTAL_AXIS, VERTICAL_AXIS } from "../../chess/constants";
import { Position } from "../../chess/position";

import "./chess-board.styles.scss";
import { Color } from "../../chess/types";

type ChessBoardProps = {
  performMove: (source: Position, destination: Position) => Promise<boolean>;
};

export const ChessBoard = ({ performMove }: ChessBoardProps) => {
  const {
    positions,
    selectedPiece,
    isWhiteTurnToMove,
    pickPiece,
    modifyPositions,
    transferRightToMove
  } = useContext(GameContext);

  const [highlightedSquares, setHighlightedSquares] = useState<Position[]>([]);
  const [verticalAxis, setVerticalAxis] = useState<string[]>(
    VERTICAL_AXIS.slice().reverse()
  );
  const [horizontalAxis, setHorizontalAxis] =
    useState<string[]>(HORIZONTAL_AXIS);

  const onTileClickHandler = (position: Position, isHighlighted: boolean) => {
    // update selected piece
    if (!selectedPiece && position.piece) {
      pickPiece(position.piece);
    }

    const isOccupied = position.isOccupied();

    if (
      isOccupied &&
      ((isWhiteTurnToMove && position.piece?.color === Color.WHITE) ||
        (!isWhiteTurnToMove && position.piece?.color === Color.BLACK))
    ) {
      // highlight possible moves
      setHighlightedSquares([...position.piece!.possibleMoves]);

      // select as last grabbed piece
      pickPiece(position.piece ? position.piece : null);
    }

    // move logic
    // remove useless boolean value
    if (selectedPiece && isHighlighted) {
      performMove(selectedPiece.position, position).then((val) => {
        if (val) {
          setHighlightedSquares([]);
          pickPiece(null);
          setHorizontalAxis([...horizontalAxis.reverse()]);
          setVerticalAxis([...verticalAxis.reverse()]);
          modifyPositions([...positions.reverse()]);
          transferRightToMove();
        }
      })
    }

    // hide highlighting and reset piece if clicking on not highlighted square
    if (!isHighlighted && !isOccupied) {
      setHighlightedSquares([]);
      pickPiece(null);
    }
  };

  return (
    <div className="chess-board-wrapper">
      <div className="chess-board-vertical-axis">
        {verticalAxis.map((val, index) => (
          <div className="vertical-axis-element" key={index}>
            {val}
          </div>
        ))}
      </div>
      <div className="chess-board-tiles-wrapper">
        {positions.map((position) => {
          return (
            <Tile
              onTileClick={onTileClickHandler}
              color={position.tileColor}
              position={position}
              image={position.piece?.image}
              key={position.numeric_key}
              isHighlighted={highlightedSquares.includes(position)}
            ></Tile>
          );
        })}
      </div>
      <div className="chess-board-horizontal-axis">
        {horizontalAxis.map((val, index) => (
          <div className="horizontal-axis-element" key={index}>
            {val}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChessBoard;
