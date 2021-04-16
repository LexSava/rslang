import "bootstrap/dist/css/bootstrap.min.css";
import "./Speakit.scss";
import { useState, useEffect } from "react";
import { 
  Button,
  ButtonGroup,
  ButtonToolbar,
  Card,
  Modal,
  ProgressBar,
  Toast } from "react-bootstrap";
import { BsFillVolumeUpFill, BsArrowRepeat } from "react-icons/bs";
import { BiBell, BiBellOff, BiExit, BiMicrophone, BiMicrophoneOff } from "react-icons/bi";
import FullScreenWrapper from "../../FullScreenWrapper/FullScreenWrapper";
import { Redirect } from 'react-router';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import  { playAudioWord } from "../../../utils/AudioWord";
import Preview from "../Preview/Preview";
import useLocalStorage from "../../../hooks/useLocalStorage";
import getUserData from "../../../api/getUserData";
import setUserData from "../../../api/setUserData";
import SpeakitImg from "../../../assets/img/games/speakitImg.png";
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
type Settings = { sound: boolean };
type AllSettings = { [index: string]: Settings };

const PREVIEW_HEADING = "Скажи это";
const PREVIEW__DESCRIPTION =
  "Нажмите на карточку со словом, чтобы увидеть его перевод и услышать звучание. Нажмите на кнопку 'Тренировка произношения' и произнесите слово в микрофон.";
const NUM_OF_ANSWERS = 10;
const dateNow = new Date().getDate();
const defStatistics:Statistics = {correctAnswers: 0, wrongAnswers: 0};
const defAllStatistics:AllStatistics = {[dateNow]: {correctAnswers: 0, wrongAnswers: 0}};
const defActiveCard = {
  word: "",
  wordTranslate: "", 
  transcription: "",
  audio: "",
  image: "files/02_0628.jpg"
};

