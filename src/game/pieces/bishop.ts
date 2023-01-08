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

  public updatePossibleMoves(): void{
    console.log('updated');
  }
}
