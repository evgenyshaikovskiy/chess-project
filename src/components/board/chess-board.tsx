import { useState, useContext } from "react";
import { GameContext } from "../../contexts/game.context";
import Tile from "../tile/tile";
import { Position } from "../../chess/position";
import "./chess-board.styles.scss";
import { Color } from "../../chess/types";
import { updateGameState } from "../../chess/game";
import MoveList from "../ui/move-list/move-list";

type ChessBoardProps = {
  performMove: (source: Position, destination: Position) => Promise<boolean>;
};

export const ChessBoard = ({ performMove }: ChessBoardProps) => {
  const {
    positions,
    selectedPiece,
    isWhiteTurnToMove,
    modifyGameState,
    pickPiece,
    modifyPositions,
    transferRightToMove,
    verticalAxis,
    horizontalAxis,
  } = useContext(GameContext);

  const [highlightedSquares, setHighlightedSquares] = useState<Position[]>([]);

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
          modifyPositions(positions.reverse());
          modifyGameState(updateGameState(positions, isWhiteTurnToMove));
          transferRightToMove();
        }
      });
    }

    // hide highlighting and reset piece if clicking on not highlighted square
    if (!isHighlighted && !isOccupied) {
      setHighlightedSquares([]);
      pickPiece(null);
    }
  };

  const insertedGridStyles = `repeat(${Math.sqrt(positions.length)}, 80px)`;
  const insertedHeightStyles = positions.length === 100 ? 800 : 640;

  return (
    <div className="chess-board-wrapper">
      <div
        className="chess-board-axis"
        style={{ gridTemplateColumns: `50px ${insertedHeightStyles}px` }}
      >
        <div
          className="chess-board-vertical-axis"
          style={{ gridTemplateRows: insertedGridStyles }}
        >
          {verticalAxis.map((val, index) => (
            <div className="vertical-axis-element" key={index}>
              {val}
            </div>
          ))}
        </div>
        <div
          className="chess-board-tiles-wrapper"
          style={{
            gridTemplateColumns: insertedGridStyles,
            gridTemplateRows: insertedGridStyles,
          }}
        >
          {positions.map((position) => {
            return (
              <Tile
                onTileClick={onTileClickHandler}
                color={position.tileColor}
                position={position}
                image={position.piece?.image}
                key={position.numericKey}
                isHighlighted={highlightedSquares.includes(position)}
              ></Tile>
            );
          })}
        </div>
        <div
          className="chess-board-horizontal-axis"
          style={{ gridTemplateColumns: insertedGridStyles }}
        >
          {horizontalAxis.map((val, index) => (
            <div className="horizontal-axis-element" key={index}>
              {val}
            </div>
          ))}
        </div>
      </div>
      <MoveList></MoveList>
    </div>
  );
};
