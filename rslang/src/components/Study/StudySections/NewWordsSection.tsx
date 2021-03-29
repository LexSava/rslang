import "bootstrap/dist/css/bootstrap.min.css";
import "./StudySections.scss";
import React, { useState, useEffect } from "react";
import {
  BsSkipEndFill,
  BsArrowDown,
  BsArrowUp,
  BsArrowRight,
} from "react-icons/bs";
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
  ProgressBar,
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
  const [inputText, setInputText] = useState<string>("");
  const [testButtonActivity, setTestButtonActivity] = useState<boolean>(true);
  const [testButtonText, setTestButtonText] = useState<string>("Проверить");
  const [testButtonArrow, setTestButtonArrow] = useState<any>(BsArrowUp);
  const [hintButtonActivity, setHintButtonActivity] = useState<boolean>(false);

  let [progressPercentage, setProgressPercentage] = useState<number>(0);
  let [cardNumber, setCardNumber] = useState<number>(0);

  useEffect(() => {
    setNewWord(props.words);
  }, [props.words]);

  useEffect(() => {
    setTestButtonText("Проверить");
    setTestButtonArrow(BsArrowUp);
  }, [cardNumber]);

  useEffect(() => {
    console.log(inputText);
    if (inputText.length !== 0) {
      setTestButtonActivity(false);
    } else {
      setTestButtonActivity(true);
    }
  }, [inputText]);

  const enteredWord = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const playAudio = () => {
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
  const playAudioWord = () => {
    const audioWord = new Audio(url + newWords[cardNumber].audio);
    audioWord.play();
  };

  const wordCheck = () => {
    if (inputText.toLowerCase() === newWords[cardNumber].word.toLowerCase()) {
      setTestButtonText("Следующее слово");
      setTestButtonArrow(BsArrowRight);
      setProgressPercentage(5 + progressPercentage);
    } else {
      setTestButtonText("Проверить");
      setTestButtonArrow(BsArrowUp);
    }
  };

  const keyPressHandler = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      wordCheck();
    }
  };

  const showNextCard = () => {
    if (cardNumber <= newWords.length && testButtonText === "Следующее слово") {
      setCardNumber(1 + cardNumber);
      setShow(false);
      setInputText("");
      setHintButtonActivity(false);
    } else if (cardNumber === 19 && testButtonText === "Следующее слово") {
      setCardNumber(0);
      setShow(false);
      setProgressPercentage(0);
    } else {
    }
  };
  const getHint = () => {
    setInputText(newWords[cardNumber].word);
    setHintButtonActivity(true);
    playAudioWord();
    console.log(testButtonText);
  };

  useEffect(() => {
    setWordCard(
      <Card
        style={{ width: "30rem" }}
        key={newWords[cardNumber].id}
        className="card-new-words"
      >
        <Card.Img variant="top" src={url + newWords[cardNumber].image} />
        <Card.Body>
          <Card.Title
            style={show ? { display: "block" } : { display: "none" }}
            className="text-primary font-weight-bold"
          >
            {newWords[cardNumber].word}
            <Button
              variant="outline-info"
              className="ml-5"
              style={{ float: "right" }}
              onClick={() => {
                playAudio();
              }}
            >
              Прослушать <BsSkipEndFill />
            </Button>
          </Card.Title>
          <Card.Title
            style={show ? { display: "block" } : { display: "none" }}
            className="font-weight-light"
          >
            {newWords[cardNumber].transcription}
          </Card.Title>
          <Card.Title className="font-weight-bold">
            {newWords[cardNumber].wordTranslate}
          </Card.Title>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroupItem>
            {" "}
            <Card.Text className="h6">
              {newWords[cardNumber].textMeaning}
            </Card.Text>
            <Card.Text
              className="blockquote-footer"
              style={show ? { display: "block" } : { display: "none" }}
            >
              {newWords[cardNumber].textMeaningTranslate}
            </Card.Text>
          </ListGroupItem>
          <ListGroupItem>
            <Card.Text className="h6">
              {newWords[cardNumber].textExample}
            </Card.Text>
            <Card.Text
              className="blockquote-footer"
              style={show ? { display: "block" } : { display: "none" }}
            >
              {newWords[cardNumber].textExampleTranslate}
            </Card.Text>
          </ListGroupItem>
        </ListGroup>
        <Card.Body className="">
          <Form.Control
            type="text"
            placeholder="Введите слово"
            value={inputText}
            onChange={enteredWord}
            onInput={enteredWord}
            onKeyPress={keyPressHandler}
            autoFocus
            className="mb-3"
          />
          {/* <Card.Link href="#">Card Link</Card.Link>
          <Card.Link href="#">Another Link</Card.Link> */}
          <Container className="d-flex justify-content-around">
            <Button
              id="check-button"
              variant="success"
              disabled={testButtonActivity}
              onClick={() => {
                showNextCard();
                //   playAudioWord();
                wordCheck();
              }}
            >
              {testButtonText}
              {testButtonArrow}
            </Button>
            <Button
              className="ml-3"
              variant="outline-info"
              disabled={hintButtonActivity}
              onClick={() => {
                setShow(!show);
                // playAudio();
                getHint();
              }}
            >
              Показать ответ
              <BsArrowDown />
            </Button>
          </Container>
        </Card.Body>
      </Card>
    );
  }, [
    newWords,
    show,
    cardNumber,
    testButtonActivity,
    inputText,
    testButtonText,
  ]);

  //   showWordCard();
  return (
    <Jumbotron className="bg-light min-vh-100">
      <ProgressBar now={progressPercentage} label={`${progressPercentage}%`} />
      {wordCard}
    </Jumbotron>
  );
};
export default NewWordsSection;
