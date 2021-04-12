import "bootstrap/dist/css/bootstrap.min.css";
import "./Savanna.scss";
import React, { useState, useEffect } from "react";
import { 
  Button, 
  Badge, 
  Modal, 
  ButtonToolbar, 
  ButtonGroup, 
  ProgressBar } from "react-bootstrap";
import { BsVolumeMute, BsFillVolumeUpFill, BsArrowRepeat } from "react-icons/bs";
import { BiBell, BiBellOff, BiExit } from "react-icons/bi";

import FullScreenWrapper from "../../FullScreenWrapper/FullScreenWrapper";
import { Redirect } from "react-router";
import Preview from "../Preview/Preview";
import useLocalStorage from "../../../hooks/useLocalStorage";
import getUserData from "../../../api/getUserData";
import setUserData from "../../../api/setUserData";
import SavannahImg from "../../../assets/img/games/savannah.jpg";
import { url } from "../../../api/defData";

type word = {
  audio: string;
  audioExample: string;
  audioMeaning: string;
  group: number;
  id: string;
  image: string;
  page: number;
  textExample: string;
  textExampleTranslate: string;
  textMeaning: string;
  textMeaningTranslate: string;
  transcription: string;
  word: string;
  wordTranslate: string;
};

type Statistics = { correctAnswers: number; wrongAnswers: number };
type AllStatistics = { [index: number]: Statistics };

const PREVIEW_HEADING = "Саванна";
const PREVIEW__DESCRIPTION =
  "Слово спускается в саванну, предлагается 5 вариантов его перевода, правильный только один. Твоя задача выбрать правильный перевод слова раньше чем слово коснётся земли.";
const NUM_OF_ANSWERS = 4;
const dateNow = new Date().getDate();
const defStatistics: Statistics = { correctAnswers: 0, wrongAnswers: 0 };
const defAllStatistics: AllStatistics = {
  [dateNow]: { correctAnswers: 0, wrongAnswers: 0 },
};

