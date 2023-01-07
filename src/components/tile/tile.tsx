import { Color } from "../../game/types";
import "./tile.styles.scss";

type TileProps = {
  color: Color;
};

export const Tile = ({ color }: TileProps) => {
  const tileClassName = `tile-${color}`;
  return <div className={tileClassName}></div>;
};
