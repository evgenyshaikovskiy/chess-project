import { Position } from "../../game/position";
import "./tile.styles.scss";

type TileProps = {
  color: string;
  position: Position;
  image?: string;
  isHighlighted: boolean;
  onTileClick: (position: Position, isHighlighted: boolean) => void;
};

export default function Tile({
  color,
  position,
  image,
  onTileClick,
  isHighlighted,
}: TileProps) {
  const className: string = [
    `${color}-tile`,
    image && "piece-tile",
    isHighlighted && "highlighted",
  ]
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
      onClick={() => onTileClick(position, isHighlighted)}
    ></div>
  );
}
