import { useContext } from "react";
import "./move-list.styles.scss";
import { GameContext } from "../../../contexts/game.context";
import { Move } from "../../../chess/move";

function MoveList() {
  const { gameMoves } = useContext(GameContext);

  return (
    <div className="move-list-wrapper">
      <div className="move-list-title">Moves:</div>
      <div className="move-list-moves-container">
        {gameMoves.map((move, key) => (
          <MoveDescription
            key={key}
            move={move}
            isWhite={key % 2 === 0}
            moveNumber={key + 1}
          />
        ))}
      </div>
    </div>
  );
}

export default MoveList;

type MoveDescriptionProps = {
  move: Move;
  isWhite: boolean;
  moveNumber: number;
};

const MoveDescription = ({
  move,
  isWhite,
  moveNumber,
}: MoveDescriptionProps) => {
  return (
    <div
      className="move-description"
      style={{ backgroundColor: `${isWhite ? "#faebd7" : "#284b28"}` }}
    >
      {moveNumber}. {move.moveToString}
    </div>
  );
};
