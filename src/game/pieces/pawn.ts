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
    this.possibleMoves = [];

    // calculate all keys
    // restrictions on left and right side
    const oneSquareForwardKey =
      this.position.y === 0 || this.position.y === 9
        ? -1
        : Position.calculateNumericKey(
            this.position.x,
            this.position.y + this.pawnDirection * 1
          );

    const twoSquareForwardKey = !this.isFirstMove
      ? -1
      : Position.calculateNumericKey(
          this.position.x,
          this.position.y + this.pawnDirection * 2
        );

    const leftSquareCaptureKey =
      this.position.x === 0
        ? -1
        : Position.calculateNumericKey(
            this.position.x - 1,
            this.position.y + this.pawnDirection * 1
          );

    const rightSquareCaptureKey =
      this.position.x === 9
        ? -1
        : Position.calculateNumericKey(
            this.position.x + 1,
            this.position.y + this.pawnDirection * 1
          );

    // switch to const??
    let oneSquareForwardPos = positions.find(
      (p) => p.numeric_key === oneSquareForwardKey
    );

    if (oneSquareForwardPos && !oneSquareForwardPos.isOccupied()) {
      this.possibleMoves.push(oneSquareForwardPos);

      let twoSquareForwardPos = positions.find(
        (p) => p.numeric_key === twoSquareForwardKey
      );

      if (twoSquareForwardPos && !twoSquareForwardPos.isOccupied()) {
        this.possibleMoves.push(twoSquareForwardPos);
      }
    }

    let leftSquareCapturePos = positions.find(
      (p) => p.numeric_key === leftSquareCaptureKey
    );

    if (
      leftSquareCapturePos &&
      leftSquareCapturePos.isOccupiedByOpponent(this.color)
    ) {
      this.possibleMoves.push(leftSquareCapturePos);
    }

    let rightSquareCapturePos = positions.find(
      (p) => p.numeric_key === rightSquareCaptureKey
    );
    if (
      rightSquareCapturePos &&
      rightSquareCapturePos.isOccupiedByOpponent(this.color)
    ) {
      this.possibleMoves.push(rightSquareCapturePos);
    }

    if (leftSquareCapturePos) {
      if (this.color === Color.WHITE) {
        leftSquareCapturePos!.isTargetedByWhitePiece = true;
      } else {
        leftSquareCapturePos!.isTargetedByBlackPiece = true;
      }
    }

    if (rightSquareCapturePos) {
      if (this.color === Color.WHITE) {
        rightSquareCapturePos!.isTargetedByWhitePiece = true;
      } else {
        rightSquareCapturePos!.isTargetedByBlackPiece = true;
      }
    }
  }

  public clone(): Piece {
    return new Pawn(this.position, this.color, this.possibleMoves);
  }

  public moveTo(position: Position): void {
    super.moveTo(position);
    if (this.isFirstMove) {
      this.isFirstMove = false;
    }
  }
}
