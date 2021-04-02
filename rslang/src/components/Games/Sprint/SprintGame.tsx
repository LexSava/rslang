import "bootstrap/dist/css/bootstrap.min.css";
import "./Sprint.scss";
import SprintImg from "../../../assets/img/games/sprintGame.jpg";
import { Button } from "react-bootstrap";
import React, { useState } from "react";

import FullScreenWrapper from "../../FullScreenWrapper/FullScreenWrapper";
import Preview from "../Preview/Preview";

const PREVIEW_HEADING = "Спринт";
const PREVIEW__DESCRIPTION =
  "На экране есть слово на английском и перевод. Вы должны определить правильный перевод или неправильный";

const SprintGame = () => {
  const [words, setWords] = useState(null);
  const level = null; //TODO: get level from book page
  const [allWords, setAllWords] = useState(null);

  const setUserWords = (words: any) => {
    setWords(words);
    console.log(words[0]);
    setAllWords(words.map((word: any, index: number) => {
      return (
        <p key = {index}>
          <span>{word.word}</span><span> - {word.wordTranslate}</span>
        </p>
      )
    })
    );
  };

  return (
    <div className="sprint-game">
      <FullScreenWrapper>
        {words === null ? (
          <Preview
            heading={PREVIEW_HEADING}
            description={PREVIEW__DESCRIPTION}
            backgroundImg={SprintImg}
            level={level}
            setUserWords={setUserWords}
          />
        ) : (
          <div>
            {allWords}
          </div>
        )}
      </FullScreenWrapper>
    </div>
  );
};

export default SprintGame;