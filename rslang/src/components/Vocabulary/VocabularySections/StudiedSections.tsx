import "bootstrap/dist/css/bootstrap.min.css";
import "./VocabularySections.scss";
import React, { useState, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
interface InterfaceStudiedSections {
  words: any;
}

const StudiedSections: React.FC<InterfaceStudiedSections> = (props) => {
  const [words, setWord] = useState<number>(0);
  const [allWords, setAllWord] = useState<any>(props.words);
  const [wordList, setWordList] = useState<any>([]);
  const [selectedWords, setSelectedWords] = useState<any>([]);

  const deleteWords = () => {
    setAllWord(
      allWords.filter(
        (e: any) => selectedWords.findIndex((i: any) => i == e.word) === -1
      )
    );
  };
  // const arr3: any = arr2.filter(
  //   (e) => arr1.findIndex((i) => i.name == e.name) === -1
  // );

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

  const handleChange = (e: any) => {
    if (e.target.checked) {
      setSelectedWords([...selectedWords, e.target.value]);
    } else {
      setSelectedWords(
        selectedWords.filter((value: string) => value !== e.target.value)
      );
    }
    console.log(selectedWords);
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
        <Button variant="warning" className="pt-3 pb-3 pl-5 pr-5 mt-4 mr-4">
          В сложные
        </Button>
        <Button
          variant="danger"
          className="pt-3 pb-3 pl-5 pr-5 mt-4"
          onClick={deleteWords}
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
export default StudiedSections;
