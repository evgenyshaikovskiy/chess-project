import { PieceType } from "./../types";
import { Piece } from "../piece";
import { Position } from "../position";
import { Color } from "../types";

export class Rook extends Piece {
  constructor(
    position: Position,
    color: Color,
    possibleMoves: Position[] = []
  ) {
    super(position, PieceType.ROOK, color, possibleMoves);
  }

  public updatePossibleMoves(): void {
    console.log('updating');
  }
}
