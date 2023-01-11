import { PieceType } from "./../types";
import { Piece } from "../piece";
import { Position } from "../position";
import { Color } from "../types";
import { King } from "./king";

export class Rook extends Piece {
  constructor(
    position: Position,
    color: Color,
    possibleMoves: Position[] = []
  ) {
    super(position, PieceType.ROOK, color, possibleMoves);
  }

  public updatePossibleMoves(positions: Position[]): void {
    this.possibleMoves = [];

    if (this.position.y !== 9) {
      this.possibleMoves.push(
        ...Piece.findMoves(
          this.position.x,
          this.position.y,
          0,
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
          0,
          -1,
          positions,
          this.color
        )
      );
    }

    if (this.position.x !== 0) {
      this.possibleMoves.push(
        ...Piece.findMoves(
          this.position.x,
          this.position.y,
          -1,
          0,
          positions,
          this.color
        )
      );
    }

    if (this.position.x !== 9) {
      this.possibleMoves.push(
        ...Piece.findMoves(
          this.position.x,
          this.position.y,
          1,
          0,
          positions,
          this.color
        )
      );
    }

    this.targetSquares();
  }

  public moveTo(position: Position): void {
    position.placePiece(this);
  }

  public excludeIllegalMoves(position: Position[], king: King): void {}
}
