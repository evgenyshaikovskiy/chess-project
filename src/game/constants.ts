import { Rook } from "./pieces/rook";
import { Lance } from "./pieces/lance";
import { Queen } from "./pieces/queen";
import { Bishop } from "./pieces/bishop";
import { Knight } from "./pieces/knight";
import { Board } from "./board";
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
const positions = source.map((y) => source.map((x) => new Position(x, y)));

for (let i = 0; i < positions[1].length; i++) {
  positions[1][i].placePiece(new Pawn(positions[1][i], Color.WHITE));
  positions[8][i].placePiece(new Pawn(positions[8][i], Color.BLACK));
}

positions[0][0].placePiece(new Rook(positions[0][0], Color.WHITE));
positions[0][1].placePiece(new Lance(positions[0][1], Color.WHITE));
positions[0][2].placePiece(new Knight(positions[0][2], Color.WHITE));
positions[0][3].placePiece(new Bishop(positions[0][3], Color.WHITE));
positions[0][4].placePiece(new Queen(positions[0][4], Color.WHITE));
positions[0][5].placePiece(new King(positions[0][5], Color.WHITE));
positions[0][6].placePiece(new Bishop(positions[0][6], Color.WHITE));
positions[0][7].placePiece(new Knight(positions[0][7], Color.WHITE));
positions[0][8].placePiece(new Lance(positions[0][8], Color.WHITE));
positions[0][9].placePiece(new Rook(positions[0][9], Color.WHITE));

positions[9][0].placePiece(new Rook(positions[9][0], Color.BLACK));
positions[9][1].placePiece(new Lance(positions[9][1], Color.BLACK));
positions[9][2].placePiece(new Knight(positions[9][2], Color.BLACK));
positions[9][3].placePiece(new Bishop(positions[9][3], Color.BLACK));
positions[9][4].placePiece(new Queen(positions[9][4], Color.BLACK));
positions[9][5].placePiece(new King(positions[9][5], Color.BLACK));
positions[9][6].placePiece(new Bishop(positions[9][6], Color.BLACK));
positions[9][7].placePiece(new Knight(positions[9][7], Color.BLACK));
positions[9][8].placePiece(new Lance(positions[9][8], Color.BLACK));
positions[9][9].placePiece(new Rook(positions[9][9], Color.BLACK));

export const initialBoard: Board = new Board(
  positions.flatMap((x) => x.reverse()).reverse()
);
