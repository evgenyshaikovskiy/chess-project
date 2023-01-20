import { PieceType } from "../types";
import { Piece } from "../piece";
import { Position } from "../position";
import { Color } from "../types";
import { findMoves } from "../game";

export class King extends Piece {
  public isFirstMove: boolean;

  constructor(
    position: Position,
    color: Color,
    possibleMoves: Position[] = []
  ) {
    super(position, PieceType.KING, color, possibleMoves);
    this.isFirstMove = true;
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

    // check short castling
    // write method to check empty squares
    // if (this.isFirstMove) {
    //   if (Piece.isCastlingLegal(this.position.x, this.position.y, 1, positions, true)) {
    //     console.log('short castling legal');
    //     console.log(this);
    //   }

    //   if (Piece.isCastlingLegal(this.position.x, this.position.y, 1, positions, true)) {
    //     console.log('long castling legal');
    //     console.log(this);
    //   }
    // }
  }

  public clone(): Piece {
    return new King(this.position, this.color, this.possibleMoves);
  }

  public moveTo(position: Position): void {
    super.moveTo(position);
    if (this.isFirstMove) {
      this.isFirstMove = false;
    }
  }
}
