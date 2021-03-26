import "bootstrap/dist/css/bootstrap.min.css";
import "./Vocabulary.scss";
import React, { useState } from "react";
import { Container, Nav, Button } from "react-bootstrap";
import VocabularySections from "./VocabularySections/VocabularySections";
interface InterfaceVocabulary {}

const Vocabulary: React.FC<InterfaceVocabulary> = (props) => {
  const [selectedSection, setSelectedSection] = useState<string>(
    "studied-sections"
  );

  const switchSection = (section: string): void => {
    return setSelectedSection(section);
  };

  console.log(selectedSection);

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
              onClick={() => switchSection("complex-sections")}
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
      <VocabularySections selectedSection={selectedSection} />
    </Container>
  );
};
export default Vocabulary;
