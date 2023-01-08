import { PieceType } from "./../types";
import { Piece } from "../piece";
import { Position } from "../position";
import { Color } from "../types";

export class King extends Piece {
  constructor(
    position: Position,
    color: Color,
    possibleMoves: Position[] = []
  ) {
    super(position, PieceType.KING, color, possibleMoves);
  }

  public updatePossibleMoves(positions: Position[]): void {
    console.log("updated");
  }

  public moveTo(position: Position): void {}
}
