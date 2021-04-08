import "bootstrap/dist/css/bootstrap.min.css";
import "./Sprint.scss";
import SprintImg from "../../../assets/img/Run.jpg";
import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { Link } from "react-router-dom";
import { url } from "../../../api/defData";
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
  const [trueTranslate, setTrueTranslate] = useState();
  const [wordTranslate, changeWordTranslate] = useState(null);
  const [score, changeScore] = useState(0);
  const [valueResponse, changeValueResponse] = useState(true);
  const [indexWord, changeIndexWord] = useState(0);
  const [countTrueAnswers, changeCountTrueAnswers] = useState(0);
  const [bonusScore, changeBonusScore] = useState(1);
  const [soundOn, changeSoundOn] = useState(true);
  const [classSound, changeClassSound] = useState('sound-btn');
  const [classBonusScore, changeClassBonusScore] = useState('bonus-score');
  const [classStatistic, changeClassStatistic] = useState('statistic-sprint');
  const [arrWrongAnswer, changeArrWrongAnswer] = useState<any[]>([]);
  const [timerTimeOut, changeTimeOut] = useState<any>(null)

  const setUserWords = (words: any) => {
    setWords(words);
    setCountStart(true);
    changeWordAndTranslate(words);
  };

  const checkEndGame = () => {
    if(indexWord === 20 || count === 0) {
      changeClassStatistic('statistic-sprint statistic-sprint-active');
      setCount(60)
    }
  }

  const changeWordAndTranslate = (words: any) => {
    checkEndGame();

    if(indexWord !== 20){
      const randomResponse = Math.floor(Math.random() * 10) < 5 ? false : true;
      changeValueResponse(randomResponse);
      changeWord(words[indexWord].word);
      setTrueTranslate(words[indexWord].wordTranslate);
      console.log(words, word, trueTranslate)
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
  }

  const checkAnswer = (value: boolean) => {
    let sound = null;
    if(value === valueResponse && !!indexWord){
      sound = "correct.mp3";
      changeScore(score + 10 * bonusScore);

      if(countTrueAnswers < 3) {
        changeCountTrueAnswers(countTrueAnswers + 1);
      } else {
        changeCountTrueAnswers(0);
        changeBonusScore(bonusScore + 1);
      }
      changeClassBonusScore('bonus-score active-bonus-score');
      setTimeout(() => {changeClassBonusScore('bonus-score')}, 500);

    } else {
      sound = "error.mp3";
      let newArr = arrWrongAnswer.slice();
      newArr.push([word, trueTranslate]);
      changeArrWrongAnswer(newArr);
      changeCountTrueAnswers(0);
      changeBonusScore(1);
    }
    if(soundOn){
      const audio = new Audio(`${url}files/${sound}`);
      audio.play();
    }
    changeWordAndTranslate(words);
  }

  const changeImgSound = () => {
    const copySoundOn = !soundOn;
    changeSoundOn(!soundOn);
    changeClassSound(copySoundOn ? 'sound-btn' : 'sound-btn sound-off')
  }

  const gameAgain = () => {
    changeIndexWord(0)
    changeScore(0);
    changeBonusScore(1);
    changeCountTrueAnswers(0)
    changeArrWrongAnswer([]);
    changeWordAndTranslate(words);
    changeClassStatistic('statistic-sprint');
  }




  useEffect(() => {
    let timer=null
    if(count !== 0 && countStart){
        timer = setTimeout(() => {
          const newCount = count - 1;
          setCount(newCount);
      }, 1000);
    } if(classStatistic === 'statistic-sprint statistic-sprint-active'){
      setCount(60)
      clearTimeout(timerTimeOut)
    }
    checkEndGame();
    changeTimeOut(timer);
  }, [count, countStart])

  const handleUserKeyPress = (event: any) => {
    console.log(words, indexWord, word, wordTranslate)
    if(event.code === "Digit1"){
      checkAnswer(true);
    } if(event.code === "Digit2"){
      checkAnswer(false);
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", handleUserKeyPress);

    return () => {
      window.removeEventListener("keydown", handleUserKeyPress);
    };
  }, [words, indexWord]);

  const blockCircles = (countTrueAnswers: number) => {
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

  const wrongAnswers = 
    arrWrongAnswer.map((elem, index) => {
      return (<p>{elem[0]} - {elem[1]}</p>)
  });

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
            <span 
              className={classSound}
              onClick={(event:any) => {
                changeImgSound();
              }}
            ></span>
            <span 
              className="timer">
                {count}</span>
            <p className = "score">
              <span>Очки: {score}</span>
              <span className={classBonusScore}>+{10 * bonusScore}</span>
              </p>
            <div className = "wrapCircles">
              {blockCircles(countTrueAnswers)}
            </div>
            <p className = "wordTranslate">{word} - {wordTranslate}</p>
            <div className = "wrapBtn">
              <button
                onClick={(event: any) => {
                  checkAnswer(true);
                }}>Верно(1)</button>
              <button
              onClick={(event: any) => {
                checkAnswer(false);
              }}
              >Не верно(2)</button>
            </div>
            <div className={classStatistic}>
            <Link to={`/tutorial-page/games`}>
              <span className="btn-close-statistic"></span>
            </Link>
              <h4>Игра окончена</h4>
              <p>Ваш результат: {score}</p>
              <p>Верных ответов - {indexWord - arrWrongAnswer.length}</p>
              <p>Неверных ответов - {arrWrongAnswer.length}</p>
              <p>Необходимо повторить слова:</p>
              <div>{wrongAnswers}</div>
              <div className="wrap-btns-statistic">
                <button onClick={(event:any) => {gameAgain();
                  setCountStart(false)
                  setWords(null)}}>
                  Другие слова</button>
                <button onClick={(event:any) => {gameAgain()}}>Еще раз</button>
                <Link to={`/tutorial-page/games`}>
                  <button>Выйти</button>  
                </Link>
                
              </div>
            </div>
          </div>
        )}
      </FullScreenWrapper>
    </div>
  );
};

export default SprintGame;