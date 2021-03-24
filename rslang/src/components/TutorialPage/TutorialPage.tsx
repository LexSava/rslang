import "bootstrap/dist/css/bootstrap.min.css";
import "./TutorialPage.scss";
import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Menu from "../Menu/Menu";
import Main from "../Main/Main";
interface InterfaceTutorialPage {}

const TutorialPage: React.FC<InterfaceTutorialPage> = (props) => {
  return (
    <Container className="min-vh-100">
      <Container className="bg-warning p-3 d-flex justify-content-between">
        <Link to="/" className="link-logo-block text-primary">
          <h1 className="logo-tutorial-page text-dark m-0">RS Lang</h1>
        </Link>
        <Link
          to="/"
          className="btn btn-primary rounded-pill border border-0 btn-lg mr-3 login-button"
        >
          Выход
        </Link>
      </Container>
      <Menu />
      <Main />
    </Container>
  );
};
export default TutorialPage;
