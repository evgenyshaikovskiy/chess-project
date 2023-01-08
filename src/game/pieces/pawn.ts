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
      (p) => p.number_key === oneSquareForwardKey
    );

    if (oneSquareForwardPos && !oneSquareForwardPos.isOccupied()) {
      this.possibleMoves.push(oneSquareForwardPos);

      let twoSquareForwardPos = positions.find(
        (p) => p.number_key === twoSquareForwardKey
      );

      if (twoSquareForwardPos && !twoSquareForwardPos.isOccupied()) {
        this.possibleMoves.push(twoSquareForwardPos);
      }
    }

    let leftSquareCapturePos = positions.find(
      (p) => p.number_key === leftSquareCaptureKey
    );

    if (leftSquareCapturePos && leftSquareCapturePos.isOccupied()) {
      this.possibleMoves.push(leftSquareCapturePos);
    }


    let rightSquareCapturePos = positions.find(
      (p) => p.number_key === rightSquareCaptureKey
    );
    if (rightSquareCapturePos && rightSquareCapturePos.isOccupied()) {
      this.possibleMoves.push(rightSquareCapturePos);
    }

    // console.log('keys: ', [oneSquareForwardKey, twoSquareForwardKey, leftSquareCaptureKey, rightSquareCaptureKey])
    // console.log('position: ', this.position);
    // console.log('possible moves: ', this.possibleMoves);
    // console.log('direction', this.pawnDirection);
  }

  public moveTo(position: Position): void {
    if (this.isFirstMove) {
      this.isFirstMove = false;
    }

    position.placePiece(this);
  }
}
