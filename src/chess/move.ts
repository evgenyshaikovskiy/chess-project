import { Piece } from "./piece";

export class Move {
  private source: string;
  private destination: string;
  private pieceShorthandKey: string;

  constructor(source: string, destination: string, piece: Piece) {
    this.source = source;
    this.destination = destination;
    this.pieceShorthandKey = piece.shorthandKey;
  }

  public get moveToString(): string {
    return `${this.source}${this.pieceShorthandKey}${this.destination}`;
  }
}
