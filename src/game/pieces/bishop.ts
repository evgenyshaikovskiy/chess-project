import { PieceType } from "./../types";
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
      this.possibleMoves.push(...Piece.findDiagonalMoves(this.position.x, this.position.y, 1, 1, positions, this.color, (x: number, y: number) => x + 10*y));
      this.possibleMoves.push(...Piece.findDiagonalMoves(this.position.x, this.position.y, -1, 1, positions, this.color, (x: number, y: number) => x + 10*y));
    }

    if (this.position.y !== 0) {
      this.possibleMoves.push(...Piece.findDiagonalMoves(this.position.x, this.position.y, 1, -1, positions, this.color, (x: number, y: number) => x + 10*y));
      this.possibleMoves.push(...Piece.findDiagonalMoves(this.position.x, this.position.y, -1, -1, positions, this.color, (x: number, y: number) => x + 10*y));
    }
  }

  public moveTo(position: Position): void {
    position.placePiece(this);
  }
}
