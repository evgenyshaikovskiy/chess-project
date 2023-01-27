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
