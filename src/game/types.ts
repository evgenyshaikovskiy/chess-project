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
  BlackVictory = -1,
  GameIsRunning = 0,
  WhiteVictory = 1,
  // need to update draw situations
  Draw = 2,
}
