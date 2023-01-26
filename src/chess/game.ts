import { King } from "./pieces/king";
import { Pawn } from "./pieces/pawn";
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
    (pos) => pos.piece?.isKing && pos.piece.color === color
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

export const isCastlingLegal = (
  current_x: number,
  current_y: number,
  x_direction: number,
  positions: Position[],
  kingColor: Color,
  isShortCastling: boolean
): Position | null => {
  const limit = isShortCastling ? 4 : 5;

  for (let step = 1; step < limit; step++) {
    const targetCoordinateX = current_x + step * x_direction;
    const squareKey = calculateNumericKey(targetCoordinateX, current_y);
    const squarePos = findPositionByNumericValue(positions, squareKey);
    if (
      squarePos.isOccupied() &&
      ((kingColor === Color.BLACK && !squarePos.isTargetedByWhitePiece) ||
        (kingColor === Color.WHITE && !squarePos.isTargetedByBlackPiece))
    ) {
      return null;
    }
  }

  const rookSquare = findPositionByNumericValue(
    positions,
    calculateNumericKey(current_x + limit * x_direction, current_y)
  );
  if (
    rookSquare.piece &&
    rookSquare.piece.isRook &&
    rookSquare.piece.isFirstMove
  ) {
    return rookSquare;
  } else {
    return null;
  }
};

export const updateCastlingMove = (king: King, positions: Position[]): void => {
  if (king.isFirstMove) {
    const shortCastleMove = isCastlingLegal(
      king.position.x,
      king.position.y,
      1,
      positions,
      king.color,
      true
    );

    if (shortCastleMove) {
      king.possibleMoves.push(shortCastleMove);
    }

    const longCastleMove = isCastlingLegal(
      king.position.x,
      king.position.y,
      -1,
      positions,
      king.color,
      false
    );

    if (longCastleMove) {
      king.possibleMoves.push(longCastleMove);
    }
  }
};

export const performCastling = (
  kingPosition: Position,
  rookPosition: Position,
  positions: Position[]
) => {
  // king moves two squares to direction where rook is located
  // rook moves next to king in opposite direction

  const kingMoveDirection = rookPosition.x === 9 ? 1 : -1;
  const kingDestination = findPositionByNumericValue(
    positions,
    calculateNumericKey(kingPosition.x + 2 * kingMoveDirection, kingPosition.y)
  );
  const rookDestination = findPositionByNumericValue(
    positions,
    calculateNumericKey(
      kingDestination.x - 1 * kingMoveDirection,
      rookPosition.y
    )
  );

  kingPosition.piece!.moveTo(kingDestination);
  rookPosition.piece!.moveTo(rookDestination);
};

export const moveFromSourceToDestination = (
  source: Position,
  destination: Position,
  positions: Position[]
) => {
  // first case, destination is empty => move without capturing
  // second case, destination is occupied by enemy => move with capturing
  // third case, destination is occupied by rook => move with castling

  if (
    destination.isOccupied() &&
    !destination.isOccupiedByOpponent(source.piece!.color)
  ) {
    // third case
    performCastling(source, destination, positions);
  } else {
    // first and second case
    source.piece!.moveTo(destination);
  }
};

export const returnPawnToPromoteIfExists = (positions: Position[]): Pawn | undefined => {
  const pawns = positions.filter((p) => p.piece && p.piece.isPawn).map(p => p.piece!) as Pawn[];
  return pawns.find((p) => p.isReadyToPromote);
}

export const isMoveIllegal = (
  source: Position,
  destination: Position,
  positions: Position[]
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

  moveFromSourceToDestination(sourceCopy, destinationCopy, positionsCopy);

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
