import { Fragment, useContext, useEffect } from "react";
import ChessBoard from "../board/chess-board";
import { Position } from "../../chess/position";
import { GameContext } from "../../contexts/game.context";
import { Color } from "../../chess/types";

export default function ChessGame() {
  const { isWhiteTurnToMove, gameState, positions, modifyPositions } =
    useContext(GameContext);

  const updateMoves = () => {
    // un target all positions
    positions.forEach((pos) => {
      pos.isTargetedByBlackPiece = false;
      pos.isTargetedByWhitePiece = false;
    });

    // update possible moves for each piece
    // THINK ABOUT BUG, WHEN MOVE IS ILLEGAL, YET IT TARGETS SQUARE
    positions
      .filter((pos) => pos.piece)
      .forEach((pos) => pos.piece!.updatePossibleMoves(positions));

    const isMoveIllegal = (
      source: Position,
      destination: Position
    ): boolean => {
      const color = source.piece!.color;
      const localCopy = positions.map((p) => p.clone());
      const whiteKing = localCopy.find(
        (pos) => pos.piece?.isKing && pos.piece.color === Color.WHITE
      );
      const blackKing = localCopy.find(
        (pos) => pos.piece?.isKing && pos.piece.color === Color.BLACK
      );

      const sourceFromCopy = localCopy.find(
        (pos) => pos.numeric_key === source.numeric_key
      ) as Position;
      const destinationFromCopy = localCopy.find(
        (pos) => pos.numeric_key === destination.numeric_key
      ) as Position;

      sourceFromCopy.piece!.moveTo(destinationFromCopy);
      localCopy.forEach((pos) => {
        pos.isTargetedByBlackPiece = false;
        pos.isTargetedByWhitePiece = false;
      });

      localCopy
        .filter((pos) => pos.piece)
        .forEach((pos) => pos.piece!.updatePossibleMoves(localCopy));

      if (color === Color.WHITE) {
        return whiteKing!.isTargetedByBlackPiece;
      } else {
        return blackKing!.isTargetedByWhitePiece;
      }
    };

    positions
      .filter((pos) => pos.piece && !pos.piece.isKing)
      .forEach((pos) => {
        const legalMoves = pos.piece!.possibleMoves.filter(
          (destination) => !isMoveIllegal(pos.clone(), destination.clone())
        ) as Position[];

        pos.piece!.possibleMoves = [...legalMoves];
      });

    modifyPositions([...positions]);
    // exclude illegal
  };

  const performMoveHandler = (
    source: Position,
    destination: Position
  ): boolean => {
    console.log("FROM", source, "TO", destination);

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
