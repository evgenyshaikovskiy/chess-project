import { useState, useContext } from "react";
import { GameContext } from "../../contexts/game.context";

import Tile from "../tile/tile";

import { HORIZONTAL_AXIS, VERTICAL_AXIS } from "../../chess/constants";
import { Position } from "../../chess/position";

import "./chess-board.styles.scss";

type ChessBoardProps = {
  performMove: (source: Position, destination: Position) => boolean;
};

export const ChessBoard = ({ performMove }: ChessBoardProps) => {
  const {
    positions,
    selectedPiece,
    pickPiece,
    transferRightToMove,
    modifyPositions,
  } = useContext(GameContext);

  const [highlightedSquares, setHighlightedSquares] = useState<Position[]>([]);
  const [verticalAxis, setVerticalAxis] = useState<string[]>(
    VERTICAL_AXIS.slice().reverse()
  );
  const [horizontalAxis, setHorizontalAxis] =
    useState<string[]>(HORIZONTAL_AXIS);

  const onTileClickHandler = (position: Position, isHighlighted: boolean) => {
    console.log("click on", position);
    // update selected piece
    if (!selectedPiece && position.piece) {
      pickPiece(position.piece);
    }

    const isOccupied = position.isOccupied();
    const isOccupiedByOpponent = selectedPiece
      ? position.isOccupiedByOpponent(selectedPiece.color)
      : false;

    console.log(isOccupied, isOccupiedByOpponent, selectedPiece);

    if (isOccupied && !isOccupiedByOpponent) {
      // highlight possible moves
      setHighlightedSquares([...position.piece!.possibleMoves]);

      // select as last grabbed piece
      pickPiece(position.piece ? position.piece : null);
    }

    // move logic
    if (selectedPiece && isHighlighted) {
      if (performMove(selectedPiece.position, position)) {
        setHighlightedSquares([]);
        pickPiece(null);
        transferRightToMove();
        setHorizontalAxis([...horizontalAxis.reverse()]);
        setVerticalAxis([...verticalAxis.reverse()]);
        modifyPositions([...positions.reverse()]);
      }
    }

    // hide highlighting and reset piece if clicking on not highlighted square
    if ((!isHighlighted && !isOccupied)) {
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
