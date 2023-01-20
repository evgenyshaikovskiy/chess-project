import { Fragment, useContext, useEffect } from "react";
import ChessBoard from "../board/chess-board";
import { Position } from "../../chess/position";
import { GameContext } from "../../contexts/game.context";

export default function ChessGame() {
  const {
    isWhiteTurnToMove,
    gameState,
    positions,
    modifyPositions,
  } = useContext(GameContext);

  const updateMoves = () => {
    // un target all positions
    positions.forEach((pos) => {
      pos.isTargetedByBlackPiece = false;
      pos.isTargetedByWhitePiece = false;
    });

    // update possible moves for each piece
    positions
      .filter((pos) => pos.piece)
      .forEach((pos) => pos.piece!.updatePossibleMoves(positions));

    modifyPositions([...positions]);
    // exclude illegal
  };

  const performMoveHandler = (
    source: Position,
    destination: Position
  ): boolean => {
    console.log("FROM", source, "TO", destination);

    // first case, destination is empty => move without capturing
    // second case, destination is occupied by enemy => move with capturing

    source.piece!.moveTo(destination);

    console.log(
      positions.filter((pos) => pos.piece).map((pos) => pos.piece!).length
    );

    return true;
  };

  useEffect(() => {
    console.log("move is maded");
    updateMoves();
    console.log("position is updated");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isWhiteTurnToMove]);

  return (
    <Fragment>
      <div className="chess-game-wrapper">
        <ChessBoard performMove={performMoveHandler}></ChessBoard>
      </div>
      <div>
        It is {isWhiteTurnToMove ? "white turn to move" : "black turn to move"}
      </div>
      <div>Game state: {gameState}</div>
    </Fragment>
  );
}
