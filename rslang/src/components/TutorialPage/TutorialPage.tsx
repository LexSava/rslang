import "bootstrap/dist/css/bootstrap.min.css";
import "./TutorialPage.scss";
import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Menu from "../Menu/Menu";
import Main from "../Main/Main";
interface HeaderTutorialPage {}

const TutorialPage: React.FC<HeaderTutorialPage> = (props) => {
  return (
    <Container className="min-vh-100">
      <div className="container-fluid">
        <div className="row">
          <Menu />
          <main className="col-md-9">
            <Main />
          </main>
        </div>
      </div>
    </Container>
  );
};
export default TutorialPage;
