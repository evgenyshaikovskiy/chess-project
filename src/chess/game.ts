import { Position } from "./position";

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
