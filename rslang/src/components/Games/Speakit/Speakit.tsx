import "bootstrap/dist/css/bootstrap.min.css";
import "./Speakit.scss";
import React, { useState, useEffect } from "react";
import { Badge, Button, ButtonGroup, ButtonToolbar, Card, 
  ListGroup, ListGroupItem, Modal, ProgressBar, Toast } from "react-bootstrap";
import { BsVolumeMute, BsFillVolumeUpFill, BsArrowRepeat } from "react-icons/bs";
import { BiBell, BiBellOff, BiExit, BiMicrophone, BiMicrophoneOff } from "react-icons/bi";
import FullScreenWrapper from "../../FullScreenWrapper/FullScreenWrapper";
import { Redirect } from 'react-router';
import  { playAudioWord, playAudio } from "../../../utils/AudioWord";
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
const defButtonsVariants = [outLn, outLn, outLn, outLn, outLn, outLn, outLn, outLn, outLn, outLn];
const defActiveCard = {
  word: "",
  wordTranslate: "", 
  transcription: "",
  audio: "",
  image: "files/02_0628.jpg"
};

const Speakit = () => {
  const [words, setWords] = useState(null);
  const [wordsSet, setWordsSet] = useState<any>([]);
  const [level, setLevel] = useState(null); //TODO: get level from book page
  const [isSound, setSound] = useState(true);
  const [isSpeak, setSpeak] = useState(true);
  const [isMic, setMic] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isTraining, setTraining] = useState(false);
  const [isStatistics, setIsStatistics] = useState(false);
  const [answer, setAnswer] = useState('');
  const [attempt, setAttempt] = useState(0);
  const [statistics, setStatistics] = useLocalStorage("savanna", defStatistics);
  const [allStatistics, setAllStatistics] = useState(defAllStatistics);
  const [buttons, setButtons] = useState([]);
  const [wrongAnswersWords, setWrongAnswersWords] = useState<Array<any>>([]);
  const [wrongWords, setWrongWords] = useState<Array<any>>([]);
  const [activeCard, setActiveCard] = useState<card>(defActiveCard);
  const [exit, setExit] = useState(false);
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

    
  const handleShow = () => setShowModal(true);
  
  const handleClose = () => {
    allStatisticsCompare(statistics);
    setStatistics(defStatistics);
    setWrongWords([]);
    setAttempt(0);
    setShowModal(false)
  };
  
  const setUserWords = (words: any) => {
    words.splice(NUM_OF_ANSWERS);
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
    setButtons(wordsSet);
  }, [wordsSet])

  useEffect(() => {
    if (isTraining) {
      setAttempt(0);
      setActiveCard(wordsSet[0]); 
    } else { 
        setActiveCard(defActiveCard); 
        setAttempt(0);
      }
  }, [isTraining])

  useEffect(() => {
    if (wordsSet && isTraining) setActiveCard(wordsSet[attempt+1]);
      else {setActiveCard(defActiveCard)}
  }, [attempt])

  useEffect(() => {
    if (isTraining) {
      let answerSound = "files/correct.mp3";
      if (!answer.match(activeCard.word)) {
        answerSound = "files/error.mp3";
      }
      if(attempt === NUM_OF_ANSWERS) {
        setModal()
      }
      setAttempt(attempt+1);
      if (isSound) playAudioWord(answerSound);
    }
  }, [answer])

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
        if(responseData.speakit) setAllStatistics(responseData.speakit);
      }).catch(error => {
        console.log(error.message)
        })
    }
  }

  async function setUserStatistics() {
    if(token && userId && allStatistics) {
      const newStatistics = {speakit: allStatistics}
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

  const modalRender = (
    <Modal 
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
          Другие Слова
        </Button>
        <Button variant="success" onClick={handleClose}>
          Ещё раз
        </Button>
        <Button variant="danger" onClick={() => {setExit(true)}}>
          Выйти
        </Button>
      </Modal.Footer>
    </Modal>
  );

  const trainingButton = (
    <Button className="training-button"
      variant={isTraining ? 'danger' : 'info' } size="lg" block
      onClick={()=>{setTraining(!isTraining)}}>
      {isTraining ? 'Закончить тренировку' : 'Начать тренировку' }
    </Button>
  );
  
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
          onClick={() => {setWords(null)}}
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
      <ButtonGroup>
        {trainingButton}
      </ButtonGroup>
      </ButtonToolbar>
    )
  const progressBar = <>
  <ProgressBar
   variant="success"
   now={(attempt) * (100 / (NUM_OF_ANSWERS))}
   label={`${(attempt) * (100 / (NUM_OF_ANSWERS))}%`}
  /></>;
  
  const wordsButtons = () => {
    const buttonsArr: JSX.Element[] = [];
    if (!buttons) return [];
    buttons.forEach((button:any) => {
      buttonsArr.push(
        <Toast onClick={() => {
          playAudioWord(button.audio);
          setActiveCard(button)}}>
          <Toast.Body>
            <BsFillVolumeUpFill size="2rem"/>
            {button.transcription} - 
            <strong className="mr-auto">{ button.word }</strong>
          </Toast.Body>
        </Toast>
      );
    });
    return (buttonsArr);
  };

  const wordCard = activeCard ? (
    <div className="info-wrapper">
    <Card style={isTraining ? { width: '30rem' } : { width: '28rem' }} className="info-card">
      <Card.Body>
        <Card.Img variant="top" src={url + activeCard.image} />
        {!isTraining &&  
          (<Card.Text style={{ backgroundColor: '#dda', fontSize: '2rem', fontWeight: 500 }}>
            {activeCard.wordTranslate}
          </Card.Text>
        )}
        {isTraining &&  
          (<Card.Text style={activeCard.word.toUpperCase() 
          ? {backgroundColor: '#dd1'} 
          : {backgroundColor: '#fff'}}
          onClick={() => { playAudioWord(activeCard.audio) }}
          >  
            {activeCard.word.toUpperCase()}
          <Card.Text style={activeCard.word.toUpperCase() 
            ? {backgroundColor: '#add', letterSpacing: '2px', fontWeight: 500 } 
            : {backgroundColor: '#fff'}}>
            {activeCard.transcription}
          </Card.Text>
          </Card.Text> 
        )}
      </Card.Body>
    </Card>
    </div>
  ) : (<></>);
  
  const gameWrapper = (<div className="game-wrapper">
        {wordCard}
      <div className="words-wrapper">
        {wordsButtons()}
      </div>
    </div>
  );

  const speaking = (
    <div className="speaking">
      
    </div>    
  );

  const trainingeWrapper = (
    <>
    <div className="training-wrapper">
      { wordCard }
      { speaking }
      <Button className="training-button"
        variant={'info'} size="lg" block
        onClick={()=>{setAttempt(attempt+1)}}>
      Следующее слово
      </Button>
    </div>
    </>
  );

  const Game = (
    <>
    <div className="menu">
      {progressBar}
      <div className="menu-wrapper">
      {buttonsBar}
      </div>
    </div>
      {isTraining ? trainingeWrapper : gameWrapper}
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
