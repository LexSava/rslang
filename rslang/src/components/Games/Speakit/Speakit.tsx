import "bootstrap/dist/css/bootstrap.min.css";
import "./Speakit.scss";
import React, { useState, useEffect } from "react";
import { Badge, Button, ButtonGroup, ButtonToolbar, Card, 
  ListGroup, ListGroupItem, Modal, ProgressBar, Toast } from "react-bootstrap";
import { BsVolumeMute, BsFillVolumeUpFill, BsArrowRepeat } from "react-icons/bs";
import { BiBell, BiBellOff, BiExit, BiMicrophone, BiMicrophoneOff } from "react-icons/bi";
import FullScreenWrapper from "../../FullScreenWrapper/FullScreenWrapper";
import { Redirect } from 'react-router';
import Preview from "../Preview/Preview";
import useLocalStorage from "../../../hooks/useLocalStorage";
import getUserData from "../../../api/getUserData";
import setUserData from "../../../api/setUserData";
import SavannahImg from "../../../assets/img/games/savannah.jpg";
import { url } from "../../../api/defData";

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

type card = { 
  word: string,
  wordTranslate: string,
  transcription: string,
  audio: string,
  image: string
}

type Statistics = {correctAnswers: number, wrongAnswers: number};
type AllStatistics = {[index:number]: Statistics};

const PREVIEW_HEADING = "Скажи это";
const PREVIEW__DESCRIPTION =
  "Нажмите на карточку со словом, чтобы увидеть его перевод и услышать звучание. Нажмите на кнопку 'Тренировка произношения' и произнесите слово в микрофон.";
const NUM_OF_ANSWERS = 10;
const dateNow = new Date().getDate();
const defStatistics:Statistics = {correctAnswers: 0, wrongAnswers: 0};
const defAllStatistics:AllStatistics = {[dateNow]: {correctAnswers: 0, wrongAnswers: 0}};
const outLn= "outline-primary";

