import { HORIZONTAL_AXIS, VERTICAL_AXIS } from "./constants";
import { Piece } from "./piece";
import { Color } from "./types";
export class Position {
  public x: number;
  public y: number;

  public key: string;
  public numeric_key: number;

  public tileColor: string;

  // undefined means there are no piece at position
  public piece?: Piece;

  constructor(x: number, y: number, piece?: Piece) {
    this.x = x;
    this.y = y;
    this.key = HORIZONTAL_AXIS[x] + VERTICAL_AXIS[y];
    this.piece = piece;
    this.numeric_key = Position.calculateNumericKey(x, y);
    this.tileColor = (x + y) % 2 === 0 ? Color.BLACK : Color.WHITE;
  }

  public isSamePosition(other: Position): boolean {
    return other.numeric_key === this.numeric_key;
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

  public removePiece() {
    this.piece = undefined;
  }

  public clone(): Position {
    return new Position(this.x, this.y, this.piece);
  }

  public static calculateNumericKey(x: number, y: number) {
    return x + 10 * y;
  }
}
