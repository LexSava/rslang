import "bootstrap/dist/css/bootstrap.min.css";
import "./Study.scss";
import React, { useState, useEffect } from "react";
import { Container, Card, Button } from "react-bootstrap";
import NewWords from "../../assets/img/new_words.jpg";
import RepeatWords from "../../assets/img/repeat_words.jpg";
import HardWords from "../../assets/img/hard_words.jpg";
import NewWordsSection from "./StudySections/NewWordsSection";
import RepeatWordsSection from "./StudySections/RepeatWordsSection";
import HardWordsSection from "./StudySections/HardWordsSection";
import _ from "lodash";

interface InterfaceStudy {
  words: any;
  hardWords: any;
  learnedWords: any;
  deletedWords: any;
  learnedWordToday: any;
  page: number;
  getHardWords(arr: any): void;
  getLearnedWords(arr: any): void;
  getDeletedWords(arr: any): void;
  getCorrectAnswer(arr: any): void;
  getBestSeries(arr: any): void;
  getLearnedWordToday(arr: any): void;
}

const Study: React.FC<InterfaceStudy> = (props) => {
  const [larnNewWord, setlarnNewWord] = useState<string>("");
  const [hardWords, setHardWords] = useState<any>([]);
  const [learnedWords, setLearnedWords] = useState<any>([]);
  const [deletedWords, setDeletedWords] = useState<any>([]);
  const [learnedWordToday, setLearnedWordToday] = useState<any>([]);

  useEffect(() => {
    props.getHardWords(hardWords);
  }, [hardWords]);

  useEffect(() => {
    props.getLearnedWords(learnedWords);
  }, [learnedWords]);

  useEffect(() => {
    props.getDeletedWords(deletedWords);
  }, [deletedWords]);

  useEffect(() => {
    props.getLearnedWordToday(learnedWordToday);
  }, [learnedWordToday]);

  const getHardWords = (arr: any) => {
    setHardWords(_.uniqWith(hardWords.concat(arr), _.isEqual));
  };
  const getLearnedWords = (arr: any) => {
    setLearnedWords(_.uniqWith(learnedWords.concat(arr), _.isEqual));
  };
  const getDeletedWords = (arr: any) => {
    setDeletedWords(_.uniqWith(deletedWords.concat(arr), _.isEqual));
  };
  const getLearnedWordToday = (arr: any) => {
    setLearnedWordToday(_.uniqWith(learnedWordToday.concat(arr), _.isEqual));
  };

  const startSectionWithWords = (section: string) => {
    setlarnNewWord(section);
  };

  const closePage = (str: string) => {
    setlarnNewWord(str);
  };

  const showPageStudy = () => {
    return (
      <Container className="p-0 border border-top-0">
        <Container className="study-page-head-block bg-light d-flex flex-wrap">
          <h2 className="study-page-head p-3 text-warning">Привет.</h2>
          <h2 className="study-page-head p-3 text-dark">
            Приступим к обучению!
          </h2>
        </Container>
        <p className="study-page-head-text p-4">
          На этой странице вы можете следить за своим прогрессом и выбирать
          желаемый набор слов для изучения, например,{" "}
          <strong>“Новые слова”</strong> , <strong>“Повторить слова” </strong>
          или <strong>“Сложные слова”</strong> . Удачи!
        </p>
        <Container className="d-flex flex-wrap align-items-center justify-content-around">
          <h3 className="study-page-head m-0">Сегодня изучено</h3>
          <p className="study-page-head-text m-0">
            Сегодня изучено: {props.learnedWordToday.length} из{" "}
            {props.words.length * (props.page + 1)} слов
          </p>
        </Container>
        <Container className="d-flex justify-content-around flex-wrap mt-4 p-5 bg-light">
          <Card
            style={{ width: "20rem" }}
            className="border-0 shadow bg-body m-3"
          >
            <Card.Img variant="top" src={NewWords} />
            <Card.Body>
              <Card.Title className="">Новые слова</Card.Title>
              <Card.Text>
                Нажмите, чтобы выучить новые слова на сегодня.
              </Card.Text>
              <Button
                variant="primary"
                onClick={() => {
                  startSectionWithWords("NewWordsSection");
                }}
              >
                Начать
              </Button>
            </Card.Body>
          </Card>
          <Card
            style={{ width: "20rem" }}
            className="border-0 shadow bg-body m-3"
          >
            <Card.Img variant="top" src={RepeatWords} />
            <Card.Body>
              <Card.Title className="">Повторить слова</Card.Title>
              <Card.Text>Нажмите, чтобы повторить выученные слова.</Card.Text>
              <Button
                variant="primary"
                onClick={() => {
                  startSectionWithWords("RepeatWordsSection");
                }}
              >
                Начать
              </Button>
            </Card.Body>
          </Card>

          <Card
            style={{ width: "20rem" }}
            className="border-0 shadow bg-body m-3"
          >
            <Card.Img variant="top" src={HardWords} />
            <Card.Body>
              <Card.Title className="">Сложные слова</Card.Title>
              <Card.Text>Нажмите, чтобы повторить сложные слова.</Card.Text>
              <Button
                variant="primary"
                onClick={() => {
                  startSectionWithWords("HardWordsSection");
                }}
              >
                Начать
              </Button>
            </Card.Body>
          </Card>
        </Container>
      </Container>
    );
  };

  if (larnNewWord === "NewWordsSection") {
    return (
      <NewWordsSection
        words={props.words}
        onClosePage={closePage}
        onGetHardWords={getHardWords}
        onGetLearnedWords={getLearnedWords}
        onGetDeletedWords={getDeletedWords}
        onGetLearnedWordToday={getLearnedWordToday}
        onGetCorrectAnswer={props.getCorrectAnswer}
        onGetBestSeries={props.getBestSeries}
      />
    );
  } else if (larnNewWord === "HardWordsSection") {
    return (
      <HardWordsSection
        words={props.hardWords}
        onClosePage={closePage}
        onGetDeletedWords={getDeletedWords}
      />
    );
  } else if (larnNewWord === "RepeatWordsSection") {
    return (
      <RepeatWordsSection
        words={props.learnedWords}
        onClosePage={closePage}
        onGetHardWords={getHardWords}
        onGetDeletedWords={getDeletedWords}
      />
    );
  } else {
    return showPageStudy();
  }
};
export default Study;
