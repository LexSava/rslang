import "bootstrap/dist/css/bootstrap.min.css";
import "./StudySections.scss";
import React from "react";
import { Container, Jumbotron, Button } from "react-bootstrap";
import { BsX } from "react-icons/bs";
interface InterfaceEmptySection {
  onClosePage(str: string): void;
}

const EmptySection: React.FC<InterfaceEmptySection> = (props) => {
  const closePage = () => {
    props.onClosePage("");
  };

  return (
    <Jumbotron className="bg-light min-vh-100 position-relative empty-section-text">
      <Button
        variant="outline-dark"
        className="position-absolute btn-close mr-5"
        onClick={() => {
          closePage();
        }}
      >
        <BsX />
      </Button>
      <Container className="mt-5 text-center">Нет слов для изучения</Container>
    </Jumbotron>
  );
};

export default EmptySection;