const Speakit = () => {
  const settingsLocal:string | null = localStorage.getItem('settings');
  const locSettings:AllSettings = settingsLocal ? JSON.parse(settingsLocal) : {speakit: {sound: true}};
  const settings:Settings = locSettings.speakit;
  const sound = settings.sound;
  const [words, setWords] = useState(null);
  const [wordsSet, setWordsSet] = useState<any>([]);
  // const [level, setLevel] = useState(null); //TODO: get level from book page
  const level = null; //TODO: get level from book page
  const [isSound, setSound] = useState(sound);
  const [isMic, setMic] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isTraining, setTraining] = useState(false);
  const [answer, setAnswer] = useState('');
  const [attempt, setAttempt] = useState(0);
  const [statistics, setStatistics] = useLocalStorage("speakit", defStatistics);
  const [allStatistics, setAllStatistics] = useState(defAllStatistics);
  const [buttons, setButtons] = useState([]);
  const [activeCard, setActiveCard] = useState<card>(defActiveCard);
  const [exit, setExit] = useState(false);
  const { finalTranscript, listening, resetTranscript } = useSpeechRecognition();
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  
  const keyCodes = ["Digit0", "Digit1", "Digit2", "Digit3", "Digit4",
    "Digit5", "Digit6", "Digit7", "Digit8", "Digit9", 
    "KeyM", "NumpadEnter", "Space", "Backspace", "KeyQ", "KeyR" 
  ];

  const handleKeyDown:any = (event:any) => {
    if (keyCodes.indexOf(event.code) !== -1) {
      if (event.code === 'KeyM') {
        setAnswer('');  
        SpeechRecognition.startListening({language: 'en-US'})
      }

      if (event.code === 'Backspace') {
        setTraining(!isTraining);  
      }

      if (isTraining && event.code === 'KeyR') {
          setAttempt(0);
      }
      
      if (keyCodes.indexOf(event.code) < 10) {
        const indexButton:word = buttons[keyCodes.indexOf(event.code)];
        setActiveCard(indexButton);
        resetTranscript();
        playAudioWord(indexButton.audio);
        setAnswer('');
      }
    }

  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
    window.removeEventListener('keydown', handleKeyDown);
    };
  }, [buttons, activeCard]);

  const handleShow = () => setShowModal(true);
  
  const handleClose = () => {
    allStatisticsCompare(statistics);
    setStatistics(defStatistics);
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
    if (isTraining && activeCard) {
      setAttempt(0);
      setActiveCard(wordsSet[0]); 
      SpeechRecognition.startListening({language: 'en-US'});
    } else { 
        setActiveCard(defActiveCard); 
        setAttempt(0);
        SpeechRecognition.stopListening();
        setAnswer('')
      }
  }, [isTraining])

  useEffect(() => {
    if (wordsSet) {
      if (isTraining) {
        setActiveCard(wordsSet[attempt]);
        SpeechRecognition.startListening({ continuous: true, language: 'en-US' });
        if(attempt === NUM_OF_ANSWERS - 1) {
          setModal()
        }
      } else {
        resetTranscript();
        setActiveCard(defActiveCard);
        SpeechRecognition.stopListening();
      }
    } 
  }, [attempt])

  useEffect(() =>{
    if (finalTranscript) setAnswer(finalTranscript.toLocaleLowerCase());
  },[finalTranscript]);

  useEffect(() => {
    if (isTraining && activeCard) {
      resetTranscript();
      let answerSound = "files/correct.mp3";
      if(attempt === NUM_OF_ANSWERS - 1) {
        setModal()
      }
      if (!activeCard.word.match(answer)) {
        answerSound = "files/error.mp3";
        statistics.wrongAnswers = statistics.wrongAnswers + 1;
      } else {
        statistics.correctAnswers = statistics.correctAnswers + 1;
      }
      if (isSound) playAudioWord(answerSound);
      setStatistics(statistics);
      // setTimeout(() => setAttempt(attempt+1), 1000);
      setAttempt(attempt+1);
    }
  }, [answer])

  const setModal = () => {
    setAttempt(NUM_OF_ANSWERS)
    SpeechRecognition.stopListening();
    handleShow();
  };

  useEffect(() => {
    const settingsLocal:string | null = localStorage.getItem('settings');
    const locSettings:AllSettings = settingsLocal ? JSON.parse(settingsLocal) : {savanna: {sound: true, speak: true}};
    let settings:Settings = locSettings.speakit;
    settings = {sound: isSound};
    locSettings.speakit = settings;
    localStorage.setItem('settings', JSON.stringify(locSettings))
    
    async function setUserSettings() {
     if (settings && userId && token) {
      const newSettings = { savanna: settings };
      const fullUrl = `${url}users/${JSON.parse(userId)}/settings`;
      const bearerToken = JSON.parse(token);
      await setUserData(fullUrl, bearerToken, newSettings)
        .then((responseData: any) => {})
        .catch((error) => {
          console.log(error.message);
        });
      }
    }
    setUserSettings();
  }, [isSound]);

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

  const toastBlock = (
    <Toast className="modal-toast" show={showModal} onClose={handleClose}>
      <Toast.Header>
        <strong className="mr-auto">
        <h3 className="your-results">Ваш результат</h3>
        </strong>
      </Toast.Header>
      <Toast.Body>
        <div className="results">
          <div className="results-answers">
            <h4 className="results-answers-category">Верных ответов:</h4>
            <p className="result">{statistics.correctAnswers}</p>
            <h4 className="results-answers-category">Неверных ответов:</h4>
            <p className="result">{statistics.wrongAnswers}</p>
          </div>
          <div className="buttons-block">
            <Button onClick={() => {
              setTimeout(() => {setWords(null)})
              handleClose();
              }}>
                Другие Слова
            </Button>
            <Button variant="success" onClick={handleClose}>
              Ещё раз
            </Button>
            <Button variant="danger" onClick={() => {setExit(true)}}>
              Выйти
            </Button>
          </div>
        </div>
      </Toast.Body>
    </Toast>
  );

  const trainingButton = (
    <Button className="training-button"
      variant={isTraining ? 'danger' : 'info' } size="lg" block
      onClick={()=>{setTraining(!isTraining)}}>
      {isTraining ? 'Закончить проверку' : 'Начать проверку' }
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
          onClick={() => {
            setWords(null)
            setTraining(false)}}
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
          variant={listening ? "success" : "primary"}
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
  //  label={`${(attempt) * (100 / (NUM_OF_ANSWERS))}%`}
  /></>;
  
  const wordsButtons = () => {
    const buttonsArr: JSX.Element[] = [];
    if (!buttons) return [];
    buttons.forEach((button:any, i) => {
      buttonsArr.push(
        <Toast key={`toast-${button.word}`} 
          onClick={() => {
            resetTranscript();
            playAudioWord(button.audio);
            setAnswer('');  
            setActiveCard(button)}}>
          <Toast.Body key={`body-${button.word}`}>
            <div key={`toast-icons ${i}`}
            className={`toast-icons ${i}`} >
            <div key={`hotkey ${i}`}
            className={`hotkey ${i}`} >{i}</div>
            <BsFillVolumeUpFill key={`icon-${button.word}`} size="2rem"/>
            </div>
            {button.transcription} - 
            <strong key={`mr-auto word-${button.word}`}>{ button.word }</strong>
          </Toast.Body>
        </Toast>
      );
    });
    return (buttonsArr);
  };

  const wordCard = activeCard ? (
    <div className="info-wrapper">
    <Card style={{width: '28rem'}} className="info-card">
      <Card.Body>
        <div className="card-image-wrapper">
        <Card.Img variant="top" src={url + activeCard.image} />
        </div>
        {!isTraining &&  
          (<Card.Text className="text1" 
            style={ activeCard.wordTranslate === '' ? 
            { backgroundColor: '#fff', fontSize: '2rem', fontWeight: 500 }
            : { backgroundColor: '#dda', fontSize: '2rem', fontWeight: 500 }
            }>
            {activeCard.wordTranslate}
          </Card.Text>
        )}
        {isTraining &&  
          (<>
          <Card.Text className="text2" style={activeCard.word.toUpperCase() 
          ? {backgroundColor: '#dd1'} 
          : {backgroundColor: '#fff'}}
          onClick={() => { playAudioWord(activeCard.audio) }}
          >  
            {activeCard.word.toUpperCase()}
          </Card.Text> 
          <Card.Text className="text3" style={activeCard.word.toUpperCase() 
            ? {backgroundColor: '#add', letterSpacing: '2px', fontWeight: 500 } 
            : {backgroundColor: '#fff'}}>
            {activeCard.transcription}
          </Card.Text>
        </>)}
          {isMic && (<div className={answer === activeCard.word ? 'answer true-answer' : 'answer'}
          onClick={() => {
            setAnswer('');  
            SpeechRecognition.startListening({language: 'en-US'})
            }}>
            <div key={`hotkey m`}
            className={`hotkey m`}>M</div> 
            <BiMicrophone size="1.2rem" />
            {answer && answer}
          </div>)}
      </Card.Body>
    </Card>
    </div>
  ) : (<></>);
  
  const nextWordButton = (
    <>
      { activeCard && <Button className="training-button"
        variant={'info'} size="lg" block
        onClick={()=>{setAttempt(attempt+1)}}>
        Следующее слово
      </Button>}
    </>)

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
      { nextWordButton }
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
          {words === null ? (
          <Preview
            heading={PREVIEW_HEADING}
            description={PREVIEW__DESCRIPTION}
            backgroundImg={SpeakitImg}
            level={level}
            setUserWords={setUserWords}
          />
        ) : (
        <div className="speak-it-game"
            style={{ backgroundImage: `url(${SpeakitImg})` }}
            >
            {toastBlock}
            {!wordsSet && ('Набор слов отсутствует')}
            {wordsSet && Game}
          </div>
        )}
        </FullScreenWrapper>
      </div>
  );
};

export default Speakit;
  