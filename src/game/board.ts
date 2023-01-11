import { Piece } from "./piece";
import { King } from "./pieces/king";
import { Position } from "./position";
import { Color } from "./types";

export class Board {
  public positions: Position[];
  public pieces: Piece[];

  public whiteKing: King;
  public blackKing: King;

  public isWhiteTurnToMove: boolean;

  constructor(positions: Position[]) {
    this.positions = positions;

    // maybe there is a way without casting
    this.pieces = positions
      .filter((p) => p.isOccupied())
      .map((p) => p.piece as unknown as Piece);

    this.whiteKing = this.pieces.find(
      (p) => p.isKing && p.color === Color.WHITE
    ) as King;

    this.blackKing = this.pieces.find(
      (p) => p.isKing && p.color === Color.BLACK
    ) as King;

    this.isWhiteTurnToMove = true;
  }

  public updateMovesForAllPieces(): void {
    this.unTargetAllSquares();
    this.pieces.forEach((p) => p.updatePossibleMoves(this.positions));
    this.excludeIllegalKingMoves();
  }

  public unTargetAllSquares(): void {
    this.positions.forEach((pos) => {
      pos.isTargetedByBlackPiece = false;
      pos.isTargetedByWhitePiece = false;
    });
  }

  public movePieceTo(piece: Piece, position: Position): void {
    this.pieces = this.pieces.filter((p) => !p.isSamePosition(position));
    piece.moveTo(position);
  }

  public excludeIllegalKingMoves(): void {
    this.whiteKing.possibleMoves = this.whiteKing.possibleMoves.filter(
      (p) => !p.isTargetedByBlackPiece
    );

    this.blackKing.possibleMoves = this.blackKing.possibleMoves.filter(
      (p) => !p.isTargetedByWhitePiece
    );

    if (this.blackKing.position.isTargetedByWhitePiece) {
      this.blackKing.isUnderAttack = true;
    }
    
    if (this.whiteKing.position.isTargetedByBlackPiece) {
      this.whiteKing.isUnderAttack = true;
    }
  }

  public clone(): Board {
    return new Board(this.positions.map((row) => row.clone()));
  }
}
