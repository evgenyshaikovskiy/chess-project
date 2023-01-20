import { Position } from "./position";
import { Color } from "./types";

export const unTargetAllPositions = (positions: Position[]) => {
  positions.forEach((position) => {
    position.isTargetedByBlackPiece = false;
    position.isTargetedByWhitePiece = false;
  });
};

export const updateMovesForPositions = (positions: Position[]) => {
  positions
    .filter((position) => position.piece)
    .forEach((position) => position.piece!.updatePossibleMoves(positions));
};

export const findPositionByNumericValue = (
  positions: Position[],
  numeric_key: number
): Position => {
  return positions.find(
    (position) => position.numeric_key === numeric_key
  ) as Position;
};

export const findKingPosition = (
  positions: Position[],
  color: Color
): Position => {
  return positions.find(
    (pos) => pos.piece && pos.piece.color === color
  ) as Position;
};
