import "bootstrap/dist/css/bootstrap.min.css";
import "./Savanna.scss";
import React, { useState } from "react";

import FullScreenWrapper from "../../FullScreenWrapper/FullScreenWrapper";
import Preview from "../Preview/Preview";
import savannahImg from "../../../assets/img/games/savannah.jpg";

const PREVIEW_HEADING = "Саванна";
const PREVIEW__DESCRIPTION =
  "Слово прыгает с парашютом, предлагается 5 вариантов его перевода, правильный только один. Твоя задача выбрать правильный перевод слова раньше чем слово коснётся земли.";
const Savannah = () => {
  const [words, setWords] = useState(null);
  const [level, setLevel] = useState(null); //TODO: get level from book page

  const setUserWords = (words: any) => {
    setWords(words);
    console.log(words);
  };

  return (
    <div className="savanna">
      <FullScreenWrapper>
        {words === null ? (
          <Preview
            heading={PREVIEW_HEADING}
            description={PREVIEW__DESCRIPTION}
            backgroundImg={savannahImg}
            level={level}
            setUserWords={setUserWords}
          />
        ) : (
          <div className="savanna-game">
            <p>Слова есть</p>
          </div>
        )}
      </FullScreenWrapper>
    </div>
  );
};

export default Savannah;
