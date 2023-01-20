import { Fragment, useContext, useEffect } from "react";
import ChessBoard from "../board/chess-board";
import { Position } from "../../chess/position";
import { GameContext } from "../../contexts/game.context";
import { Color } from "../../chess/types";
import {
  findKingPosition,
  findPositionByNumericValue,
  unTargetAllPositions,
  updateMovesForPositions,
} from "../../chess/game";

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
      const localCopy = positions.map((p) => p.clone());

      const sourceFromCopy = findPositionByNumericValue(
        localCopy,
        source.numeric_key
      );
      const destinationFromCopy = findPositionByNumericValue(
        localCopy,
        destination.numeric_key
      );

      sourceFromCopy.piece!.moveTo(destinationFromCopy);

      unTargetAllPositions(localCopy);
      updateMovesForPositions(localCopy);

      const whiteKing = findKingPosition(localCopy, Color.WHITE);
      const blackKing = findKingPosition(localCopy, Color.BLACK);

      if (color === Color.WHITE) {
        return whiteKing!.isTargetedByBlackPiece;
      } else {
        return blackKing!.isTargetedByWhitePiece;
      }
    };

    // could be refactored
    positions
      .filter((pos) => pos.piece)
      .forEach((pos) => {
        const legalMoves = pos.piece!.possibleMoves.filter(
          (destination) => !isMoveIllegal(pos.clone(), destination.clone())
        ) as Position[];

        pos.piece!.possibleMoves = [...legalMoves];
      });

    modifyPositions([...positions]);
  };

  const performMoveHandler = (
    source: Position,
    destination: Position
  ): boolean => {
    // first case, destination is empty => move without capturing
    // second case, destination is occupied by enemy => move with capturing

    source.piece!.moveTo(destination);

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
