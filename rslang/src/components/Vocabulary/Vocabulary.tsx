import "bootstrap/dist/css/bootstrap.min.css";
import "./Vocabulary.scss";
import { useState } from "react";
import { Container } from "react-bootstrap";
import getWords from "../../api/getWords";
import useLocalStorage from "../../hooks/useLocalStorage";

interface InterfaceVocabulary {}

interface Word {
  id: string,
  group: number,
  page: number,
  word: string,
  image: string,
  audio: string,
  audioMeaning: string,
  audioExample: string,
  textMeaning: string,
  textExample: string,
  transcription: string,
  textExampleTranslate: string,
  textMeaningTranslate: string,
  wordTranslate: string
}

const wordExample = {
    "id": "5e9f5ee35eb9e72bc21af4a2",
    "group": 0,
    "page": 0,
    "word": "boat",
    "image": "files/01_0005.jpg",
    "audio": "files/01_0005.mp3",
    "audioMeaning": "files/01_0005_meaning.mp3",
    "audioExample": "files/01_0005_example.mp3",
    "textMeaning": "A <i>boat</i> is a vehicle that moves across water.",
    "textExample": "There is a small <b>boat</b> on the lake.",
    "transcription": "[bout]",
    "textExampleTranslate": "На озере есть маленькая лодка",
    "textMeaningTranslate": "Лодка - это транспортное средство, которое движется по воде",
    "wordTranslate": "лодка"
}

const url = `https://serene-falls-78086.herokuapp.com/words`;

const Vocabulary: React.FC<InterfaceVocabulary> = (props) => {
  const [userId, setUserId] = useLocalStorage("userId", "");
  const [token, setToken] = useLocalStorage("token", "");
  const [refreshToken, setRefreshToken] = useLocalStorage("refreshToken", "");
  const [words, setWords] = useState<any>({});

async function getData(url: string, pref: string) {
    const fullUrl = url + pref;
    const data:any = await getWords(fullUrl);
    console.log(data)
    setWords(data.wordsPerDay)
  } 

  getData(url, "")

  return (
    <Container className="min-vh-100 p-0 border border-top-0">
      <Container className="study-page-head-block bg-light">
        <h2 className="study-page-head-text p-3">Словарь</h2>
      </Container>
    </Container>
  );
};
export default Vocabulary;
