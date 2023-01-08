import { PieceType } from "./../types";
import { Piece } from "../piece";
import { Position } from "../position";
import { Color } from "../types";

export class Pawn extends Piece {
  private pawnDirection: number;

  constructor(
    position: Position,
    color: Color,
    possibleMoves: Position[] = []
  ) {
    super(position, PieceType.PAWN, color, possibleMoves);

    // black pawns moves downwards, white upwards
    this.pawnDirection = color === 'white' ? 1 : -1;
  }

  public updatePossibleMoves(): void {
    console.log('pawn direction is', this.pawnDirection)
  }
}
