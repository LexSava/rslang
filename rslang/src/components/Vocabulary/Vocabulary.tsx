import "bootstrap/dist/css/bootstrap.min.css";
import "./Vocabulary.scss";
import React from "react";
import { Container } from "react-bootstrap";
interface InterfaceVocabulary {}

const Vocabulary: React.FC<InterfaceVocabulary> = (props) => {
  return (
    <Container className="min-vh-100 p-0 border border-top-0">
      <Container className="study-page-head-block bg-light">
        <h2 className="study-page-head-text p-3">Словарь</h2>
      </Container>
    </Container>
  );
};
export default Vocabulary;
