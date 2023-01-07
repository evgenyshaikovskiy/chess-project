import { Piece } from "./piece";
import { Position } from "./position";

export class Board {
  public pieces: Piece[];
  public positions: Position[][];

  constructor(pieces: Piece[], positions: Position[][]) {
    this.pieces = pieces;
    this.positions = positions;
  }

  public clone(): Board {
    return new Board(this.pieces.map((p) => p.clone()), this.positions.map((row) => row.map((col) => col.clone())));
  }

  public flipBoard() {
    this.positions = this.positions.reverse();
  }
}
