import { Position } from "./position";
import { Color, PieceType } from "./types";

export abstract class Piece {
  public image: string;
  public position: Position;
  public type: PieceType;
  public possibleMoves: Position[];
  public color: Color;

  constructor(
    position: Position,
    type: PieceType,
    color: Color,
    // maybe be redudant
    possibleMoves: Position[] = []
  ) {
    this.image = `/assets/images/${type}_${color}.png`;
    this.position = position;
    this.type = type;
    this.color = color;
    this.possibleMoves = possibleMoves;
  }

  // could be refactored
  public isSamePiecePosition(other: Piece): boolean {
    return this.position.isSamePosition(other.position);
  }

  public isSamePosition(other: Position): boolean {
    return this.position.isSamePosition(other);
  }

  // abstract methods
  public abstract updatePossibleMoves(positions: Position[]): void;

  public abstract moveTo(position: Position): void;

  // refactor it to more suitable class
  public static findStraightMoves(
    x: number,
    y: number,
    direction: number,
    positions: Position[],
    pieceColor: Color,
    calculationFunc: (x: number, y: number) => number
  ): Position[] {
    const moves: Position[] = [];

    for (let step = 1; step <= 9; step++) {
      const targetCoordinate = y + step * direction;
      if (targetCoordinate < 0 || targetCoordinate > 9) {
        break;
      }

      const squareKey = calculationFunc(x, y + step * direction);
      const squarePos = positions.find((p) => p.numeric_key === squareKey);
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
  }

  public static findDiagonalMoves(
    x: number,
    y: number,
    x_direction: number,
    y_direction: number,
    positions: Position[],
    pieceColor: Color,
    calculationFunc: (x: number, y: number) => number
  ): Position[] {
    const moves: Position[] = [];

    for (let step = 1; step <= 9; step++) {
      const targetCoordinateX = x + step * x_direction;
      const targetCoordinateY = y + step * y_direction;

      if (targetCoordinateX < 0 || targetCoordinateX > 9 || targetCoordinateY < 0 || targetCoordinateY > 9) {
        break;
      }

      const squareKey = calculationFunc(targetCoordinateX, targetCoordinateY);
      const squarePos = positions.find((p) => p.numeric_key === squareKey);

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
  }

  // check type of piece(could be refactored)
  get isPawn(): boolean {
    return this.type === PieceType.PAWN;
  }

  get isRook(): boolean {
    return this.type === PieceType.ROOK;
  }

  get isKnight(): boolean {
    return this.type === PieceType.KNIGHT;
  }

  get isLance(): boolean {
    return this.type === PieceType.LANCE;
  }

  get isBishop(): boolean {
    return this.type === PieceType.BISHOP;
  }

  get isQueen(): boolean {
    return this.type === PieceType.QUEEN;
  }

  get isKing(): boolean {
    return this.type === PieceType.KING;
  }
}
