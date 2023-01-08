import { Position } from "../../game/position";
import "./chess-board.styles.scss";
import Tile from "../tile/tile";
import { useState } from "react";
import { Piece } from "../../game/piece";
import { Color } from "../../game/types";

type ChessBoardProps = {
  initPositions: Position[];
  isWhiteTurn: Boolean;
  toggleTurn: () => void;
  updateMoves: () => void;
  movePiece: (piece: Piece, position: Position) => void;
};

export const ChessBoard = ({
  initPositions,
  isWhiteTurn,
  toggleTurn,
  updateMoves,
  movePiece,
}: ChessBoardProps) => {
  const [positions, setPositions] = useState<Position[]>(initPositions);
  const [isAllMovesUpdated, setIsAllMovesUpdated] = useState<Boolean>(false);
  const [highlightedSquares, setHighlightedSquares] = useState<Position[]>([]);
  const [selectedPiece, setSelectedPiece] = useState<Piece>();

  // if all moves aren't updated => update them

  // THERE IS A BUG, THAT HIGHLIGHT OPPONENT PIECES ON YOUR MOVE 
  if (!isAllMovesUpdated) {
    updateMoves();
    setIsAllMovesUpdated(true);
  }

  // when move is maked, need to set variable to false
  function onTileClickCallback(position: Position, isHighlighted: boolean) {
    console.log("clicked", position);

    // occupied tile
    if (position.isOccupied()) {
      // it should highlight possible moves for piece on that tile

      console.log("possible moves for square", position.piece?.possibleMoves);
      setHighlightedSquares([...position.piece!.possibleMoves]);

      // save last selected piece
      setSelectedPiece(position.piece);
    }

    // TO DO probably need to add optimization so
    // on blacks turn only updating blacks pieces
    // on whites turn only updating white pieces

    if (
      selectedPiece &&
      ((selectedPiece.color === Color.WHITE && isWhiteTurn) ||
        (selectedPiece.color === Color.BLACK && !isWhiteTurn))
    ) {
      if (isHighlighted) {
        movePiece(selectedPiece, position);
        toggleTurn();
        setHighlightedSquares([]);
        setSelectedPiece(undefined);
        setIsAllMovesUpdated(false);
      }
    }

    if (!isHighlighted && !position.isOccupied()) {
      setHighlightedSquares([]);
      setSelectedPiece(undefined);
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
                key={position.numeric_key}
                isHighlighted={highlightedSquares.includes(position)}
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
