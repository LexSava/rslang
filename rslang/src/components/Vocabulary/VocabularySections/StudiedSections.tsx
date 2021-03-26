import "bootstrap/dist/css/bootstrap.min.css";
import "./VocabularySections.scss";
import React, { useState, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
interface InterfaceStudiedSections {}

const StudiedSections: React.FC<InterfaceStudiedSections> = (props) => {
  const [words, setWord] = useState<number>(0);
  const [allWords, setAllWord] = useState<any>([]);
  const [wordList, setWordList] = useState<any>([]);
  const [selectedWords, setSelectedWords] = useState<any>([]);
  let arraySelectedWords: any = [];
  async function getWeather() {
    const url = `http://serene-falls-78086.herokuapp.com/words`;
    const res = await fetch(url);
    const data = await res.json();
    setAllWord(data);
  }

  useEffect(() => {
    getWeather();
  }, []);

  const handleChange = (e: any) => {
    if (e.target.checked) {
      arraySelectedWords = [...arraySelectedWords, e.target.value];
    } else {
      arraySelectedWords = arraySelectedWords.filter(
        (value: string) => value !== e.target.value
      );
    }

    console.log(arraySelectedWords);
    console.log(arraySelectedWords.length);
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
        <Button variant="danger" className="pt-3 pb-3 pl-5 pr-5 mt-4">
          Удалить
        </Button>
      </Container>

      <Container>
        <h3>Выбрано 0 слов</h3>
        <ul className="list-group" onChange={handleChange}>
          {wordList}
        </ul>
      </Container>
    </Container>
  );
};
export default StudiedSections;
