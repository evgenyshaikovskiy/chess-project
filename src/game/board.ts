import { Position } from "./position";

export class Board {
  public positions: Position[][];

  constructor(positions: Position[][]) {
    this.positions = positions;
  }

  public clone(): Board {
    return new Board(
      this.positions.map((row) => row.map((col) => col.clone()))
    );
  }
}
