import { PieceType } from "./../types";
import { Piece } from "../piece";
import { Position } from "../position";
import { Color } from "../types";

export class Lance extends Piece {
  constructor(
    position: Position,
    color: Color,
    possibleMoves: Position[] = []
  ) {
    super(position, PieceType.LANCE, color, possibleMoves);
  }

  public updatePossibleMoves(positions: Position[]): void {
  }

  public moveTo(position: Position): void {
      
  }
}
