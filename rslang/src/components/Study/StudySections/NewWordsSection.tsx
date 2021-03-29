import "bootstrap/dist/css/bootstrap.min.css";
import "./StudySections.scss";
import React, { useState, useEffect } from "react";
import {
  Container,
  Button,
  Card,
  ListGroup,
  ListGroupItem,
  InputGroup,
  FormControl,
  Jumbotron,
  Form,
} from "react-bootstrap";
const url = `https://serene-falls-78086.herokuapp.com/`;

interface InterfaceNewWordsSection {
  words: any;
}

const wordExample = {
  id: "5e9f5ee35eb9e72bc21af4a2",
  group: 0,
  page: 0,
  word: "boat",
  image: "files/01_0005.jpg",
  audio: "files/01_0005.mp3",
  audioMeaning: "files/01_0005_meaning.mp3",
  audioExample: "files/01_0005_example.mp3",
  textMeaning: "A <i>boat</i> is a vehicle that moves across water.",
  textExample: "There is a small <b>boat</b> on the lake.",
  transcription: "[bout]",
  textExampleTranslate: "На озере есть маленькая лодка",
  textMeaningTranslate:
    "Лодка - это транспортное средство, которое движется по воде",
  wordTranslate: "лодка",
};

const NewWordsSection: React.FC<InterfaceNewWordsSection> = (props) => {
  const [newWords, setNewWord] = useState<any>(props.words);
  const [wordCard, setWordCard] = useState<any>(0);
  const [show, setShow] = useState(false);
  let [cardNumber, setCardNumber] = useState<number>(0);

  useEffect(() => {
    setNewWord(props.words);
  }, [props.words]);

  const playAudioWord = (volume = 0.2) => {
    const audioWord = new Audio(url + newWords[cardNumber].audio);
    const audioMeaning = new Audio(url + newWords[cardNumber].audioMeaning);
    const audioExample = new Audio(url + newWords[cardNumber].audioExample);
    audioMeaning.pause();
    audioExample.pause();
    audioWord.addEventListener("ended", function () {
      audioMeaning.play();
    });
    audioMeaning.addEventListener("ended", function () {
      audioExample.play();
    });

    // sound.preload = "auto";
    return audioWord.play();
  };

  const playAudio = (volume: number = 0.2) => {
    let audioElements = [
      new Audio(newWords[cardNumber].audio),
      new Audio(newWords[cardNumber].audioMeaning),
      new Audio(newWords[cardNumber].textExample),
    ];

    for (let i = 0; i < audioElements.length; i++) {
      if (i === 0) {
        // Первое аудио запускаем
        // audioElements[i].volume = volume;
        audioElements[i].play();
      } else {
        // Остальные — после окончания предыдущего
        audioElements[i - 1].addEventListener("ended", function () {
          audioElements[i].play();
        });
      }
    }
  };

  const showNextCard = () => {
    if (cardNumber < newWords.length - 1) {
      setCardNumber(++cardNumber);
      setShow(false);
    } else {
      setCardNumber(0);
      setShow(false);
    }
  };

  useEffect(() => {
    console.log(newWords);
    setWordCard(
      <Card style={{ width: "25rem" }} key={newWords[cardNumber].id}>
        <Card.Img variant="top" src={url + newWords[cardNumber].image} />
        <Card.Body>
          <Card.Title style={show ? { display: "block" } : { display: "none" }}>
            {newWords[cardNumber].word}
          </Card.Title>
          <Card.Title style={show ? { display: "block" } : { display: "none" }}>
            {newWords[cardNumber].transcription}
          </Card.Title>
          <Card.Title>{newWords[cardNumber].wordTranslate}</Card.Title>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroupItem>
            {" "}
            <Card.Text>{newWords[cardNumber].textMeaning}</Card.Text>
            <Card.Text
              style={show ? { display: "block" } : { display: "none" }}
            >
              {newWords[cardNumber].textMeaningTranslate}
            </Card.Text>
          </ListGroupItem>
          <ListGroupItem>
            <Card.Text>{newWords[cardNumber].textExample}</Card.Text>
            <Card.Text
              style={show ? { display: "block" } : { display: "none" }}
            >
              {newWords[cardNumber].textExampleTranslate}
            </Card.Text>
          </ListGroupItem>
        </ListGroup>
        <Card.Body className="">
          <Form.Control type="text" placeholder="Normal text" />
          {/* <Card.Link href="#">Card Link</Card.Link>
          <Card.Link href="#">Another Link</Card.Link> */}
          <Button
            variant="primary"
            onClick={() => {
              showNextCard();
              playAudioWord();
            }}
          >
            Проверить
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              setShow(!show);
              playAudioWord();
            }}
          >
            Показать
          </Button>
        </Card.Body>
      </Card>
    );
  }, [newWords, show, cardNumber]);

  //   showWordCard();
  return <Jumbotron className="bg-light mt-4 min-vh-100">{wordCard}</Jumbotron>;
};
export default NewWordsSection;
