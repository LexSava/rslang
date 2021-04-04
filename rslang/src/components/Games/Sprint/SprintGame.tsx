import "bootstrap/dist/css/bootstrap.min.css";
import "./Sprint.scss";
import SprintImg from "../../../assets/img/games/sprintGame.jpg";
import { Button } from "react-bootstrap";
import React, { useState, useEffect } from "react";

import FullScreenWrapper from "../../FullScreenWrapper/FullScreenWrapper";
import Preview from "../Preview/Preview";

const PREVIEW_HEADING = "Спринт";
const PREVIEW__DESCRIPTION =
  "На экране есть слово на английском и перевод. Вы должны определить правильный перевод или неправильный";

const SprintGame = () => {
  const [words, setWords] = useState(null);
  const level = null; //TODO: get level from book page
  const [count, setCount] = useState(60);
  const [countStart, setCountStart] = useState(false);
  const [word, changeWord] = useState(null);
  const [wordTranslate, changeWordTranslate] = useState(null);
  const [score, changeScore] = useState(0);
  const [valueResponse, changeValueResponse] = useState(true);
  const [indexWord, changeIndexWord] = useState(0);
  const [countTrueAnswers, changeCountTrueAnswers] = useState(0);
  const [bonusScore, changeBonusScore] = useState(1);

  const setUserWords = (words: any) => {
    setWords(words);
    setCountStart(true);
    changeWordAndTranslate(words);
  };

  const changeWordAndTranslate = (words: any) => {
    const randomResponse = Math.floor(Math.random() * 10) < 5 ? false : true;
    changeValueResponse(randomResponse);
    console.log('valueResponse', valueResponse)
    changeWord(words[indexWord].word);
    if(randomResponse){
      changeWordTranslate(words[indexWord].wordTranslate);
    } else {
      let randomTranslate = null;
      while(!!randomTranslate === false){
        const random = Math.floor(Math.random() * 20);
        if(random !== indexWord){
          randomTranslate = random;
          changeWordTranslate(words[randomTranslate].wordTranslate);
        }
      }
    }
    changeIndexWord(indexWord + 1);
  }

  const checkAnswer = (value: boolean) => {
    if(value === valueResponse && !!indexWord){
      changeScore(score + 10 * bonusScore);
      if(countTrueAnswers < 3) {
        changeCountTrueAnswers(countTrueAnswers + 1);
      } else {
        changeCountTrueAnswers(0);
        changeBonusScore(bonusScore + 1);
      }
    } else {
      changeCountTrueAnswers(0);
      changeBonusScore(1);
    }
    changeWordAndTranslate(words);
  }



  useEffect(() => {
    if(count !== 0 && countStart){
      setTimeout(() => {setCount(count - 1);}, 1000);
    }
  }, [count, countStart])

  const blockCircles = (countTrueAnswers: number) => {
    const amountCircles = 4;
    const arr = [0,0,0,0];
    const result = arr.map((elem, index) => {
      if(index < countTrueAnswers){
        return (<span className = "circle"></span>);
      } else {
        return (<span></span>);
      }
    });
    return result;
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
          <div className="area-game">
            <span className="timer">{count}</span>
            <p className = "score">Очки: {score}</p>
            <div className = "wrapCircles">
              {blockCircles(countTrueAnswers)}
            </div>
            <p className = "wordTranslate">{word} - {wordTranslate}</p>
            <div className = "wrapBtn">
              <button
              onClick={(event: any) => {
                checkAnswer(true);
              }}>Верно</button>
              <button
              onClick={(event: any) => {
                checkAnswer(false);
              }}>Не верно</button>
            </div>
          </div>
        )}
      </FullScreenWrapper>
    </div>
  );
};

export default SprintGame;