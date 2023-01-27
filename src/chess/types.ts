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
  BLACK_VICTORY = "Black Victory!",
  GAME_IS_RUNNING = "Game is still on!",
  WHITE_VICTORY = "White Victory!",
  DRAW_BY_REPETITION = "Draw by repetition",
  STALEMATE = "Stalemate!",
}

export enum GameCheckState {
  WHITE_KING_CHECKED = "Check for white king!",
  BLACK_KING_CHECKED = "Check for black king!",
  NO_CHECKS = "No check for any king",
}
