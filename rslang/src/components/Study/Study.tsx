import "bootstrap/dist/css/bootstrap.min.css";
import "./Study.scss";
import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
interface InterfaceStudy {}

const Study: React.FC<InterfaceStudy> = (props) => {
  return (
    <Container className="min-vh-100 p-0 border border-top-0">
      <Container className="study-page-head-block bg-light">
        <h2 className="study-page-head-text p-3">Изучение</h2>
      </Container>
    </Container>
  );
};
export default Study;
