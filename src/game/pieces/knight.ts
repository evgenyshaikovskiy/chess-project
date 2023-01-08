import { PieceType } from "./../types";
import { Piece } from "../piece";
import { Position } from "../position";
import { Color } from "../types";

export class Knight extends Piece {
  constructor(
    position: Position,
    color: Color,
    possibleMoves: Position[] = []
  ) {
    super(position, PieceType.KNIGHT, color, possibleMoves);
  }

  public updatePossibleMoves(positions: Position[]): void {
    console.log("updated");
  }
}
