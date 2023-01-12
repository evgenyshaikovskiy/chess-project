import { Piece } from "./piece";
import { Position } from "./position";
import { Color, GameState } from "./types";

export class Board {
  public positions: Position[];
  public pieces: Piece[];
  public isWhiteTurnToMove: boolean;

  public gameState: GameState;

  constructor(positions: Position[]) {
    this.positions = positions;

    // maybe there is a way without casting
    this.pieces = positions
      .filter((p) => p.isOccupied())
      .map((p) => p.piece as unknown as Piece);

    this.isWhiteTurnToMove = true;

    this.gameState = GameState.GameIsRunning;
  }

  public updateMovesForAllPieces(): void {
    this.unTargetAllSquares();
    this.pieces.forEach((p) => p.updatePossibleMoves(this.positions));
    this.excludeIllegalMoves();

    if (this.checkForBlackVictory()) {
      this.gameState = GameState.BlackVictory;
    }

    if (this.checkForWhiteVictory()) {
      this.gameState = GameState.WhiteVictory;
    }
  }

  public unTargetAllSquares(): void {
    this.positions.forEach((pos) => {
      pos.isTargetedByBlackPiece = false;
      pos.isTargetedByWhitePiece = false;
    });
  }

  public checkForWhiteVictory() {
    return this.findBlackKing() === undefined;
  }

  public checkForBlackVictory() {
    return this.findWhiteKing() === undefined;
  }

  public movePieceTo(piece: Piece, position: Position): void {
    this.pieces = this.pieces.filter((p) => !p.isSamePosition(position));
    piece.moveTo(position);
  }

  // TODO: add moves that prevents
  public excludeIllegalMoves(): void {
    const whiteKing = this.findWhiteKing();
    const blackKing = this.findBlackKing();

    if (whiteKing && blackKing) {
      whiteKing.possibleMoves = whiteKing.possibleMoves.filter((p) => !p.isTargetedByBlackPiece);
      blackKing.possibleMoves = blackKing.possibleMoves.filter((p) => !p.isTargetedByWhitePiece);
    }
  }

  private findWhiteKing() {
    return this.pieces.find((p) => p.isKing && p.color === Color.WHITE);
  }

  private findBlackKing() {
    return this.pieces.find((p) => p.isKing && p.color === Color.BLACK);
  }

  public clone(): Board {
    return new Board(this.positions.map((row) => row.clone()));
  }
}
