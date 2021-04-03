import "bootstrap/dist/css/bootstrap.min.css";
import "./StudySections.scss";
import React, { useState, useEffect } from "react";
import {
  BsSkipEndFill,
  BsArrowDown,
  BsArrowUp,
  BsArrowRight,
  BsX,
} from "react-icons/bs";
import {
  Container,
  Button,
  Card,
  ListGroup,
  ListGroupItem,
  Jumbotron,
  Form,
  ProgressBar,
} from "react-bootstrap";
import EmptySection from "./EmptySection";
const url = `https://serene-falls-78086.herokuapp.com/`;

interface InterfaceNewWordsSection {
  words: any;
  onClosePage(str: string): void;
  onGetHardWords(arr: any): void;
  onGetLearnedWords(arr: any): void;
  onGetDeletedWords(arr: any): void;
  onGetCorrectAnswer(arr: any): void;
  onGetBestSeries(arr: any): void;
}

const NewWordsSection: React.FC<InterfaceNewWordsSection> = (props) => {
  const [newWords, setNewWord] = useState<any>(props.words);
  const [wordCard, setWordCard] = useState<any>(0);
  const [show, setShow] = useState(false);
  const [inputText, setInputText] = useState<string>("");
  const [testButtonActivity, setTestButtonActivity] = useState<boolean>(true);
  const [testButtonText, setTestButtonText] = useState<string>("Проверить");
  const [testButtonArrow, setTestButtonArrow] = useState<any>(BsArrowUp);
  const [hintButtonActivity, setHintButtonActivity] = useState<boolean>(false);
  const [textMeaning, setTextMeaning] = useState<string>("");
  const [textExample, setTextExample] = useState<string>("");

  const [correctAnswer, setCorrectAnswer] = useState<number>(0);
  let [wrongAnswer, setWrongAnswer] = useState<number>(0);
  let [bestAnswerSeries, setBestAnswerSeries] = useState<number>(0);

  let [progressPercentage, setProgressPercentage] = useState<number>(0);
  let [cardNumber, setCardNumber] = useState<number>(0);

  const correctAnswers = () => {
    if (
      (inputText.toLowerCase() !== newWords[cardNumber].word.toLowerCase() ||
        inputText.toLowerCase() === newWords[cardNumber].word.toLowerCase()) &&
      testButtonText !== "Следующее слово"
    ) {
      setWrongAnswer(++wrongAnswer);
    }
    return setCorrectAnswer(Math.round(((cardNumber + 1) / wrongAnswer) * 100));
  };
  const getBestAnswerSeries = () => {
    if (
      inputText.toLowerCase() === newWords[cardNumber].word.toLowerCase() &&
      testButtonText !== "Следующее слово"
    ) {
      setBestAnswerSeries(++bestAnswerSeries);
    } else if (
      inputText.toLowerCase() !== newWords[cardNumber].word.toLowerCase() &&
      testButtonText !== "Следующее слово"
    ) {
      setBestAnswerSeries(0);
    }
    return bestAnswerSeries;
  };

  useEffect(() => {
    props.onGetCorrectAnswer(correctAnswer);
  }, [correctAnswer]);

  useEffect(() => {
    props.onGetBestSeries(bestAnswerSeries);
  }, [bestAnswerSeries]);

  useEffect(() => {
    setNewWord(props.words);
  }, [props.words]);

  const getHardWord = () => {
    props.onGetHardWords(newWords[cardNumber]);
  };
  const getDeletedWords = () => {
    props.onGetDeletedWords(newWords[cardNumber]);
    setNewWord(newWords.filter((n: any) => n.id !== newWords[cardNumber].id));
  };

  useEffect(() => {
    setTestButtonText("Проверить");
    setTestButtonArrow(BsArrowUp);
  }, [cardNumber]);

  useEffect(() => {
    if (cardNumber <= newWords.length - 1) {
      setTextMeaning(
        newWords[cardNumber].textMeaning
          .replace(`<i>${newWords[cardNumber].word}</i>`, "[.....]")
          .replace(
            `<i>${
              newWords[cardNumber].word[0].toUpperCase() +
              newWords[cardNumber].word.slice(1)
            }</i>`,
            "[.....]"
          )
      );

      setTextExample(
        newWords[cardNumber].textExample
          .replace(`<b>${newWords[cardNumber].word}</b>`, "[.....]")
          .replace(
            `<b>${
              newWords[cardNumber].word[0].toUpperCase() +
              newWords[cardNumber].word.slice(1)
            }</b>`,
            "[.....]"
          )
      );
    }
  }, [cardNumber, wordCard]);

  useEffect(() => {
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
      props.onGetLearnedWords(newWords[cardNumber]);
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
    if (cardNumber < newWords.length && testButtonText === "Следующее слово") {
      setCardNumber(1 + cardNumber);
      setShow(false);
      setInputText("");
      setHintButtonActivity(false);
      setProgressPercentage(5 + progressPercentage);
    }
  };
  const getHint = () => {
    setInputText(newWords[cardNumber].word);
    setHintButtonActivity(true);
    playAudioWord();
  };

  const closePage = () => {
    props.onClosePage("");
  };

  useEffect(() => {
    if (cardNumber > newWords.length - 1) {
      setCardNumber(0);
      setShow(false);
      setProgressPercentage(0);
    } else {
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
              <Card.Text className="h6">{textMeaning}</Card.Text>
              <Card.Text
                className="blockquote-footer"
                style={show ? { display: "block" } : { display: "none" }}
              >
                {newWords[cardNumber].textMeaningTranslate}
              </Card.Text>
            </ListGroupItem>
            <ListGroupItem>
              <Card.Text className="h6">{textExample}</Card.Text>
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
            <Container className="d-flex justify-content-around mb-5">
              <Button
                id="check-button"
                variant="success"
                disabled={testButtonActivity}
                onClick={() => {
                  showNextCard();
                  wordCheck();
                  correctAnswers();
                  getBestAnswerSeries();
                }}
              >
                {testButtonText}
                {testButtonArrow}
              </Button>
              <Button
                className=""
                variant="outline-info"
                disabled={hintButtonActivity}
                onClick={() => {
                  setShow(!show);
                  getHint();
                }}
              >
                Показать ответ
                <BsArrowDown />
              </Button>
            </Container>
            <Container className="d-flex justify-content-end">
              <Button
                variant="warning"
                className="mr-2"
                onClick={() => {
                  getHardWord();
                }}
              >
                Сложные слова
              </Button>
              <Button
                variant="danger"
                onClick={() => {
                  getDeletedWords();
                }}
              >
                Удалённые слова
              </Button>
            </Container>
          </Card.Body>
        </Card>
      );
    }
  }, [
    newWords,
    show,
    cardNumber,
    testButtonActivity,
    inputText,
    testButtonText,
    textMeaning,
  ]);
  if (newWords.length === 0) {
    return <EmptySection onClosePage={closePage} />;
  } else {
    return (
      <Jumbotron className="bg-light min-vh-100 position-relative">
        <Button
          variant="outline-dark"
          className="position-absolute btn-close mr-5"
          onClick={() => {
            closePage();
          }}
        >
          <BsX />
        </Button>
        <Container className="mb-4">
          <p className="study-page-head-text m-0 mb-3">
            Сегодня изучено: {cardNumber} из {newWords.length} слов
          </p>
          <ProgressBar
            now={progressPercentage}
            label={`${progressPercentage}%`}
            className="w-50 progress-line"
          />
        </Container>
        {wordCard}
      </Jumbotron>
    );
  }
};
export default NewWordsSection;
