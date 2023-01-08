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
