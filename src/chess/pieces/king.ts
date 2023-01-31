import { PieceType } from "../types";
import { Piece } from "../piece";
import { Position } from "../position";
import { Color } from "../types";
import { findMoves } from "../game";

export class King extends Piece {
  constructor(
    position: Position,
    color: Color,
    possibleMoves: Position[] = []
  ) {
    super(position, PieceType.KING, color, possibleMoves);
  }

  public updatePossibleMoves(positions: Position[]): void {
    this.possibleMoves = [];

    this.possibleMoves.push(
      ...findMoves(
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
      ...findMoves(
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
      ...findMoves(
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
      ...findMoves(
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
      ...findMoves(
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
      ...findMoves(
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
      ...findMoves(
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
      ...findMoves(
        this.position.x,
        this.position.y,
        -1,
        0,
        positions,
        this.color,
        1
      )
    );

    this.targetSquares();
  }

  public clone(): Piece {
    return new King(this.position, this.color, this.possibleMoves);
  }
}
