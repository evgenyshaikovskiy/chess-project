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

export const ROWS_COUNT = 10, COLS_COUNT = 10;


// looks ugly
const source = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const positions = source.map((y) => source.map((x) => new Position(x, y)))

export const initialBoard: Board = new Board([
  // black pieces
  new Piece(new Position(0, 9), PieceType.ROOK, Color.BLACK),
  new Piece(new Position(1, 9), PieceType.LANCE, Color.BLACK),
  new Piece(new Position(2, 9), PieceType.KNIGHT, Color.BLACK),
  new Piece(new Position(3, 9), PieceType.BISHOP, Color.BLACK),
  new Piece(new Position(4, 9), PieceType.QUEEN, Color.BLACK),
  new Piece(new Position(5, 9), PieceType.KING, Color.BLACK),
  new Piece(new Position(6, 9), PieceType.BISHOP, Color.BLACK),
  new Piece(new Position(7, 9), PieceType.KNIGHT, Color.BLACK),
  new Piece(new Position(8, 9), PieceType.LANCE, Color.BLACK),
  new Piece(new Position(9, 9), PieceType.ROOK, Color.BLACK),

  // white pieces
  new Piece(new Position(0, 0), PieceType.ROOK, Color.WHITE),
  new Piece(new Position(1, 0), PieceType.LANCE, Color.WHITE),
  new Piece(new Position(2, 0), PieceType.KNIGHT, Color.WHITE),
  new Piece(new Position(3, 0), PieceType.BISHOP, Color.WHITE),
  new Piece(new Position(4, 0), PieceType.QUEEN, Color.WHITE),
  new Piece(new Position(5, 0), PieceType.KING, Color.WHITE),
  new Piece(new Position(6, 0), PieceType.BISHOP, Color.WHITE),
  new Piece(new Position(7, 0), PieceType.KNIGHT, Color.WHITE),
  new Piece(new Position(8, 0), PieceType.LANCE, Color.WHITE),
  new Piece(new Position(9, 0), PieceType.ROOK, Color.WHITE),
], positions);
