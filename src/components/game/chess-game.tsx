import { Fragment, useContext, useEffect, useState } from "react";
import ChessBoard from "../board/chess-board";
import { Position } from "../../chess/position";
import { GameContext } from "../../contexts/game.context";
import { Color } from "../../chess/types";
import {
  findKingPosition,
  findPositionByNumericValue,
  isMoveIllegal,
  moveFromSourceToDestination,
  returnPawnToPromoteIfExists,
  unTargetAllPositions,
  updateCastlingMove,
  updateMovesForPositions,
} from "../../chess/game";
import { King } from "../../chess/pieces/king";
import ModalWindow from "../ui/modal/modal";
import PromotionSelector from "../ui/promotion-selector/promotion-selector";
import { Piece } from "../../chess/piece";
import useModal from "../../hooks/useModal";

export default function ChessGame() {
  const { isWhiteTurnToMove, gameState, positions, modifyPositions } =
    useContext(GameContext);

  const modal = useModal();

  useEffect(() => {
    actionsPerMove();
    console.log("first render");
  }, []);

  const actionsPerMove = () => {
    unTargetAllPositions(positions);
    updateMovesForPositions(positions);

    // could be refactored
    positions
      .filter((pos) => pos.piece)
      .forEach((pos) => {
        const legalMoves = pos.piece!.possibleMoves.filter(
          (destination) => !isMoveIllegal(pos, destination, positions)
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
  const performMoveHandler = async (
    source: Position,
    destination: Position
  ): Promise<boolean> => {
    moveFromSourceToDestination(source, destination, positions);
    actionsPerMove();

    const possiblePromotionPawn = returnPawnToPromoteIfExists(positions);
    if (possiblePromotionPawn) {
      const result = await modal.open("bla-bla");

      findPositionByNumericValue(
        positions,
        possiblePromotionPawn.position.numeric_key
      ).placePiece(result as Piece);
    }

    return true;
  };

  return (
    <Fragment>
      <PromotionSelector
        submit={modal.submit}
        visible={modal.opened}
        color={isWhiteTurnToMove ? Color.WHITE : Color.BLACK}
      ></PromotionSelector>
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
