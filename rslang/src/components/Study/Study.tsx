import "bootstrap/dist/css/bootstrap.min.css";
import "./Study.scss";
import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
interface HeaderStudy {}

const Study: React.FC<HeaderStudy> = (props) => {
  return (
    <Container className="min-vh-100 p-0 border border-top-0">
      <Container className="study-page-head-block">
        <h2 className="study-page-head-text">Изучение</h2>
      </Container>
    </Container>
  );
};
export default Study;
