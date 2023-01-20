export enum Color {
  WHITE = "white",
  BLACK = "black",
}

export enum PieceType {
  PAWN = "pawn",
  BISHOP = "bishop",
  KNIGHT = "knight",
  LANCE = "lance",
  ROOK = "rook",
  QUEEN = "queen",
  KING = "king",
}

export enum GameState {
  BlackVictory = "Black Victory!",
  GameIsRunning = "Game is still on!",
  WhiteVictory = "White Victory!",
  DrawByRepetition = "Draw by repetition",
  Stalemate = "Stalemate!",
  WhiteKingIsChecked = "Check for white king!",
  BlackKingIsChecked = "Check for black king!",
}
