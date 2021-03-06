import "bootstrap/dist/css/bootstrap.min.css";
import './OurGame.scss';
import { useState, useEffect } from "react";
import { 
  Button, 
  ButtonGroup, 
  ButtonToolbar, 
  Toast,
  Card,
  Modal, 
  ProgressBar } from "react-bootstrap";
import { BsVolumeMute, BsFillVolumeUpFill, BsArrowRepeat } from "react-icons/bs";
import { BiBell, BiBellOff, BiExit } from "react-icons/bi";
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

import FullScreenWrapper from "../../FullScreenWrapper/FullScreenWrapper";
import { Redirect } from "react-router";
import Preview from "../Preview/Preview";
import getUserData from "../../../api/getUserData";
import setUserData from "../../../api/setUserData";
import SavannahImg from "../../../assets/img/games/savannah.jpg";
import { url } from "../../../api/defData";

type Statistics = { correctAnswers: number; wrongAnswers: number };
type Settings = { sound: boolean; speak: boolean };
type AllStatistics = { [index: number]: Statistics };
type AllSettings = { [index: string]: Settings };
type wordsAnswersType = { [index: string]: string };

type word = {
  audio: string,
  audioExample: string,
  audioMeaning: string,
  group: number,
  id: string,
  image: string,
  page: number,
  textExample: string,
  textExampleTranslate: string, 
  textMeaning: string,
  textMeaningTranslate: string,
  transcription: string,
  word: string,
  wordTranslate: string,
};

const OurGame = () => {
const PREVIEW_HEADING = "Концентрация";
const PREVIEW__DESCRIPTION =
  "Найди все верные пары Слово - Перевод, переворачивая карточки.";
const NUM_OF_ANSWERS = 10;
const TIMEOUT_TIME = 450;
const NUM_OF_ATTEMPTS = 20;
const dateNow = new Date().getDate();
const defAllStatistics: AllStatistics = {
  [dateNow]: { correctAnswers: 0, wrongAnswers: 0 },
};
const defWordsCards = (<div className="words-cards">Нет ничего</div>)

const settingsLocal:string | null = localStorage.getItem('settings');
  const locSettings:AllSettings = settingsLocal ? JSON.parse(settingsLocal) : {savanna: {sound: true, speak: true}};
  const settings:Settings = locSettings.ourgame;
  const {sound, speak} = settings;
  const [words, setWords] = useState<Array<word> | null>(null);
  const [wordsSet, setWordsSet] = useState<Array<word> | null>(null);
  const [level, setLevel] = useState(null); //TODO: get level from book page
  const [soundOff, setSoundOff] = useState(sound);
  const [isSpeak, setIsSpeak] = useState(speak);
  const [timeoutTime, setTimeoutTime] = useState(TIMEOUT_TIME);
  const [timerStart, setTimerStart] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [wordsCards, setWordsCards] = useState<JSX.Element[] | null>(null);
  const [wordsAnswers, setWordsAnswers] = useState<wordsAnswersType>({});
  const [lives, setLives] = useState(100);
  const [attempt, setAttempt] = useState(0);
  const [statistics, setStatistics] = useState(defAllStatistics[dateNow]);
  const [buttons, setButtons] = useState([
    "Ошибка",
    "получения",
    "слов",
    "с",
    "сервера",
  ]);
  const [wrongAnswersWords, setWrongAnswersWords] = useState<Array<any>>([]);
  const [exit, setExit] = useState(false);
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  const handleClose = () => {
    setShowModal(false);
  };

  const handleShow = () => setShowModal(true);

  const setUserWords = (words: any) => {
    setWords(words);
    // getUserStatistics();
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
  };

  useEffect(() => {
    if (words) {
      setWordsSet(shuffleWords(words));
    }
  }, [words])
  
  useEffect(() => {
    if (wordsSet) {
      const slicedWordSet = wordsSet.slice(0, NUM_OF_ANSWERS);
      const wordsCards:JSX.Element[] = [];
      const wordsAnswers:wordsAnswersType = {};
      slicedWordSet.forEach((word: word, i) => {
        const wordCard = 
          (<Card key={word.word}
            onClick={(e:any) => {console.log(e.target)}}>
            <Card.Body className={`body-${word.word} ${i}`}>
              {word.word}
            </Card.Body>
        </Card>);
        
        const wordTrCard = 
          (<Card key={word.wordTranslate} 
            onClick={(e:any) => {console.log(e.target)}}>
            <Card.Body className={`body-${word.wordTranslate} ${i}`}>
              {word.wordTranslate}
            </Card.Body>
        </Card>);

        wordsCards.push(wordCard, wordTrCard);
        wordsAnswers[word.word] = word.wordTranslate;
      });
      setWordsAnswers(wordsAnswers);
      setWordsCards(shuffleWords(wordsCards))
    }
  }, [wordsSet])

  const ModalFrame = (
    <Modal key="ourgame-modal" show={showModal} onHide={handleClose} animation={false} centered={true} scrollable={true}>
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
        <Button onClick={() => { handleClose(); setTimeout(() => { setWords(null) }, 200); }}>
          Другие Слова
        </Button>
        <Button variant="success" onClick={handleClose}>Ещё раз</Button>
        <Button variant="danger" onClick={() => { setExit(true) }}>Выйти</Button>
      </Modal.Footer>
    </Modal>
  );

  const attemptsBar = <><ProgressBar className="attempts"  variant="danger" now={lives} label={`${lives / 20}`} /></>;
  const progressBar = <><ProgressBar className="progress" variant="success" now={(attempt) * 5} label={`${(attempt) * 5}%`} /></>;

  const UrgeWithPleasureComponent = () => (
    <CountdownCircleTimer
      isPlaying
      duration={10}
      colors={[
        ['#004777', 0.33],
        ['#F7B801', 0.33],
        ['#A30000', 0.33],
      ]}
    >
    {({ remainingTime }) => remainingTime}
    </CountdownCircleTimer>
  )
  const buttonsBar = (
    <ButtonToolbar className="btns-toolbar">
      <ButtonGroup toggle className="btn-group" aria-label="First group">
        <Button type="checkbox" onClick={() => {setExit(true)}}>
         {<BiExit size="2.2rem" />}
        </Button>
      </ButtonGroup>
      <ButtonGroup toggle className="btn-group" aria-label="First group">
        <Button type="checkbox" onClick={() => {setAttempt(0)}} >
          {<BsArrowRepeat size="2.1rem" />}
        </Button>
      </ButtonGroup>
      <ButtonGroup toggle className="btn-group" aria-label="First group">
        <Button type="checkbox" onClick={() => setSoundOff(!soundOff)} >
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
        {UrgeWithPleasureComponent}
        {attemptsBar}
    </ButtonToolbar>
  );
  
  const gameWrapper = (
      <div className="ourgame-cards">
        {wordsCards}
      </div>
  );

  const Game = (
    <>
      <div className="menu">
        {progressBar}
        <div className="menu-wrapper">
          {buttonsBar}
        </div>
      </div>
      {gameWrapper}
    </>
  );

return (
    <div className="ourgame">
      <FullScreenWrapper>
        {exit && <Redirect to="/tutorial-page/games" />}
        {ModalFrame}
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
            className="ourgame"
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

export default OurGame;