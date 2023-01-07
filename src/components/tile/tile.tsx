import { Position } from "../../game/position";
import { Color } from "../../game/types";
import "./tile.styles.scss";

type TileProps = {
  color: Color;
  position: Position;
  image?: string;
};

export default function Tile({ color, position, image }: TileProps) {
  const className: string = [`${color}-tile`, image && "piece-tile"]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={className}
      style={{
        backgroundImage: image
          ? `url('${process.env.PUBLIC_URL + image}')`
          : "none",
      }}
    ></div>
  );
}
