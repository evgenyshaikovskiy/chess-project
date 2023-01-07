import { Board } from "./board";
import { Piece } from "./piece";
import { Position } from "./position";
import { PieceType } from "./types";
import { Color } from "./types";

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
  positions[1][i].placePiece(
    new Piece(positions[1][i], PieceType.PAWN, Color.WHITE)
  );
  positions[8][i].placePiece(
    new Piece(positions[8][i], PieceType.PAWN, Color.BLACK)
  );
}

positions[0][0].placePiece(
  new Piece(positions[0][0], PieceType.ROOK, Color.WHITE)
);
positions[0][1].placePiece(
  new Piece(positions[0][1], PieceType.LANCE, Color.WHITE)
);
positions[0][2].placePiece(
  new Piece(positions[0][2], PieceType.KNIGHT, Color.WHITE)
);
positions[0][3].placePiece(
  new Piece(positions[0][3], PieceType.BISHOP, Color.WHITE)
);
positions[0][4].placePiece(
  new Piece(positions[0][4], PieceType.QUEEN, Color.WHITE)
);
positions[0][5].placePiece(
  new Piece(positions[0][5], PieceType.KING, Color.WHITE)
);
positions[0][6].placePiece(
  new Piece(positions[0][6], PieceType.BISHOP, Color.WHITE)
);
positions[0][7].placePiece(
  new Piece(positions[0][7], PieceType.KNIGHT, Color.WHITE)
);
positions[0][8].placePiece(
  new Piece(positions[0][8], PieceType.LANCE, Color.WHITE)
);
positions[0][9].placePiece(
  new Piece(positions[0][9], PieceType.ROOK, Color.WHITE)
);

positions[9][0].placePiece(
  new Piece(positions[9][0], PieceType.ROOK, Color.BLACK)
);
positions[9][1].placePiece(
  new Piece(positions[9][1], PieceType.LANCE, Color.BLACK)
);
positions[9][2].placePiece(
  new Piece(positions[9][2], PieceType.KNIGHT, Color.BLACK)
);
positions[9][3].placePiece(
  new Piece(positions[9][3], PieceType.BISHOP, Color.BLACK)
);
positions[9][4].placePiece(
  new Piece(positions[9][4], PieceType.QUEEN, Color.BLACK)
);
positions[9][5].placePiece(
  new Piece(positions[9][5], PieceType.KING, Color.BLACK)
);
positions[9][6].placePiece(
  new Piece(positions[9][6], PieceType.BISHOP, Color.BLACK)
);
positions[9][7].placePiece(
  new Piece(positions[9][7], PieceType.KNIGHT, Color.BLACK)
);
positions[9][8].placePiece(
  new Piece(positions[9][8], PieceType.LANCE, Color.BLACK)
);
positions[9][9].placePiece(
  new Piece(positions[9][9], PieceType.ROOK, Color.BLACK)
);

export const initialBoard: Board = new Board(positions);
