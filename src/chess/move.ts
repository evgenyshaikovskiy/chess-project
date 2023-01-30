import { Piece } from "./piece";

export class Move {
  public source: string;
  public destination: string;
  public pieceShorthandKey: string;
  public piecePicturePath: string;

  constructor(source: string, destination: string, piece: Piece) {
    this.source = source;
    this.destination = destination;
    this.pieceShorthandKey = piece.shorthandKey;
    this.piecePicturePath = piece.image;
  }

  public get moveToString(): string {
    return `${this.source}${this.pieceShorthandKey}${this.destination}`;
  }
}
