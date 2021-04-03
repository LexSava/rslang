import "bootstrap/dist/css/bootstrap.min.css";
import "./Savanna.scss";
import React, { useState, useEffect } from "react";
import { 
  Button, 
  Badge, 
  Modal, 
  ButtonToolbar, 
  ButtonGroup, 
  ToggleButton, 
  ProgressBar } from "react-bootstrap";
import { BsVolumeMute, BsFillVolumeUpFill, BsFillHeartFill, BsHeart } from "react-icons/bs";
import FullScreenWrapper from "../../FullScreenWrapper/FullScreenWrapper";
import Preview from "../Preview/Preview";
import savannahImg from "../../../assets/img/games/savannah.jpg";

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
}

// audio: "files/22_1633.mp3"
// audioExample: "files/22_1633_example.mp3"
// audioMeaning: "files/22_1633_meaning.mp3"
// group: 2
// id: "5e9f5ee35eb9e72bc21afb00"
// image: "files/22_1633.jpg"
// page: 21
// textExample: "She <b>peered</b> at people through the window."
// textExampleTranslate: "Она смотрела на людей через окно"
// textMeaning: "To <i>peer</i> at something is to watch it carefully."
// textMeaningTranslate: "Вглядываться во что-то - значит внимательно наблюдать за этим"
// transcription: "[piər]"
// word: "peer"
// wordTranslate: "равный"

const PREVIEW_HEADING = "Саванна";
const PREVIEW__DESCRIPTION =
  "Слово прыгает с парашютом, предлагается 5 вариантов его перевода, правильный только один. Твоя задача выбрать правильный перевод слова раньше чем слово коснётся земли.";
const NUM_OF_ANSWERS = 5;
const defStatistics:{date: string, 
  correctAnswers: number,
  wrongAnswers: number,
  words: Array<any>} = {date: '2021-04-03', correctAnswers: 0, wrongAnswers: 0, words: []}

