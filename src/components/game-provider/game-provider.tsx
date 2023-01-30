import React, { Fragment } from "react";
import { useSearchParams } from "react-router-dom";
import { GameContextProvider } from "../../contexts/game.context";
import ChessGame from "../game/chess-game";

function GameProvider() {
  const [queryParams] = useSearchParams();

  return (
    <Fragment>
      <GameContextProvider
        isClassic={queryParams.get("type") === "classic" ? true : false}
      >
        <ChessGame></ChessGame>
      </GameContextProvider>
    </Fragment>
  );
}

export default GameProvider;
