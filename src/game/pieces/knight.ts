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
    this.possibleMoves = [];
    // 1. two up - one left
    // 2. two up - one right
    // 3. one up - two left 
    // 4. one up - two right  
    // 5. two down - one left
    // 6. two down - one right
    // 7. one down - two right
    // 8. one down - two left

  }

  public moveTo(position: Position): void {
    position.placePiece(this);
  }
}
