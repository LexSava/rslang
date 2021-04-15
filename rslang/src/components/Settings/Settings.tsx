import "bootstrap/dist/css/bootstrap.min.css";
import "./Settings.scss";
import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import setUserData from "../../api/setUserData";
import { Button, Form } from "react-bootstrap";
import { BsVolumeMute, BsFillVolumeUpFill } from "react-icons/bs";
import { BiBell, BiBellOff } from "react-icons/bi";
import useLocalStorage from "../../hooks/useLocalStorage";
import { url } from "../../api/defData";

interface InterfaceSettings {}
interface dataInterface {
    id: string,
    wordsPerDay: number
}

const Settings: React.FC<InterfaceSettings> = (props) => {
  const settings = localStorage.getItem("settings");
  const parseSettings = settings ? JSON.parse(settings) : {};
  let {savanna, speakit, vocabulary, wordsPerDay} = parseSettings;
  const soundSavannaLoc = savanna.sound;
  const speakSavannaLoc = savanna.speak;
  const soundSpeakItLoc = speakit.sound;
  vocabulary = vocabulary ? vocabulary : {translate: true, deleted: true, strong: true};
  const translateLoc = vocabulary.translate ? vocabulary.translate : true;
  const strongLoc = vocabulary.strong ? vocabulary.strong : true;
  const deletedLoc = vocabulary.deeted ? vocabulary.deleted : true;
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  let username = localStorage.getItem("username");
  username = username ? JSON.parse(username) : "";
  const userpic = localStorage.getItem("userpic");
  const [wordsPerDayNew, setWordsPerDay] = useState(wordsPerDay);
  const [speakSavanna, setSpeakSavanna] = useState(speakSavannaLoc);
  const [soundSavanna, setSoundSavanna] = useState(soundSavannaLoc);
  const [soundSpeakIt, setSoundSpeakIt] = useState(soundSpeakItLoc);
  const [translate, setTranslate] = useState(translateLoc);
  const [deleted, setDeleted] = useState(deletedLoc);
  const [strong, setStrong] = useState(strongLoc);
  const [changed, setChanged] = useState(false);

  const avatarUrl = userpic ? `${url}${JSON.parse(userpic)}` : '';

  const verWordsPerDay = (number: number) => {
    if (number > 4 && number < 51) setWordsPerDay(number);
    if (number < 4) setWordsPerDay(4);
    if (number > 50) setWordsPerDay(50);
  }

  useEffect(() => {
      if (wordsPerDayNew !== wordsPerDay ||
      deleted !== deletedLoc ||
      strong !== strongLoc ||
      translate !== translateLoc ||
      speakSavanna !== speakSavannaLoc ||
      soundSavanna !== soundSavannaLoc ||
      soundSpeakIt !== soundSpeakItLoc) setChanged(true);
  }, [wordsPerDayNew,
      deleted,
      strong,
      translate,
      speakSavanna,
      soundSavanna,
      soundSpeakIt])

  async function setUserSettings(newSettings:object) {
     if (settings && userId && token) {
      const fullUrl = `${url}users/${JSON.parse(userId)}/settings`;
      const bearerToken = JSON.parse(token);
      await setUserData(fullUrl, bearerToken, newSettings)
        .then((responseData: any) => {if (responseData) setChanged(false)})
        .catch((error) => {
          console.log(error.message);
        });
      }
    };

  const newSettingsSave = () => {
    const newSettings = {wordsPerDay: wordsPerDayNew, 
    vocabulary: {strong: strong, deleted: deleted, translate}, 
    savanna: {sound: soundSavanna, speak: speakSavanna}, 
    speakit: {sound: soundSpeakIt},
    };
    newSettings.wordsPerDay = wordsPerDayNew; 
    if (newSettings === parseSettings) {
      localStorage.setItem("settings", JSON.stringify(newSettings));
    }
    setUserSettings(newSettings);
  };  

  return (
    <Container className="min-vh-100 p-0 border border-top-0">
      <Container className="study-page-head-block bg-light">
        <h2 className="study-page-head-text p-3">Настройки</h2>
        <div className="user-settings-wrapper">
          <Button className="settings-button"
            variant={changed ? "success" : "primary"}
            onClick={()=>{newSettingsSave()}}
          >Сохранить</Button>  
        <div className="user-info">
          <h3 className="username">{username}</h3>
          {avatarUrl && <img className="userpic" src={`${avatarUrl}`} alt="user avatar" />}
        </div>
        <div className="words-in-day-wrapper">
          <span className="words-in-day">Я хочу учить</span>
          <Button className="settings-buttons"
            onClick={()=>{verWordsPerDay(wordsPerDayNew + 1)}}
          >+</Button>  
          <span className="words-per-day">{wordsPerDayNew}</span>
          <Button className="settings-buttons"
            onClick={()=>{verWordsPerDay(wordsPerDayNew - 1)}}
          >-</Button>  
          <span className="words-in-day">слов в день</span>
        </div>
        <div className="settings-block">
          <h4>Настройки раздела Изучение</h4>
          <Form>
            <div key="checkbox" className="setting">
              <Form.Check className="setting" type="checkbox" id="laerningWordTranslate">
                <Form.Check.Input checked={translate} onChange={()=>{setTranslate(!translate)}} type="checkbox"/>
                <Form.Check.Label>Отображать перевод изучаемого слова</Form.Check.Label>
              </Form.Check>
              <Form.Check className="setting" type="checkbox" id="swowStrongWords">
                <Form.Check.Input checked={strong} onChange={()=>{setStrong(!strong)}} type="checkbox"/>
                <Form.Check.Label>Отображать кнопку "В сложные слова"</Form.Check.Label>
              </Form.Check>
              <Form.Check className="setting" type="checkbox" id="swowDelitedWords">
                <Form.Check.Input checked={deleted} onChange={()=>{setDeleted(!deleted)}} type="checkbox"/>
                <Form.Check.Label>Отображать кнопку "В удалённые слова"</Form.Check.Label>
              </Form.Check>
            </div>
          </Form>
        </div>
        <div className="settings-block">
          <h4>Настройки игры Саванна</h4>
          <Button className="settings-buttons" 
            type="checkbox" onClick={() => setSoundSavanna(!soundSavanna)} >
            {soundSavanna ? <BiBell size="1.4rem" /> : <BiBellOff size="1.4rem" />}
          </Button>
          <Button className="settings-buttons"
            type="checkbox" onClick={() => setSpeakSavanna(!speakSavanna)}>
            {speakSavanna ? (
            <BsFillVolumeUpFill size="1.4rem" />
            ) : (
            <BsVolumeMute size="1.4rem" />
            )}
          </Button>
        </div>
        <div className="settings-block">
          <h4>Настройки игры Скажи это</h4>
          <Button className="settings-buttons" 
            type="checkbox" onClick={() => setSoundSpeakIt(!soundSpeakIt)} >
            {soundSpeakIt ? <BiBell size="1.4rem" /> : <BiBellOff size="1.4rem" />}
          </Button>
        </div>
        </div>
      </Container>
    </Container>
  );
};

export default Settings;