const Savannah = () => {
  const [words, setWords] = useState(null);
  const [wordsSet, setWordsSet] = useState<any>(null);
  const [level, setLevel] = useState(null); //TODO: get level from book page
  const [soundOff, setSoundOff] = useState(false);
  const [radioValue, setRadioValue] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [lives, setLives] = useState(100);
  const [question, setQuestion] = useState('Question');
  const [questionId, setQuestionId] = useState('');
  const [questionImage, setQuestionImage] = useState('Question');
  const [questionAudio, setQuestionAudio] = useState('');
  const [answerTrue, setAnswerTrue] = useState('');
  const [answer, setAnswer] = useState('');
  const [attempt, setAttempt] = useState(0);
  const [statistics, setStatistics] = useState(defStatistics);
  const [allStatistics, setAllStatistics] = useState({});
  const [buttons, setButtons] = useState(['word1', 'word2','word3','word4','word5']);
  const [wrongAnswersWords, setWrongAnswersWords] = useState([]);
  
  const radios = [
    { name: '1', value: 10 },
    { name: '2', value: 20 },
    { name: '3', value: 30 },
    { name: '4', value: 40 },
    { name: '5', value: 50 },
    { name: '6', value: 60 },
  ];

  const handleClose = () => {
    setStatistics(defStatistics);
    setAttempt(0);
    setLives(100);
    setShowModal(false)
    };
  const handleShow = () => setShowModal(true);
  
  const setUserWords = (words: any) => {
    setWords(words);
  };

  const shuffleWords = (words: any) => {
    if(words) {
    let j, temp;
	    for(let i = words.length - 1; i > 0; i--) {
		    j = Math.floor(Math.random()*(i + 1));
		    temp = words[j];
		    words[j] = words[i];
		    words[i] = temp;
	    }
    return words
    }
  }
   
  useEffect(() => {
    setWordsSet(shuffleWords(words));
  }, [words]);

  useEffect(() => {
    if(wordsSet) setAllArrays();
  }, [wordsSet, attempt]);

  useEffect(() => {
    if(answer) {
    console.log(answer, 'answer', answer === answerTrue)
      if(answer !== answerTrue) {
        const words: Array<any> = statistics.words;
        const wrongWord = new Array(question, answerTrue, questionId);
        words.push(wrongWord);
        statistics.wrongAnswers = statistics.wrongAnswers + 1;
        statistics.words = words;
        setLives(lives - 20)
        setAnswer('')
      } else {
          statistics.correctAnswers = statistics.correctAnswers + 1;
        }
    setStatistics(statistics);
    setAttempt(attempt + 1);
    }
  }, [answer])

  useEffect(() => {
    console.log(lives, attempt)
    if(lives === 0 || attempt === 20) {
      setModal()
    }
  }, [lives, attempt])

  const setAllArrays = () => {
    if(attempt < 20) {
      const wordQuest = wordsSet[attempt];  
      setQuestion(wordQuest.word);
      setQuestionId(wordQuest.id);
      setQuestionAudio(wordQuest.audio);
      setQuestionImage(wordQuest.image);
      setAnswerTrue(wordQuest.wordTranslate);
      const randArr=[];
      const randWords=[wordQuest.wordTranslate]
      for(let i = 0; i < 4; i++) {
        const rand = Math.floor(Math.random() * wordsSet.length);
        const randWord = wordsSet[rand];
          if (randArr.indexOf(rand) === -1 && rand !== attempt) {
            randArr.push(rand);
            randWords.push(randWord.wordTranslate);
          } else i--
        setButtons(shuffleWords(randWords));
    }
    console.log(randArr, randWords, wordQuest.word, wordQuest.wordTranslate)
    }
  };

const setModal = () => {
  handleShow();
};

const buttonsBar = (
      <ButtonToolbar className="btns-toolbar">
       <ButtonGroup toggle className="btn-group" aria-label="First group">
        <Button
          type="checkbox"
          value="1"
          onClick={() => setSoundOff(!soundOff)}
        >
       {soundOff ? <BsVolumeMute size="2.2rem" /> : <BsFillVolumeUpFill size="2.2rem" />}
        </Button>
      </ButtonGroup>
      <ButtonGroup toggle className="btn-group" aria-label="Second group" >
        {radios.map((radio, idx) => (
          <ToggleButton
            key={idx}
            type="radio"
            variant="secondary"
            name="radio"
            value={radio.value}
            checked={radioValue === radio.value}
            onChange={(e) => {}}
          >
            {radio.name}
          </ToggleButton>
        ))}
      </ButtonGroup>
      </ButtonToolbar>
    )
  const progressBar = <><ProgressBar variant="success" now={(attempt) * 5} label={`${(attempt) * 5}%`} /></>;
  const attemptsBar = <><ProgressBar className="rating"  variant="danger" now={lives} label={`${lives / 20}`} /></>;
  
  const answersButtons = (<div className="answers-btns">
      <Button onClick={(e) => setAnswer(buttons[0])} className="word-answer" name={buttons[0]} value={buttons[0]}>{buttons[0]}</Button>
      <Button onClick={(e) => setAnswer(buttons[1])} className="word-answer" name={buttons[1]} value={buttons[1]}>{buttons[1]}</Button>
      <Button onClick={(e) => setAnswer(buttons[2])} className="word-answer" name={buttons[2]} value={buttons[2]}>{buttons[2]}</Button>
      <Button onClick={(e) => setAnswer(buttons[3])} className="word-answer" name={buttons[3]} value={buttons[3]}>{buttons[3]}</Button>
      <Button onClick={(e) => setAnswer(buttons[4])} className="word-answer">{buttons[4]}</Button>
    </div>);

  const questionWord = (<div className="question-word">
    <div className="word-image" >
    </div>
    <div className="word-wrapper">
    <Badge className="word-quest" variant="warning">{question}</Badge>  
    </div>
  </div>);
  
  const gameWrapper = (<div className="game-wrapper">
    <div className="question-wrapper">
    {questionWord}
    </div>
    <div className="answers-wrapper">
    {answersButtons}
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
  )

  return (
        <div className="savanna">
        <FullScreenWrapper>
        <Modal show={ showModal } onHide={handleClose} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>Игра окончена
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="results">
              <h3 className="your-results">Ваш результат:</h3>
              <div className="results-answers">
              <h2 className="results-answers-category">Верных ответов:</h2>
              <span className="result">{statistics.correctAnswers}</span>
              <h2 className="results-answers-category">Неверных ответов:</h2>
              <span className="result">{statistics.wrongAnswers}</span>
              </div>
              <h2 className="results-words">Необходимо повторить слова:</h2>
              <div className="wrong-words">
                {statistics.words}
              </div>
            </div> 
          </Modal.Body>
          <Modal.Footer>
            <Button>
            Другие Слова
            </Button>
            <Button>
            Ещё раз
            </Button>
            <Button>
            Выйти
            </Button>
          </Modal.Footer>
        </Modal>
          {words === null ? (
          <Preview
            heading={PREVIEW_HEADING}
            description={PREVIEW__DESCRIPTION}
            backgroundImg={savannahImg}
            level={level}
            setUserWords={setUserWords}
          />
        ) : (
        <div className="savanna-game"
            style={{ backgroundImage: `url(${savannahImg})` }}
            >
            {!wordsSet && ('Набор слов отсутствует')}
            {wordsSet && Game}
          </div>
        )}
        </FullScreenWrapper>
      </div>
  );
};

export default Savannah;
