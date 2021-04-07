import "bootstrap/dist/css/bootstrap.min.css";
import "./Vocabulary.scss";
import { useState, useEffect } from "react";
import { Container, Nav, Button } from "react-bootstrap";
import VocabularySections from "./VocabularySections/VocabularySections";
import _ from "lodash";

interface InterfaceVocabulary {
  hardWords: any;
  learnedWords: any;
  deletedWords: any;
  sortingDeletedWords: any;
  getHardWords(arr: any): void;
  getLearnedWords(arr: any): void;
  getDeletedWords(arr: any): void;
}

const Vocabulary: React.FC<InterfaceVocabulary> = (props) => {
  const [selectedSection, setSelectedSection] = useState<string>(
    "studied-sections"
  );
  const [hardWords, setHardWords] = useState<any>([]);
  const [learnedWords, setLearnedWords] = useState<any>([]);
  const [deletedWords, setDeletedWords] = useState<any>([]);

  useEffect(() => {
    props.getHardWords(hardWords);
  }, [hardWords]);

  useEffect(() => {
    props.getLearnedWords(learnedWords);
  }, [learnedWords]);

  useEffect(() => {
    props.getDeletedWords(deletedWords);
  }, [deletedWords]);

  const getHardWords = (arr: any) => {
    setHardWords(_.uniqWith(hardWords.concat(arr), _.isEqual));
  };
  const getLearnedWords = (arr: any) => {
    setLearnedWords(_.uniqWith(learnedWords.concat(arr), _.isEqual));
  };
  const getDeletedWords = (arr: any) => {
    setDeletedWords(_.uniqWith(deletedWords.concat(arr), _.isEqual));
  };

  const switchSection = (section: string): void => {
    return setSelectedSection(section);
  };

  return (
    <Container className="min-vh-100 p-0 border border-top-0">
      <Container className="vocabulary-page-head-block bg-light">
        <h2 className="vocabulary-page-head p-3 text-warning">Словарь.</h2>
      </Container>
      <Container className="mt-4">
        <Nav
          variant="pills"
          defaultActiveKey="/"
          className="justify-content-around"
        >
          <Nav.Item className="w-25">
            <Button
              variant="outline-success"
              className="p-3 vocabulary-page-link"
              onClick={() => switchSection("studied-sections")}
            >
              Изученные
            </Button>
          </Nav.Item>
          <Nav.Item className="w-25">
            <Button
              variant="outline-success"
              className="p-3  vocabulary-page-link"
              onClick={() => switchSection("hard-sections")}
            >
              Сложные
            </Button>
          </Nav.Item>
          <Nav.Item className="w-25">
            <Button
              variant="outline-success"
              className="p-3 vocabulary-page-link"
              onClick={() => switchSection("deleted-sections")}
            >
              Удаленные
            </Button>
          </Nav.Item>
        </Nav>
      </Container>
      <VocabularySections
        selectedSection={selectedSection}
        hardWords={props.hardWords}
        learnedWords={props.learnedWords}
        deletedWords={props.deletedWords}
        sortingDeletedWords={props.sortingDeletedWords}
        getHardWords={getHardWords}
        getLearnedWords={getLearnedWords}
        getDeletedWords={getDeletedWords}
      />
    </Container>
  );
};
export default Vocabulary;
