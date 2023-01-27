import { Piece } from "../../../chess/piece";
import { Bishop } from "../../../chess/pieces/bishop";
import { Knight } from "../../../chess/pieces/knight";
import { Lance } from "../../../chess/pieces/lance";
import { Queen } from "../../../chess/pieces/queen";
import { Rook } from "../../../chess/pieces/rook";
import { Position } from "../../../chess/position";
import { Color, PieceType } from "../../../chess/types";
import "./promotion-selector.styles.scss";
import classes from "./styles.module.scss";

type PromotionSelectorProps = {
  color: Color;
  submit: (piece: Piece) => void;
  visible: boolean;
};
const PromotionSelector = ({
  color,
  visible,
  submit,
}: PromotionSelectorProps) => {
  const rootClasses = [classes.appModal];

  if (visible) {
    rootClasses.push(classes.active);
  }

  const availablePiecesNames = [
    "bishop",
    "knight",
    "lance",
    "queen",
    "rook",
  ].map((name) => name + `_${color}`);

  const onOptionClickHandler = (pieceNameColor: string) => {
    const pieceName = pieceNameColor.split("_").at(0);

    if (pieceName === PieceType.ROOK) {
      submit(new Rook(new Position(-1, -1), color));
    } else if (pieceName === PieceType.KNIGHT) {
      submit(new Knight(new Position(-1, -1), color));
    } else if (pieceName === PieceType.LANCE) {
      submit(new Lance(new Position(-1, -1), color));
    } else if (pieceName === PieceType.QUEEN) {
      submit(new Queen(new Position(-1, -1), color));
    } else if (pieceName === PieceType.BISHOP) {
      submit(new Bishop(new Position(-1, -1), color));
    }
  };

  return (
    <div className={rootClasses.join(" ")}>
      <div
        className={classes.appModalContent}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="promotion-selector-container">
          {availablePiecesNames.map((imgName, index) => {
            return (
              <div
                className="promotion-option-icon"
                key={index}
                onClick={() => onOptionClickHandler(imgName)}
                style={{
                  backgroundImage: `url('${
                    process.env.PUBLIC_URL +
                    "/assets/images/" +
                    imgName +
                    ".png"
                  }')`,
                }}
              ></div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PromotionSelector;
