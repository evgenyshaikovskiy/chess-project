import { calculateNumericKey } from "./game";
import { Piece } from "./piece";
import { Color, horizontal_axis_keys, vertical_axis_keys } from "./types";
export class Position {
  public x: number;
  public y: number;

  public numericKey: number;
  public readableKey: string;

  public tileColor: string;

  // undefined means there are no piece at position
  public piece?: Piece;

  // means square is targeted by black or white piece
  public isTargetedByBlackPiece: boolean;
  public isTargetedByWhitePiece: boolean;

  constructor(
    x: number,
    y: number,
    piece?: Piece,
    isTargetedByBlackPiece: boolean = false,
    isTargetedByWhitePiece: boolean = false
  ) {
    this.x = x;
    this.y = y;
    if (piece) {
      this.piece = piece;
      this.piece.position = this;
    }
    this.numericKey = calculateNumericKey(x, y);
    this.tileColor = (x + y) % 2 === 0 ? Color.BLACK : Color.WHITE;

    this.isTargetedByBlackPiece = isTargetedByBlackPiece;
    this.isTargetedByWhitePiece = isTargetedByWhitePiece;

    this.readableKey = horizontal_axis_keys[x] + vertical_axis_keys[y];
  }

  public isSamePosition(other: Position): boolean {
    return other.numericKey === this.numericKey;
  }

  public isOccupied(): boolean {
    return this.piece !== undefined;
  }

  public isOccupiedByOpponent(pieceColor: Color): boolean {
    return this.isOccupied() && this.piece!.color !== pieceColor;
  }

  // refactor two methods
  public placePiece(piece: Piece) {
    // make previous piece position as undefined
    piece.position.piece = undefined;
    this.piece = piece;
    this.piece.position = this;
  }

  public clone(): Position {
    return new Position(
      this.x,
      this.y,
      this.piece?.clone(),
      this.isTargetedByBlackPiece,
      this.isTargetedByWhitePiece
    );
  }
}
