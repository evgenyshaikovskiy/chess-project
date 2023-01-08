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
    this.possibleMoves = [];

    // moves to all sides one square
    this.possibleMoves.push(...Piece.findMoves(this.position.x, this.position.y, 0, 2, positions, this.color, 1))
    this.possibleMoves.push(...Piece.findMoves(this.position.x, this.position.y, 0, -2, positions, this.color, 1))
    this.possibleMoves.push(...Piece.findMoves(this.position.x, this.position.y, 2, 0, positions, this.color, 1))
    this.possibleMoves.push(...Piece.findMoves(this.position.x, this.position.y, -2, 0, positions, this.color, 1))
    this.possibleMoves.push(...Piece.findMoves(this.position.x, this.position.y, -1, 2, positions, this.color, 1))
    this.possibleMoves.push(...Piece.findMoves(this.position.x, this.position.y, 1, 2, positions, this.color, 1))
    this.possibleMoves.push(...Piece.findMoves(this.position.x, this.position.y, -2, 1, positions, this.color, 1))
    this.possibleMoves.push(...Piece.findMoves(this.position.x, this.position.y, 2, 1, positions, this.color, 1))
    this.possibleMoves.push(...Piece.findMoves(this.position.x, this.position.y, -1, -2, positions, this.color, 1))
    this.possibleMoves.push(...Piece.findMoves(this.position.x, this.position.y, 1, -2, positions, this.color, 1))
    this.possibleMoves.push(...Piece.findMoves(this.position.x, this.position.y, 2, -1, positions, this.color, 1))
    this.possibleMoves.push(...Piece.findMoves(this.position.x, this.position.y, -2, -1, positions, this.color, 1))

    this.targetSquares();
  }

  public moveTo(position: Position): void {
    position.placePiece(this);
  }
}
