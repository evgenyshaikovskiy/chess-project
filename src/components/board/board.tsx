import { Color } from "../../game/types";
import { Tile } from "../tile/tile";
import "./board.styles.scss";

export const Board = () => {
  let color = Color.BLACK;

  let arr = [];
  for (let i = 0; i < 100; i++) {
    arr.push(i);
  }

  return (
    <div className="board-wrapper">
      <div className="tiles-wrapper">
        {arr.map((tiles, index) => {
          const tileColor = tiles % 2 === 0 ? Color.WHITE : Color.BLACK;
          return <Tile color={tileColor} key={index}></Tile>;
        })}
      </div>
    </div>
  );
};