const Speakit = () => {
  const defButtonsVariants = [outLn, outLn, outLn, outLn, outLn, outLn, outLn, outLn, outLn, outLn];
  const [words, setWords] = useState(null);
  const [wordsSet, setWordsSet] = useState<any>(null);
  const [level, setLevel] = useState(null); //TODO: get level from book page
  const [isSound, setSound] = useState(true);
  const [isSpeak, setSpeak] = useState(true);
  const [isMic, setMic] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isTraining, setTraining] = useState(false);
  const [lives, setLives] = useState(100);
  const [question, setQuestion] = useState('Question');
  const [questionId, setQuestionId] = useState('');
  const [questionImage, setQuestionImage] = useState('Question');
  const [answerTrue, setAnswerTrue] = useState('');
  const [answer, setAnswer] = useState('');
  const [attempt, setAttempt] = useState(0);
  const [statistics, setStatistics] = useLocalStorage("savanna", defStatistics);
  const [allStatistics, setAllStatistics] = useState(defAllStatistics);
  const [buttonsVariants, setButtonsVariants] = useState(defButtonsVariants);
  const [buttons, setButtons] = useState([['Ошибка'], ['получения'],['слов'],['с'],['сервера']]);
  const [wrongAnswersWords, setWrongAnswersWords] = useState<Array<any>>([]);
  const [wrongWords, setWrongWords] = useState<Array<any>>([]);
  const [activeCard, setActiveCard] = useState<card>({word: "", wordTranslate: "", 
    transcription: "", audio: "", image: ""});
  const [exit, setExit] = useState(false);
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  const handleClose = () => {
    allStatisticsCompare(statistics);
    setStatistics(defStatistics);
    setWrongWords([]);
    setAttempt(0);
    setLives(100);
    setShowModal(false)
    };
  const handleShow = () => setShowModal(true);
  
  const setUserWords = (words: any) => {
    setWords(words);
    getUserStatistics();
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
  }, [activeCard])

  useEffect(() => {
    if(lives === 0 || attempt === 20) {
      setModal()
    }
  }, [lives, attempt])

  const setAllArrays = () => {
    if(attempt < 20) {
      setButtonsVariants(defButtonsVariants);
      const wordQuest = wordsSet[attempt];  
      setQuestion(wordQuest.word);
      setQuestionId(wordQuest.id);
      setQuestionImage(wordQuest.image);
      setAnswerTrue(wordQuest.wordTranslate);
      const randArr=[];
      const randWords=[];

      for(let i = 0; i < NUM_OF_ANSWERS; i++) {
        const rand = Math.floor(Math.random() * wordsSet.length);
        const randWord = wordsSet[rand];
          if (randArr.indexOf(rand) === -1 && rand !== attempt) {
            const word = {word: randWord.word,
        wordTranslate: randWord.wordTranslate,
        transcription: randWord.transcription,
        audio: randWord.audio,
        image: randWord.image};
            randArr.push(rand);
            randWords.push(word);
          } else i--
        setButtons(shuffleWords(randWords));
      }
    };
  };

  const speakWord = (wordUrl: string) => {
     if (isSpeak) {
        const audio = new Audio(url + wordUrl);
        audio.play();
      };
  };

  const setModal = () => {
    const modalWrongWords:Array<any> = []
    wrongWords.forEach((el:Array<any>) => {
      const word = (<p key={el[0]}>{el[0]} - {el[1]}</p>);
      if(wrongWords.indexOf(word) === -1) modalWrongWords.push(word);
    })
    setWrongAnswersWords(modalWrongWords)
    handleShow();
  };

  async function getUserStatistics() {
    if(token && userId) {
      const fullUrl = `${url}users/${JSON.parse(userId)}/statistics`;
      const bearerToken = JSON.parse(token);
      await getUserData(fullUrl, bearerToken).then(( responseData:any ) => {
        if(responseData.savanna) setAllStatistics(responseData.savanna);
      }).catch(error => {
        console.log(error.message)
        })
    }
  }

  async function setUserStatistics() {
    if(token && userId && allStatistics) {
      const newStatistics = {savanna: allStatistics}
      const fullUrl = `${url}users/${JSON.parse(userId)}/statistics`;
      const bearerToken = JSON.parse(token);
      await setUserData(fullUrl, bearerToken, newStatistics).then(( _responseData:any ) => {
      }).catch(error => {
        console.log(error.message)
        })
    }
  }

  const allStatisticsCompare = (statistics: Statistics) => {
    if (!allStatistics[dateNow]) allStatistics[dateNow] = statistics;
      else {
        allStatistics[dateNow].correctAnswers = allStatistics[dateNow].correctAnswers + statistics.correctAnswers;
        allStatistics[dateNow].wrongAnswers = allStatistics[dateNow].wrongAnswers + statistics.wrongAnswers;
      }
    setAllStatistics(allStatistics);
    setUserStatistics();
  };

  const modalRender = (<Modal 
          show={ showModal }
           onHide={handleClose}
            animation={false}
            centered={ true }
            scrollable={ true }>
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
              <div className="wrong-words">
                {wrongAnswersWords}
              </div>
            </div> 
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => {
              handleClose();
              setTimeout(() => {setWords(null)}, 2000)
              }}>
              Другие Слова</Button>
            <Button variant="success" onClick={handleClose}>
            Ещё раз
            </Button>
            <Button variant="danger" onClick={() => {setExit(true)}}>
            Выйти
            </Button>
          </Modal.Footer>
        </Modal>)

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
          onClick={() => setSound(!isSound)}>
       {isSound ? <BiBell size="2.2rem" /> : <BiBellOff size="2.2rem" />}
        </Button>
      </ButtonGroup>
       <ButtonGroup toggle className="btn-group" aria-label="First group">
        <Button
          type="checkbox"
          onClick={() => setSpeak(!isSpeak)}
        >
       {isSpeak ? <BsFillVolumeUpFill size="2.2rem" /> : <BsVolumeMute size="2.2rem" />}
        </Button>
      </ButtonGroup>
      <ButtonGroup toggle className="btn-group" aria-label="First group">
        <Button
          type="checkbox"
          onClick={() => setMic(!isMic)}
        >
       {isMic ? <BiMicrophone size="2.2rem" /> : <BiMicrophoneOff size="2.2rem" />}
        </Button>
      </ButtonGroup>
      </ButtonToolbar>
    )
  const progressBar = <><ProgressBar variant="success" now={(attempt) * 5} label={`${(attempt) * 5}%`} /></>;
  const attemptsBar = <><ProgressBar className="rating"  variant="danger" now={lives} label={`${lives / 20}`} /></>;
  
  const wordsButtons = () => {
    const buttonsArr: JSX.Element[] = [];
    buttons.forEach((button:any) => {
      buttonsArr.push(
        <Toast onClick={() => {
          speakWord(button.audio)
          setActiveCard(button)}}>
          <Toast.Body>
            <BsFillVolumeUpFill size="2rem"/>
            {button.transcription} - 
            <strong className="mr-auto"> {button.word}</strong>          </Toast.Body>
        </Toast>
      );
    });
    return (buttonsArr);
  };

  const wordCard = (
    <Card style={{ width: '28rem' }} className="info-card">
      <Card.Body>
        <Card.Img variant="top" src={url + activeCard.image} />
        <Card.Text>
          {activeCard.wordTranslate}
        </Card.Text>
      </Card.Body>
    </Card>
  );
  
  const trainingButton = (<Button className="training-button" variant="info" size="lg" block
    onClick={()=>{setTraining(true)}}>
    Начать тренировку</Button>
  );
  
  const gameWrapper = (<div className="game-wrapper">
      <div className="info-wrapper">
        {wordCard}
      </div>
        {trainingButton}
      <div className="words-wrapper">
        {wordsButtons()}
      </div>
    </div>
  );

  const speaking = (
    <div className="speaking">

    </div>    
  );

    const trainingBlock = (<>
      <div className="training-wrapper">
        <Button onClick={()=>{setTraining(false)}} variant="danger">
          Назад
        </Button>
        <Card style={{ width: '30rem' }} className="training-card">
          <Card.Body>
            <Card.Img variant="top" src={url + activeCard.image} />
            <Card.Text>
              {activeCard.word}
              {activeCard.transcription}
              {activeCard.wordTranslate}
            </Card.Text>
          </Card.Body>
        </Card>
        {speaking}
        <Button onClick={()=>{setAttempt(attempt + 1)}} variant="succes">
          Пропустить
        </Button>
      </div></>);

  const Game = (
    <>
    <div className="menu">
      {progressBar}
      <div className="menu-wrapper">
      {buttonsBar}
      {attemptsBar}
      </div>
    </div>
      {isTraining ? trainingBlock : gameWrapper}
    </>
  )

  return (
      <div className="speak-it">
        <FullScreenWrapper>
        {exit && <Redirect to="/tutorial-page/games" />}
        {modalRender}
          {words === null ? (
          <Preview
            heading={PREVIEW_HEADING}
            description={PREVIEW__DESCRIPTION}
            backgroundImg={SavannahImg}
            level={level}
            setUserWords={setUserWords}
          />
        ) : (
        <div className="speak-it-game"
            style={{ backgroundImage: `url(${SavannahImg})` }}
            >
            {!wordsSet && ('Набор слов отсутствует')}
            {wordsSet && Game}
          </div>
        )}
        </FullScreenWrapper>
      </div>
  );
};

export default Speakit;
