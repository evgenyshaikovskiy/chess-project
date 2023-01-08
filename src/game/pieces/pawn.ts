import { PieceType } from "./../types";
import { Piece } from "../piece";
import { Position } from "../position";
import { Color } from "../types";

export class Pawn extends Piece {
  private pawnDirection: number;
  private isFirstMove: boolean;

  constructor(
    position: Position,
    color: Color,
    possibleMoves: Position[] = []
  ) {
    super(position, PieceType.PAWN, color, possibleMoves);

    // black pawns moves downwards, white upwards
    this.pawnDirection = color === "white" ? 1 : -1;
    this.isFirstMove = true;
  }

  public updatePossibleMoves(positions: Position[]): void {
    // TODO: check restrictions, add promotion move

    // empty old moves
    this.possibleMoves = [];

    // calculate all keys
    // restrictions on left and right side
    const oneSquareForwardKey =
      this.position.y === 1 || this.position.y === 8
        ? -1
        : Position.calculateNumericKey(
            this.position.x,
            this.position.y + this.pawnDirection * 10
          );

    const twoSquareForwardKey = !this.isFirstMove
      ? -1
      : Position.calculateNumericKey(
          this.position.x,
          this.position.y + this.pawnDirection * 20
        );

    const leftSquareCaptureKey =
      this.position.x === 0
        ? -1
        : Position.calculateNumericKey(
            this.position.x - 1,
            this.position.y + this.pawnDirection * 10
          );

    const rightSquareCaptureKey =
      this.position.x === 9
        ? -1
        : Position.calculateNumericKey(
            this.position.x - 1,
            this.position.y + this.pawnDirection * 10
          );

    // moves
    const indexOfOneSquareForwardPos = positions.findIndex(
      (position) => position.number_key === oneSquareForwardKey
    );

    
    if (!positions[indexOfOneSquareForwardPos].isOccupied()) {
      this.possibleMoves.push(positions[indexOfOneSquareForwardPos]);
      const indexOfTwoSquareForwardPos = positions.findIndex(
        (position) => position.number_key === twoSquareForwardKey
      );

      if (!positions[indexOfTwoSquareForwardPos].isOccupied()) {
        this.possibleMoves.push(positions[indexOfTwoSquareForwardPos]);
      }
    }

    const indexOfLeftCapturePos = positions.findIndex(
      (position) => position.number_key === leftSquareCaptureKey
    );
    if (positions[indexOfLeftCapturePos].isOccupied()) {
      this.possibleMoves.push(positions[indexOfLeftCapturePos]);
    }

    const indexOfRightCapturePos = positions.findIndex(
      (position) => position.number_key === rightSquareCaptureKey
    );
    if (positions[indexOfRightCapturePos].isOccupied()) {
      this.possibleMoves.push(positions[indexOfLeftCapturePos]);
    }
  }
}