const Savannah = () => {
  const defButtonsVariants = [
    "primary",
    "primary",
    "primary",
    "primary",
    "primary",
  ];
  const [words, setWords] = useState(null);
  const [wordsSet, setWordsSet] = useState<any>(null);
  const [level, setLevel] = useState(null); //TODO: get level from book page
  const [soundOff, setSoundOff] = useState(true);
  const [isSpeak, setIsSpeak] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [lives, setLives] = useState(100);
  const [question, setQuestion] = useState("Question");
  const [questionId, setQuestionId] = useState("");
  const [questionImage, setQuestionImage] = useState("Question");
  const [answerTrue, setAnswerTrue] = useState("");
  const [answer, setAnswer] = useState("");
  const [attempt, setAttempt] = useState(0);
  const [statistics, setStatistics] = useLocalStorage("savanna", defStatistics);
  const [allStatistics, setAllStatistics] = useState(defAllStatistics);
  const [buttonsVariants, setButtonsVariants] = useState(defButtonsVariants);
  const [buttons, setButtons] = useState([
    "Ошибка",
    "получения",
    "слов",
    "с",
    "сервера",
  ]);
  const [wrongAnswersWords, setWrongAnswersWords] = useState<Array<any>>([]);
  const [wrongWords, setWrongWords] = useState<Array<any>>([]);
  const [exit, setExit] = useState(false);
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  const handleClose = () => {
    allStatisticsCompare(statistics);
    setStatistics(defStatistics);
    setWrongWords([]);
    setAttempt(0);
    setLives(100);
    setShowModal(false);
  };
  const handleShow = () => setShowModal(true);

  const setUserWords = (words: any) => {
    setWords(words);
    getUserStatistics();
  };

  const shuffleWords = (words: any) => {
    if (words) {
      let j, temp;
      for (let i = words.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        temp = words[j];
        words[j] = words[i];
        words[i] = temp;
      }
      return words;
    }

  }
  
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
    window.removeEventListener('keydown', handleKeyDown);
    };
  }, [buttons]);
  
  const keyCodes = ["Digit1", "Digit2", "Digit3", "Digit4", "Digit5"];

  const handleKeyDown:any = (event:any) => {
    if (keyCodes.indexOf(event.code) !== -1) setAnswer(buttons[keyCodes.indexOf(event.code)])
  };

  useEffect(() => {
    setWordsSet(shuffleWords(words));
  }, [words]);

  useEffect(() => {
    if (wordsSet) setAllArrays();
  }, [wordsSet, attempt]);

  useEffect(() => {
    if (answer) {
      let answerSound = "correct.mp3";
      const trueAnswerIdx = buttons.indexOf(answerTrue);
      buttonsVariants[trueAnswerIdx] = "success";
      if (answer !== answerTrue || answer === "wrong") {
        const wrongAnswerIdx = buttons.indexOf(answer);
        if (wrongAnswerIdx !== -1) buttonsVariants[wrongAnswerIdx] = "danger";
        answerSound = "error.mp3";
        const words: Array<any> = wrongWords;
        const wrongWord = new Array(question, answerTrue, questionId);
        words.push(wrongWord);
        statistics.wrongAnswers = statistics.wrongAnswers + 1;
        setWrongWords(words);
        setLives(lives - 20);
        setAnswer("");
      } else {
        statistics.correctAnswers = statistics.correctAnswers + 1;
      }
      setStatistics(statistics);
      setButtonsVariants(buttonsVariants);
      if (soundOff) {
        const audio = new Audio(`${url}files/${answerSound}`);
        audio.play();
      }
      setTimeout(() => {
        setAttempt(attempt + 1);
      }, 2000);
    }
  }, [answer]);

  useEffect(() => {
    if (lives === 0 || attempt === 20) {
      setModal();
    }
  }, [lives, attempt]);

  const setAllArrays = () => {
    if (attempt < 20) {
      setButtonsVariants(defButtonsVariants);
      const wordQuest = wordsSet[attempt];
      if (isSpeak) {
        const audio = new Audio(url + wordQuest.audio);
        audio.play();
      }
      setQuestion(wordQuest.word);
      setQuestionId(wordQuest.id);
      setQuestionImage(wordQuest.image);
      setAnswerTrue(wordQuest.wordTranslate);
      const randArr=[];
      const randWords=[wordQuest.wordTranslate]
      for(let i = 0; i < NUM_OF_ANSWERS; i++) {

        const rand = Math.floor(Math.random() * wordsSet.length);
        const randWord = wordsSet[rand];
        if (randArr.indexOf(rand) === -1 && rand !== attempt) {
          randArr.push(rand);
          randWords.push(randWord.wordTranslate);
        } else i--;
        setButtons(shuffleWords(randWords));
      }
    }
  };

  const setModal = () => {
    const modalWrongWords: Array<any> = [];
    wrongWords.forEach((el: Array<any>) => {
      const word = (
        <p key={el[0]}>
          {el[0]} - {el[1]}
        </p>
      );
      if (wrongWords.indexOf(word) === -1) modalWrongWords.push(word);
    });
    setWrongAnswersWords(modalWrongWords);
    handleShow();
  };

  async function getUserStatistics() {
    if (token && userId) {
      const fullUrl = `${url}users/${JSON.parse(userId)}/statistics`;
      const bearerToken = JSON.parse(token);
      await getUserData(fullUrl, bearerToken)
        .then((responseData: any) => {
          if (responseData.savanna) setAllStatistics(responseData.savanna);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  }

  async function setUserStatistics() {
    if (token && userId && allStatistics) {
      const newStatistics = { savanna: allStatistics };
      const fullUrl = `${url}users/${JSON.parse(userId)}/statistics`;
      const bearerToken = JSON.parse(token);
      await setUserData(fullUrl, bearerToken, newStatistics)
        .then((responseData: any) => {})
        .catch((error) => {
          console.log(error.message);
        });
    }
  }

  const allStatisticsCompare = (statistics: Statistics) => {
    if (!allStatistics[dateNow]) allStatistics[dateNow] = statistics;
    else {
      allStatistics[dateNow].correctAnswers =
        allStatistics[dateNow].correctAnswers + statistics.correctAnswers;
      allStatistics[dateNow].wrongAnswers =
        allStatistics[dateNow].wrongAnswers + statistics.wrongAnswers;
    }
    setAllStatistics(allStatistics);
    setUserStatistics();
  };

  const buttonsBar = (
      <ButtonToolbar className="btns-toolbar">
        <ButtonGroup toggle className="btn-group" aria-label="First group">
        <Button
          type="checkbox"
          onClick={() => {setExit(true)}}
        >
       {<BiExit size="2.2rem" />}
        </Button>
      </ButtonGroup>
       <ButtonGroup toggle className="btn-group" aria-label="First group">
        <Button
          type="checkbox"
          onClick={() => {setAttempt(0)}}
        >
       {<BsArrowRepeat size="2.1rem" />}
        </Button>
      </ButtonGroup>
       <ButtonGroup toggle className="btn-group" aria-label="First group">
        <Button
          type="checkbox"
          onClick={() => setSoundOff(!soundOff)}
        >
       {soundOff ? <BiBell size="2.2rem" /> : <BiBellOff size="2.2rem" />}
        </Button>
      </ButtonGroup>
      <ButtonGroup toggle className="btn-group" aria-label="First group">
        <Button type="checkbox" onClick={() => setIsSpeak(!isSpeak)}>
          {isSpeak ? (
            <BsFillVolumeUpFill size="2.2rem" />
          ) : (
            <BsVolumeMute size="2.2rem" />
          )}
        </Button>
      </ButtonGroup>
      </ButtonToolbar>
    )
  const progressBar = <><ProgressBar variant="success" now={(attempt) * 5} label={`${(attempt) * 5}%`} /></>;
  const attemptsBar = <><ProgressBar className="rating"  variant="danger" now={lives} label={`${lives / 20}`} /></>;
  
  const answersButtons = () => {
    const buttonsArr: JSX.Element[] = [];
    buttons.forEach((button:any, i) => {
      buttonsArr.push(<>
      <Button onClick={() => setAnswer(button)} 
        className={`word-answer ${button}`} 
        name={button} 
        value={button}
        variant={buttonsVariants[i]}>
        <div key={`button-icons ${i}`} className={`button-icons ${ i }`}>
          <div key={`hotkey ${i}`} className={`hotkey ${i}`}>{ i + 1 }</div>
        </div>
        {button}
      </Button></>)
    });
    return buttonsArr;
  };
  const questionWord = (
    <div className="question-word">
      <div className="word-image"></div>
      <div className="word-wrapper">
        <Badge className="word-quest" variant="warning">
          {question}
        </Badge>
      </div>
    </div>
  );

  const gameWrapper = (<div className="game-wrapper">
      <div className="answers-wrapper">
        <div className="answers-btns">
        {answersButtons()}
        </div>
      </div>
      <div className="question-wrapper">
        {questionWord}
      </div>
    </div>);


  const Game = (
    <>
      <div className="menu">
        {progressBar}
        <div className="menu-wrapper">
          {buttonsBar}
          {attemptsBar}
        </div>
      </div>
      {gameWrapper}
    </>
  );

  return (
    <div className="savanna">
      <FullScreenWrapper>
        {exit && <Redirect to="/tutorial-page/games" />}
        <Modal
          show={showModal}
          onHide={handleClose}
          animation={false}
          centered={true}
          scrollable={true}
        >
          <Modal.Header closeButton>
            <Modal.Title>Игра окончена</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="results">
              <h3 className="your-results">Ваш результат:</h3>
              <div className="results-answers">
                <h4 className="results-answers-category">Верных ответов:</h4>
                <span className="result">{statistics.correctAnswers}</span>
                <h4 className="results-answers-category">Неверных ответов:</h4>
                <span className="result">{statistics.wrongAnswers}</span>
              </div>
              <h4 className="results-words">Необходимо повторить слова:</h4>
              <div className="wrong-words">{wrongAnswersWords}</div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              onClick={() => {
                handleClose();
                setTimeout(() => {
                  setWords(null);
                }, 2000);
              }}
            >
              Другие Слова
            </Button>
            <Button variant="success" onClick={handleClose}>
              Ещё раз
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                setExit(true);
              }}
            >
              Выйти
            </Button>
          </Modal.Footer>
        </Modal>
        {words === null ? (
          <Preview
            heading={PREVIEW_HEADING}
            description={PREVIEW__DESCRIPTION}
            backgroundImg={SavannahImg}
            level={level}
            setUserWords={setUserWords}
          />
        ) : (
          <div
            className="savanna-game"
            style={{ backgroundImage: `url(${SavannahImg})` }}
          >
            {!wordsSet && "Набор слов отсутствует"}
            {wordsSet && Game}
          </div>
        )}
      </FullScreenWrapper>
    </div>
  );
};

export default Savannah;
