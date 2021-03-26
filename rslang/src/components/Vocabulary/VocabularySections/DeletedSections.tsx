import "bootstrap/dist/css/bootstrap.min.css";
import "./VocabularySections.scss";
import React from "react";
import { Container, Button } from "react-bootstrap";
interface InterfaceDeletedSections {}

const DeletedSections: React.FC<InterfaceDeletedSections> = (props) => {
  return (
    <Container className="bg-light mt-4 min-vh-100">
    <Container className="d-flex justify-content-end">
      <Button variant="primary" className="pt-3 pb-3 pl-5 pr-5 mt-4 mr-4">
        В изученные
      </Button>
      <Button variant="warning" className="pt-3 pb-3 pl-5 pr-5 mt-4">
        В сложные
      </Button>
    </Container>
    </Container>
  );
};
export default DeletedSections;
