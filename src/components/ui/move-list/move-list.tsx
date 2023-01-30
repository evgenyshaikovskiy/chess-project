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
          <MoveDescription key={key} move={move} moveNumber={key + 1} />
        ))}
      </div>
    </div>
  );
}

export default MoveList;

type MoveDescriptionProps = {
  move: Move;
  moveNumber: number;
};

const MoveDescription = ({ move, moveNumber }: MoveDescriptionProps) => {
  return (
    <div className="move-description">
      {moveNumber}. {move.source}{" "}
      <img
        className="piece-icon"
        src={process.env.PUBLIC_URL + move.piecePicturePath}
        alt="piece"
      ></img>
      {move.destination}
    </div>
  );
};
