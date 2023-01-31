import { Move } from "./move";
import { Bishop } from "./pieces/bishop";
import { King } from "./pieces/king";
import { Knight } from "./pieces/knight";
import { Lance } from "./pieces/lance";
import { Pawn } from "./pieces/pawn";
import { Queen } from "./pieces/queen";
import { Rook } from "./pieces/rook";
import { Position } from "./position";
import { Color, GameState } from "./types";

export const unTargetAllPositions = (positions: Position[]): void => {
  positions.forEach((position) => {
    position.isTargetedByBlackPiece = false;
    position.isTargetedByWhitePiece = false;
  });
};

export const updateMovesForPositions = (positions: Position[]): void => {
  positions
    .filter((position) => position.piece)
    .forEach((position) => position.piece!.updatePossibleMoves(positions));
};

export const findPositionByNumericValue = (
  positions: Position[],
  numeric_key: number
): Position => {
  return positions.find(
    (position) => position.numericKey === numeric_key
  ) as Position;
};

export const findPositionByKey = (
  key: string,
  positions: Position[]
): Position => {
  return positions.find((position) => position.readableKey === key) as Position;
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

export const moveFromSourceToDestinationWithLogger = (
  source: Position,
  destination: Position,
  positions: Position[],
  moveLoggerCallback: (move: Move) => void
) => {
  moveLoggerCallback(
    new Move(source.readableKey, destination.readableKey, source.piece!)
  );
  moveFromSourceToDestination(source, destination, positions);
};

const isCastlingLegal = (
  current_x: number,
  current_y: number,
  x_direction: number,
  positions: Position[],
  kingColor: Color,
  isShortCastling: boolean
): Position | null => {
  const [leftLimit, rightLimit] = positions.length === 100 ? [4, 5] : [3, 4];
  const limit = isShortCastling ? leftLimit : rightLimit;

  for (let step = 1; step < limit; step++) {
    const targetCoordinateX = current_x + step * x_direction;
    const squareKey = calculateNumericKey(targetCoordinateX, current_y);
    const squarePos = findPositionByNumericValue(positions, squareKey);
    if (
      squarePos.isOccupied() ||
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

  const kingMoveDirection =
    rookPosition.x === 9 || rookPosition.x === 7 ? 1 : -1;
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

const moveFromSourceToDestination = (
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
    source.numericKey
  );
  const destinationCopy = findPositionByNumericValue(
    positionsCopy,
    destination.numericKey
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

export const prepareClassicBoard = () => {
  const vertical_axis_start = ["1", "2", "3", "4", "5", "6", "7", "8"];
  const horizontal_axis_start = ["a", "b", "c", "d", "e", "f", "g", "h"];

  const source = [0, 1, 2, 3, 4, 5, 6, 7];
  const positions_start = source.map((y) =>
    source.map((x) => new Position(x, y))
  );
  for (let i = 0; i < positions_start[1].length; i++) {
    positions_start[1][i].placePiece(
      new Pawn(positions_start[1][i], Color.WHITE)
    );
    positions_start[6][i].placePiece(
      new Pawn(positions_start[6][i], Color.BLACK)
    );
  }

  positions_start[0][0].placePiece(
    new Rook(positions_start[0][0], Color.WHITE)
  );
  positions_start[0][1].placePiece(
    new Knight(positions_start[0][1], Color.WHITE)
  );
  positions_start[0][2].placePiece(
    new Bishop(positions_start[0][2], Color.WHITE)
  );
  positions_start[0][3].placePiece(
    new Queen(positions_start[0][3], Color.WHITE)
  );
  positions_start[0][4].placePiece(
    new King(positions_start[0][4], Color.WHITE)
  );
  positions_start[0][5].placePiece(
    new Bishop(positions_start[0][5], Color.WHITE)
  );
  positions_start[0][6].placePiece(
    new Knight(positions_start[0][6], Color.WHITE)
  );
  positions_start[0][7].placePiece(
    new Rook(positions_start[0][7], Color.WHITE)
  );

  positions_start[7][0].placePiece(
    new Rook(positions_start[7][0], Color.BLACK)
  );
  positions_start[7][1].placePiece(
    new Knight(positions_start[7][1], Color.BLACK)
  );
  positions_start[7][2].placePiece(
    new Bishop(positions_start[7][2], Color.BLACK)
  );
  positions_start[7][3].placePiece(
    new Queen(positions_start[7][3], Color.BLACK)
  );
  positions_start[7][4].placePiece(
    new King(positions_start[7][4], Color.BLACK)
  );
  positions_start[7][5].placePiece(
    new Bishop(positions_start[7][5], Color.BLACK)
  );
  positions_start[7][6].placePiece(
    new Knight(positions_start[7][6], Color.BLACK)
  );
  positions_start[7][7].placePiece(
    new Rook(positions_start[7][7], Color.BLACK)
  );

  return { horizontal_axis_start, vertical_axis_start, positions_start };
};

export const prepareCustomBoard = () => {
  const vertical_axis_start = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
  ];
  const horizontal_axis_start = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
  ];

  const source = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  const positions_start = source.map((y) =>
    source.map((x) => new Position(x, y))
  );
  for (let i = 0; i < positions_start[1].length; i++) {
    positions_start[1][i].placePiece(
      new Pawn(positions_start[1][i], Color.WHITE)
    );
    positions_start[8][i].placePiece(
      new Pawn(positions_start[8][i], Color.BLACK)
    );
  }

  positions_start[0][0].placePiece(
    new Rook(positions_start[0][0], Color.WHITE)
  );
  positions_start[0][1].placePiece(
    new Lance(positions_start[0][1], Color.WHITE)
  );
  positions_start[0][2].placePiece(
    new Knight(positions_start[0][2], Color.WHITE)
  );
  positions_start[0][3].placePiece(
    new Bishop(positions_start[0][3], Color.WHITE)
  );
  positions_start[0][4].placePiece(
    new Queen(positions_start[0][4], Color.WHITE)
  );
  positions_start[0][5].placePiece(
    new King(positions_start[0][5], Color.WHITE)
  );
  positions_start[0][6].placePiece(
    new Bishop(positions_start[0][6], Color.WHITE)
  );
  positions_start[0][7].placePiece(
    new Knight(positions_start[0][7], Color.WHITE)
  );
  positions_start[0][8].placePiece(
    new Lance(positions_start[0][8], Color.WHITE)
  );
  positions_start[0][9].placePiece(
    new Rook(positions_start[0][9], Color.WHITE)
  );

  positions_start[9][0].placePiece(
    new Rook(positions_start[9][0], Color.BLACK)
  );
  positions_start[9][1].placePiece(
    new Lance(positions_start[9][1], Color.BLACK)
  );
  positions_start[9][2].placePiece(
    new Knight(positions_start[9][2], Color.BLACK)
  );
  positions_start[9][3].placePiece(
    new Bishop(positions_start[9][3], Color.BLACK)
  );
  positions_start[9][4].placePiece(
    new Queen(positions_start[9][4], Color.BLACK)
  );
  positions_start[9][5].placePiece(
    new King(positions_start[9][5], Color.BLACK)
  );
  positions_start[9][6].placePiece(
    new Bishop(positions_start[9][6], Color.BLACK)
  );
  positions_start[9][7].placePiece(
    new Knight(positions_start[9][7], Color.BLACK)
  );
  positions_start[9][8].placePiece(
    new Lance(positions_start[9][8], Color.BLACK)
  );
  positions_start[9][9].placePiece(
    new Rook(positions_start[9][9], Color.BLACK)
  );

  return { horizontal_axis_start, vertical_axis_start, positions_start };
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

const findKingPosition = (positions: Position[], color: Color): Position => {
  return positions.find(
    (pos) => pos.piece?.isKing && pos.piece.color === color
  ) as Position;
};
