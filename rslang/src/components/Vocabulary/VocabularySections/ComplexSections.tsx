import "bootstrap/dist/css/bootstrap.min.css";
import "./VocabularySections.scss";
import React from "react";
import { Container, Button } from "react-bootstrap";
interface InterfaceComplexSections {}

const ComplexSections: React.FC<InterfaceComplexSections> = (props) => {
  return (
    <Container className="bg-light mt-4 min-vh-100">
      <Container className="d-flex justify-content-end">
        <Button variant="primary" className="pt-3 pb-3 pl-5 pr-5 mt-4 mr-4">
          В изученные
        </Button>
        <Button variant="danger" className="pt-3 pb-3 pl-5 pr-5 mt-4">
          Удалить
        </Button>
      </Container>
    </Container>
  );
};
export default ComplexSections;
