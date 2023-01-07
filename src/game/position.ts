import { HORIZONTAL_AXIS, VERTICAL_AXIS } from './constants';
import { Piece } from './piece';
export class Position {
  public x: number;
  public y: number;
  public key: string;
  public piece?: Piece;

  constructor(x: number, y: number, piece?: Piece) {
    this.x = x;
    this.y = y;
    this.key = HORIZONTAL_AXIS[y] + VERTICAL_AXIS[x];
    this.piece = piece;
  }

  public isSamePosition(other: Position): boolean {
    return this.x === other.x && this.y === other.y;
  }

  public clone(): Position {
    return new Position(this.x, this.y, this.piece);
  }
}
