import { Piece } from "./piece";
import { Position } from "./position";
import { Color } from "./types";

export class Board {
  public positions: Position[];
  public pieces: Piece[];

  constructor(positions: Position[]) {
    this.positions = positions;

    // maybe there is a way without casting
    this.pieces = positions
      .filter((p) => p.isOccupied())
      .map((p) => p.piece as unknown as Piece);
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
    const [whiteKing] = this.pieces.filter(
      (p) => p.isKing && p.color === Color.WHITE
    );
    const [blackKing] = this.pieces.filter(
      (p) => p.isKing && p.color === Color.BLACK
    );

    whiteKing.possibleMoves = whiteKing.possibleMoves.filter(
      (p) => !p.isTargetedByBlackPiece
    );
    blackKing.possibleMoves = blackKing.possibleMoves.filter(
      (p) => !p.isTargetedByWhitePiece
    );
  }

  public clone(): Board {
    return new Board(this.positions.map((row) => row.clone()));
  }
}
