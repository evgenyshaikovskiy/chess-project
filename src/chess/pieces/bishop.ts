import { PieceType } from "../types";
import { Piece } from "../piece";
import { Position } from "../position";
import { Color } from "../types";

export class Bishop extends Piece {
  constructor(
    position: Position,
    color: Color,
    possibleMoves: Position[] = []
  ) {
    super(position, PieceType.BISHOP, color, possibleMoves);
  }

  public updatePossibleMoves(positions: Position[]): void {
    this.possibleMoves = [];
    // find upper diagonal movements
    if (this.position.y !== 9) {
      this.possibleMoves.push(
        ...Piece.findMoves(
          this.position.x,
          this.position.y,
          1,
          1,
          positions,
          this.color
        )
      );
      this.possibleMoves.push(
        ...Piece.findMoves(
          this.position.x,
          this.position.y,
          -1,
          1,
          positions,
          this.color
        )
      );
    }

    if (this.position.y !== 0) {
      this.possibleMoves.push(
        ...Piece.findMoves(
          this.position.x,
          this.position.y,
          1,
          -1,
          positions,
          this.color
        )
      );
      this.possibleMoves.push(
        ...Piece.findMoves(
          this.position.x,
          this.position.y,
          -1,
          -1,
          positions,
          this.color
        )
      );
    }

    this.targetSquares();
  }

  public clone(): Piece {
      return new Bishop(this.position, this.color, this.possibleMoves);
  }
}
