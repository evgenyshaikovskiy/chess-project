import { King } from "./pieces/king";
import { Pawn } from "./pieces/pawn";
import { Position } from "./position";
import { Color, GameState } from "./types";

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

const findKingPosition = (positions: Position[], color: Color): Position => {
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

const isCastlingLegal = (
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

const updateKingCastlingMove = (king: King, positions: Position[]): void => {
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

const performCastling = (
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

export const returnPawnToPromoteIfExists = (
  positions: Position[]
): Pawn | undefined => {
  const pawns = positions
    .filter((p) => p.piece && p.piece.isPawn)
    .map((p) => p.piece!) as Pawn[];
  return pawns.find((p) => p.isReadyToPromote);
};

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

export const excludeIllegalMoves = (positions: Position[]) => {
  positions
    .filter((pos) => pos.piece)
    .forEach((pos) => {
      const legalMoves = pos.piece!.possibleMoves.filter(
        (destination) => !isMoveIllegal(pos, destination, positions)
      ) as Position[];

      pos.piece!.possibleMoves = [...legalMoves];
    });
};

export const updateCastlingMoves = (positions: Position[]) => {
  const whiteKing = findKingPosition(positions, Color.WHITE).piece! as King;
  const blackKing = findKingPosition(positions, Color.BLACK).piece! as King;

  updateKingCastlingMove(whiteKing, positions);
  updateKingCastlingMove(blackKing, positions);
};

export const updateGameState = (
  positions: Position[],
  isWhiteToMove: boolean
): GameState => {
  const whitePossibleMoves = getPossibleMovesForColor(positions, Color.WHITE);
  const blackPossibleMoves = getPossibleMovesForColor(positions, Color.BLACK);

  const whiteKingCheck = (
    findKingPosition(positions, Color.WHITE).piece! as King
  ).position.isTargetedByBlackPiece;
  const blackKingCheck = (
    findKingPosition(positions, Color.BLACK).piece! as King
  ).position.isTargetedByWhitePiece;

  console.log(whiteKingCheck, blackKingCheck);

  // stalemate condition
  if (
    (!isWhiteToMove && whitePossibleMoves.length === 0 && !whiteKingCheck) ||
    (isWhiteToMove && blackPossibleMoves.length === 0 && !blackKingCheck)
  )
    return GameState.STALEMATE;

  // white victory
  if (isWhiteToMove && blackPossibleMoves.length === 0 && blackKingCheck) {
    return GameState.WHITE_VICTORY;
  }

  // black victory
  if (!isWhiteToMove && whitePossibleMoves.length === 0 && whiteKingCheck) {
    return GameState.BLACK_VICTORY;
  }

  return GameState.GAME_IS_RUNNING;
};

const getPossibleMovesForColor = (
  positions: Position[],
  color: Color
): Position[] => {
  return positions
    .filter((pos) => pos.piece && pos.piece.color === color)
    .map((pos) => pos.piece!.possibleMoves)
    .flatMap((x) => x);
};
