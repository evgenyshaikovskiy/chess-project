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

  public updatePiecesConditionFromBoard() {
    this.pieces = this.positions
      .filter((p) => p.isOccupied())
      .map((p) => p.piece as unknown as Piece);
  }

  public updateMovesForAllPieces(): void {
    this.unTargetAllSquares();
    this.pieces.forEach((p) => p.updatePossibleMoves(this.positions));

    // if (this.checkForWhiteCheck()) {
    //   this.gameState = GameState.BlackVictory;
    // }

    // if (this.checkForWhiteCheck()) {
    //   this.gameState = GameState.WhiteVictory;
    // }
  }

  public unTargetAllSquares(): void {
    this.positions.forEach((pos) => {
      pos.isTargetedByBlackPiece = false;
      pos.isTargetedByWhitePiece = false;
    });
  }

  public checkForBlackKingCheck() {
    return this.findBlackKing()!.position.isTargetedByWhitePiece;
  }

  public checkForWhiteKingCheck() {
    return this.findWhiteKing()!.position.isTargetedByBlackPiece;
  }

  public movePieceTo(piece: Piece, position: Position): void {
    piece.moveTo(position);
    this.updatePiecesConditionFromBoard();
  }

  public tryToMovePieceTo(piece: Piece, position: Position): boolean {
    console.log('trying to move', piece, 'to', position);
    const mockBoard = this.clone();
    mockBoard.movePieceTo(piece, position);
    mockBoard.updateMovesForAllPieces();

    console.log(mockBoard.findBlackKing());
    console.log(mockBoard.findWhiteKing());

    if (piece.color === Color.WHITE) {
      return mockBoard.checkForWhiteKingCheck();
    }
    else {
      return mockBoard.checkForBlackKingCheck();
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
