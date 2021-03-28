import "bootstrap/dist/css/bootstrap.min.css";
import "./VocabularySections.scss";
import React, { useState, useEffect } from "react";
import { Container, Button } from "react-bootstrap";

interface InterfaceStudiedSection {
  words: any;
  onGetsetselectedWordsComplex(arr: any): void;
  onGetsetselectedWordsDeleteds(arr: any): void;
}

const StudiedSection: React.FC<InterfaceStudiedSection> = (props) => {
  const [words, setWord] = useState<number>(0);
  const [allWords, setAllWord] = useState<any>([]);
  const [wordList, setWordList] = useState<any>([]);
  const [selectedWords, setSelectedWords] = useState<any>([]);
  const [wordsToMove, setwordsToMove] = useState<any>([]);

  async function getWeather() {
    const url = `http://serene-falls-78086.herokuapp.com/words`;
    const res = await fetch(url);
    const data = await res.json();
    setAllWord(data);
    console.log(data);
  }
  useEffect(() => {
    getWeather();
  }, []);

  const deleteWords = () => {
    props.onGetsetselectedWordsDeleteds(
      wordsToMove.concat(
        allWords.filter((element: any) => selectedWords.includes(element.word))
      )
    );
  };

  const difficultWords = () => {
    props.onGetsetselectedWordsComplex(
      wordsToMove.concat(
        allWords.filter((element: any) => selectedWords.includes(element.word))
      )
    );
  };

  const wordDistribution = () => {
    setAllWord(
      allWords.filter(
        (e: any) => selectedWords.findIndex((i: any) => i === e.word) === -1
      )
    );
    setSelectedWords([]);
  };

  const handleChange = (e: any) => {
    if (e.target.checked) {
      setSelectedWords([...selectedWords, e.target.value]);
    } else {
      setSelectedWords(
        selectedWords.filter((value: string) => value !== e.target.value)
      );
    }
  };

  useEffect(() => {
    setWordList(
      allWords.map((item: any) => {
        return (
          <li className="list-group-item" key={item.id}>
            <input
              className="form-check-input me-1"
              type="checkbox"
              value={item.word}
            />
            {item.word}
          </li>
        );
      })
    );
  }, [allWords]);

  return (
    <Container className="bg-light mt-4 min-vh-100">
      <Container className="d-flex justify-content-end">
        <Button
          variant="warning"
          className="pt-3 pb-3 pl-5 pr-5 mt-4 mr-4"
          onClick={() => {
            wordDistribution();
            difficultWords();
          }}
        >
          В сложные
        </Button>
        <Button
          variant="danger"
          className="pt-3 pb-3 pl-5 pr-5 mt-4"
          onClick={() => {
            wordDistribution();
            deleteWords();
          }}
        >
          Удалить
        </Button>
      </Container>

      <Container>
        <h3>Выбрано {selectedWords.length} слов</h3>
        <ul className="list-group" onChange={handleChange}>
          {wordList}
        </ul>
      </Container>
    </Container>
  );
};

export default StudiedSection;
