import { PieceType } from "./../types";
import { Piece } from "../piece";
import { Position } from "../position";
import { Color } from "../types";

export class King extends Piece {
  public isUnderAttack: boolean;

  constructor(
    position: Position,
    color: Color,
    possibleMoves: Position[] = []
  ) {
    super(position, PieceType.KING, color, possibleMoves);

    this.isUnderAttack = false;
  }

  public updatePossibleMoves(positions: Position[]): void {
    this.possibleMoves = [];

    this.possibleMoves.push(
      ...Piece.findMoves(
        this.position.x,
        this.position.y,
        1,
        1,
        positions,
        this.color,
        1
      )
    );
    this.possibleMoves.push(
      ...Piece.findMoves(
        this.position.x,
        this.position.y,
        1,
        -1,
        positions,
        this.color,
        1
      )
    );
    this.possibleMoves.push(
      ...Piece.findMoves(
        this.position.x,
        this.position.y,
        -1,
        1,
        positions,
        this.color,
        1
      )
    );
    this.possibleMoves.push(
      ...Piece.findMoves(
        this.position.x,
        this.position.y,
        -1,
        -1,
        positions,
        this.color,
        1
      )
    );

    this.possibleMoves.push(
      ...Piece.findMoves(
        this.position.x,
        this.position.y,
        1,
        0,
        positions,
        this.color,
        1
      )
    );
    this.possibleMoves.push(
      ...Piece.findMoves(
        this.position.x,
        this.position.y,
        0,
        1,
        positions,
        this.color,
        1
      )
    );
    this.possibleMoves.push(
      ...Piece.findMoves(
        this.position.x,
        this.position.y,
        0,
        -1,
        positions,
        this.color,
        1
      )
    );
    this.possibleMoves.push(
      ...Piece.findMoves(
        this.position.x,
        this.position.y,
        -1,
        0,
        positions,
        this.color,
        1
      )
    );

    // target squares
    this.targetSquares();
  }

  public excludeIllegalMoves(): void {
    this.possibleMoves = this.possibleMoves.filter(
      (p) =>
        (this.color === Color.BLACK && !p.isTargetedByWhitePiece) ||
        (this.color === Color.WHITE && !p.isTargetedByBlackPiece)
    );
  }
}
