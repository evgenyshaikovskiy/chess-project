import { Fragment, useContext, useEffect } from "react";
import ChessBoard from "../board/chess-board";
import { Position } from "../../chess/position";
import { GameContext } from "../../contexts/game.context";
import { Color } from "../../chess/types";
import {
  findKingPosition,
  findPositionByNumericValue,
  moveFromSourceToDestination,
  unTargetAllPositions,
  updateCastlingMove,
  updateMovesForPositions,
} from "../../chess/game";
import { King } from "../../chess/pieces/king";

export default function ChessGame() {
  const { isWhiteTurnToMove, gameState, positions, modifyPositions } =
    useContext(GameContext);

  const updateMoves = () => {
    // un target all positions
    unTargetAllPositions(positions);

    // update possible moves for each piece
    // THINK ABOUT BUG, WHEN MOVE IS ILLEGAL, YET IT TARGETS SQUARE
    updateMovesForPositions(positions);

    const isMoveIllegal = (
      source: Position,
      destination: Position
    ): boolean => {
      const color = source.piece!.color;
      const positionsCopy = positions.map((p) => p.clone());

      const sourceCopy = findPositionByNumericValue(
        positionsCopy,
        source.numeric_key
      );
      const destinationCopy = findPositionByNumericValue(
        positionsCopy,
        destination.numeric_key
      );

      moveFromSourceToDestination(
        sourceCopy,
        destinationCopy,
        positionsCopy
      );

      unTargetAllPositions(positionsCopy);
      updateMovesForPositions(positionsCopy);

      const whiteKingLocal = findKingPosition(positionsCopy, Color.WHITE);
      const blackKingLocal = findKingPosition(positionsCopy, Color.BLACK);

      if (color === Color.WHITE) {
        return whiteKingLocal!.isTargetedByBlackPiece;
      } else {
        return blackKingLocal!.isTargetedByWhitePiece;
      }
    };

    // could be refactored
    positions
      .filter((pos) => pos.piece)
      .forEach((pos) => {
        const legalMoves = pos.piece!.possibleMoves.filter(
          (destination) => !isMoveIllegal(pos, destination)
        ) as Position[];

        pos.piece!.possibleMoves = [...legalMoves];
      });

    let whiteKing = findKingPosition(positions, Color.WHITE).piece! as King;
    let blackKing = findKingPosition(positions, Color.BLACK).piece! as King;

    updateCastlingMove(whiteKing, positions);
    updateCastlingMove(blackKing, positions);

    modifyPositions([...positions]);
  };

  // refactor this later
  const performMoveHandler = (
    source: Position,
    destination: Position
  ): boolean => {
    moveFromSourceToDestination(source, destination, positions);

    return true;
  };

  useEffect(() => {
    updateMoves();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isWhiteTurnToMove]);

  return (
    <Fragment>
      <div className="chess-game-wrapper">
        <ChessBoard performMove={performMoveHandler}></ChessBoard>
      </div>
      <div>
        It is {isWhiteTurnToMove ? "white turn to move" : "black turn to move"}
      </div>
      <div>Game state: {gameState}</div>
    </Fragment>
  );
}
