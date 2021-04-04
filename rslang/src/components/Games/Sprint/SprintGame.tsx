import "bootstrap/dist/css/bootstrap.min.css";
import "./Sprint.scss";
import SprintImg from "../../../assets/img/games/sprintGame.jpg";
import { Button } from "react-bootstrap";
import React, { useState, useEffect } from "react";

import FullScreenWrapper from "../../FullScreenWrapper/FullScreenWrapper";
import Preview from "../Preview/Preview";
import WordComponent from "../Sprint/WordComponent";

const PREVIEW_HEADING = "Спринт";
const PREVIEW__DESCRIPTION =
  "На экране есть слово на английском и перевод. Вы должны определить правильный перевод или неправильный";

const SprintGame = () => {
  const [words, setWords] = useState(null);
  const [count, setCount] = useState(60);
  const [countStart, setCountStart] = useState(false);
  const level = null; //TODO: get level from book page
  const [word, changeWord] = useState(null);
  const [wordTranslate, changeWordTranslate] = useState(null);
  const [indexWord, changeIndexWord] = useState(0);

  const setUserWords = (words: any) => {
    setWords(words);
    setCountStart(true);
    const kindResponse = Math.floor(Math.random() * 10) < 5 ? false : true;
    changeWord(words[indexWord].word);
    if(kindResponse){
      
    }
    changeWordTranslate(words[indexWord].wordTranslate);
    changeIndexWord(indexWord + 1);
  };

  useEffect(() => {
    if(count !== 0 && countStart){
      setTimeout(() => {setCount(count - 1);}, 1000);
    }
  }, [count, countStart])

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
          <div className="area-game">
            <span>Time {count}</span>
            <p>Очки: 0</p>
            <p>Кругляши</p>
            <p>{word} - {wordTranslate}</p>
            <button>Верно</button>
            <button>Не верно</button>
          </div>
        )}
      </FullScreenWrapper>
    </div>
  );
};

export default SprintGame;