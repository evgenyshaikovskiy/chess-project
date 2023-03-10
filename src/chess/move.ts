import { Piece } from "./piece";

export class Move {
  public source: string;
  public destination: string;
  public piecePicturePath: string;

  constructor(source: string, destination: string, piece: Piece) {
    this.source = source;
    this.destination = destination;
    this.piecePicturePath = piece.image;
  }

  public get interpretation(): string {
    return `${this.source}-${this.destination}`;
  }
}
