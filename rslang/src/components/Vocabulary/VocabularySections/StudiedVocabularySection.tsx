import "bootstrap/dist/css/bootstrap.min.css";
import "./VocabularySections.scss";
import React, { useState, useEffect } from "react";
import { Container, Button } from "react-bootstrap";

interface InterfaceStudiedVocabularySection {
  learnedWords: any;
  onGetHardWords(arr: any): void;
  onGetLearnedWords(arr: any): void;
  onGetDeletedWords(arr: any): void;
}

const StudiedVocabularySection: React.FC<InterfaceStudiedVocabularySection> = (
  props
) => {
  // const [words, setWords] = useState<any>([]);
  const [allWords, setAllWord] = useState<any>(props.learnedWords);
  const [wordList, setWordList] = useState<any>([]);
  const [selectedWords, setSelectedWords] = useState<any>([]);
  const wordsToMove: any = [];

  const hardWords = () => {
    props.onGetHardWords(
      wordsToMove.concat(
        allWords.filter((element: any) => selectedWords.includes(element.word))
      )
    );
  };
  const deletedWords = () => {
    props.onGetDeletedWords(
      wordsToMove.concat(
        allWords.filter((element: any) => selectedWords.includes(element.word))
      )
    );
  };

  const studiedtWords = () => {
    console.log(allWords);
  };

  const wordDistribution = () => {
    setAllWord(
      allWords.filter(
        (e: any) => selectedWords.findIndex((i: any) => i === e.word) === -1
      )
    );
    props.onGetLearnedWords(
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
          <li className="list-group-item list-word mt-3" key={item.id}>
            <input
              className="form-check-input list-word-checkbox"
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
            hardWords();
            studiedtWords();
          }}
        >
          В сложные
        </Button>
        <Button
          variant="danger"
          className="pt-3 pb-3 pl-5 pr-5 mt-4"
          onClick={() => {
            wordDistribution();
            deletedWords();
          }}
        >
          Удалить
        </Button>
      </Container>

      <Container>
        <h3 className="mt-3 mb-3 text-primary selected-words-head">
          Выбрано {selectedWords.length} слов
        </h3>
        <ul className="list-group" onChange={handleChange}>
          {wordList}
        </ul>
      </Container>
    </Container>
  );
};

export default StudiedVocabularySection;
