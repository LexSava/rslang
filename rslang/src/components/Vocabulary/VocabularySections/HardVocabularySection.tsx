import "bootstrap/dist/css/bootstrap.min.css";
import "./VocabularySections.scss";
import React, { useState, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
interface InterfaceHardVocabularySection {
  hardWords: any;
  // onGetSelectedWordsDeleteds(arr: any): void;
}

const HardVocabularySection: React.FC<InterfaceHardVocabularySection> = (
  props
) => {
  const [allWords, setAllWords] = useState<any>(props.hardWords);
  const [wordList, setWordList] = useState<any>([]);
  const [selectedWords, setSelectedWords] = useState<any>([]);
  const [wordsToMove, setwordsToMove] = useState<any>([]);

  useEffect(() => {
    setAllWords(props.hardWords);
  }, [props.hardWords]);

  // const wordDistribution = () => {
  //   setAllWord(
  //     allWords.filter(
  //       (e: any) => selectedWords.findIndex((i: any) => i === e.word) === -1
  //     )
  //   );
  //   setSelectedWords([]);
  // };

  // const deleteWords = () => {
  //   props.onGetSelectedWordsDeleteds(
  //     wordsToMove.concat(
  //       allWords.filter((element: any) => selectedWords.includes(element.word))
  //     )
  //   );
  // };

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
        <Button variant="primary" className="pt-3 pb-3 pl-5 pr-5 mt-4 mr-4">
          В изученные
        </Button>
        <Button
          variant="danger"
          className="pt-3 pb-3 pl-5 pr-5 mt-4"
          onClick={() => {
            // wordDistribution();
            // deleteWords();
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
export default HardVocabularySection;
