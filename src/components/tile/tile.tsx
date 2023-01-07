import { Position } from "../../game/position";
import { Color } from "../../game/types";
import "./tile.styles.scss";

type TileProps = {
  color: Color;
  position: Position;
};

export default function Tile({ color, position }: TileProps) {
  const tileClassName = `${color}-tile`;
  return <div className={tileClassName}>{position.key}</div>;
}
