import { Fragment, useContext, useEffect } from "react";
import { ChessBoard } from "../board/chess-board";
import { Position } from "../../chess/position";
import { GameContext } from "../../contexts/game.context";
import { Color } from "../../chess/types";
import {
  excludeIllegalMoves,
  findPositionByNumericValue,
  moveFromSourceToDestination,
  returnPawnToPromoteIfExists,
  unTargetAllPositions,
  updateCastlingMoves,
  updateMovesForPositions,
} from "../../chess/game";
import PromotionSelector from "../ui/promotion-selector/promotion-selector";
import { Piece } from "../../chess/piece";
import useModal from "../../hooks/useModal";

export default function ChessGame() {
  const {
    isWhiteTurnToMove,
    gameState,
    checkState,
    positions,
    modifyPositions,
  } = useContext(GameContext);

  const modal = useModal();

  // update state for first move
  useEffect(() => {
    updateBoardState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateBoardState = () => {
    unTargetAllPositions(positions);
    updateMovesForPositions(positions);
    excludeIllegalMoves(positions);
    updateCastlingMoves(positions);
    modifyPositions(positions);
  };

  // refactor this later
  const performMoveHandler = async (
    source: Position,
    destination: Position
  ): Promise<boolean> => {
    moveFromSourceToDestination(source, destination, positions);

    // extract code to function
    const possiblePromotionPawn = returnPawnToPromoteIfExists(positions);
    if (possiblePromotionPawn) {
      const result = await modal.open();

      findPositionByNumericValue(
        positions,
        possiblePromotionPawn.position.numeric_key
      ).placePiece(result as Piece);
    }

    updateBoardState();
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
      <div>Check state: {checkState}</div>
      <div>Game state: {gameState}</div>
    </Fragment>
  );
}
