import { HORIZONTAL_AXIS, VERTICAL_AXIS } from "./constants";
import { Piece } from "./piece";
import { Color } from "./types";
export class Position {
  public x: number;
  public y: number;

  public key: string;
  public number_key: number;

  public tileColor: string;
  
  // undefined means there are no piece at position
  public piece?: Piece;

  constructor(x: number, y: number, piece?: Piece) {
    this.x = x;
    this.y = y;
    this.key = HORIZONTAL_AXIS[x] + VERTICAL_AXIS[y];
    this.piece = piece;
    this.number_key = x + y * 10;
    this.tileColor = (x + y) % 2 === 0 ? Color.BLACK : Color.WHITE;
  }

  public isSamePosition(other: Position): boolean {
    return other.key === this.key;
  }

  public isOccupied(): boolean {
    return this.piece !== undefined;
  }

  public placePiece(piece: Piece) {
    this.piece = piece;
  }

  public clone(): Position {
    return new Position(this.x, this.y, this.piece);
  }
}
