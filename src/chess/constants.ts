import { Rook } from "./pieces/rook";
import { Lance } from "./pieces/lance";
import { Queen } from "./pieces/queen";
import { Bishop } from "./pieces/bishop";
import { Knight } from "./pieces/knight";
import { Pawn } from "./pieces/pawn";
import { Position } from "./position";
import { Color } from "./types";
import { King } from "./pieces/king";

export const VERTICAL_AXIS = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
];
export const HORIZONTAL_AXIS = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
];

export const ROWS_COUNT = 10,
  COLS_COUNT = 10;

// looks ugly
const source = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
export const defaultPositions = source.map((y) => source.map((x) => new Position(x, y)));

for (let i = 0; i < defaultPositions[1].length; i++) {
  defaultPositions[1][i].placePiece(new Pawn(defaultPositions[1][i], Color.WHITE));
  defaultPositions[8][i].placePiece(new Pawn(defaultPositions[8][i], Color.BLACK));
}

defaultPositions[0][0].placePiece(new Rook(defaultPositions[0][0], Color.WHITE));
defaultPositions[0][1].placePiece(new Lance(defaultPositions[0][1], Color.WHITE));
defaultPositions[0][2].placePiece(new Knight(defaultPositions[0][2], Color.WHITE));
defaultPositions[0][3].placePiece(new Bishop(defaultPositions[0][3], Color.WHITE));
defaultPositions[0][4].placePiece(new Queen(defaultPositions[0][4], Color.WHITE));
defaultPositions[0][5].placePiece(new King(defaultPositions[0][5], Color.WHITE));
defaultPositions[0][6].placePiece(new Bishop(defaultPositions[0][6], Color.WHITE));
defaultPositions[0][7].placePiece(new Knight(defaultPositions[0][7], Color.WHITE));
defaultPositions[0][8].placePiece(new Lance(defaultPositions[0][8], Color.WHITE));
defaultPositions[0][9].placePiece(new Rook(defaultPositions[0][9], Color.WHITE));

defaultPositions[9][0].placePiece(new Rook(defaultPositions[9][0], Color.BLACK));
defaultPositions[9][1].placePiece(new Lance(defaultPositions[9][1], Color.BLACK));
defaultPositions[9][2].placePiece(new Knight(defaultPositions[9][2], Color.BLACK));
defaultPositions[9][3].placePiece(new Bishop(defaultPositions[9][3], Color.BLACK));
defaultPositions[9][4].placePiece(new Queen(defaultPositions[9][4], Color.BLACK));
defaultPositions[9][5].placePiece(new King(defaultPositions[9][5], Color.BLACK));
defaultPositions[9][6].placePiece(new Bishop(defaultPositions[9][6], Color.BLACK));
defaultPositions[9][7].placePiece(new Knight(defaultPositions[9][7], Color.BLACK));
defaultPositions[9][8].placePiece(new Lance(defaultPositions[9][8], Color.BLACK));
defaultPositions[9][9].placePiece(new Rook(defaultPositions[9][9], Color.BLACK));
