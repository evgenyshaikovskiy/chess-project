import { Position } from "./position";

export class Board {
  public positions: Position[];

  constructor(positions: Position[]) {
    this.positions = positions;
  }

  public updateMovesForAllPieces() {
    this.positions.forEach((position) => {
      if (position.isOccupied()) {
        position.piece?.updatePossibleMoves(this.positions);
      }
    });
  }

  public clone(): Board {
    return new Board(this.positions.map((row) => row.clone()));
  }
}
