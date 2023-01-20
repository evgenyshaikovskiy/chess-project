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

export const calculateNumericKey = (x: number, y: number) => {
  return x + 10 * y;
};

export const findMoves = (
  current_x: number,
  current_y: number,
  x_direction: number,
  y_direction: number,
  positions: Position[],
  pieceColor: Color,
  limit = 9
): Position[] => {
  const moves: Position[] = [];

  for (let step = 1; step <= limit; step++) {
    const targetCoordinateX = current_x + step * x_direction;
    const targetCoordinateY = current_y + step * y_direction;

    if (
      targetCoordinateX < 0 ||
      targetCoordinateX > 9 ||
      targetCoordinateY < 0 ||
      targetCoordinateY > 9
    ) {
      break;
    }

    const squareKey = calculateNumericKey(targetCoordinateX, targetCoordinateY);

    const squarePos = findPositionByNumericValue(positions, squareKey);

    if (squarePos) {
      if (squarePos.isOccupied()) {
        if (squarePos.isOccupiedByOpponent(pieceColor)) {
          moves.push(squarePos);
        }

        break;
      }

      moves.push(squarePos);
    }
  }

  return moves;
};

// public static isCastlingLegal(current_x: number, current_y: number, x_direction: number, positions: Position[], isShortCastling: boolean): boolean {
  //   const limit = isShortCastling ? 3 : 4;

  //   for (let step = 1; step < limit; step++) {
  //     const targetCoordinateX = current_x + step * x_direction;
  //     const squareKey = calculateNumericKey(targetCoordinateX, current_y);
  //     const squarePos = findPositionByNumericValue(positions, squareKey);
  //     if (squarePos.isOccupied()) {
  //       return false;
  //     }
  //   }

  //   const rookSquare = findPositionByNumericValue(positions, calculateNumericKey(current_x + limit * x_direction, current_y));
  //   if (rookSquare.piece && rookSquare.piece.isRook && (rookSquare.piece as Rook).isFirstMove) {
  //     return true;
  //   }
  //   else {
  //     return false;
  //   }
  // }
