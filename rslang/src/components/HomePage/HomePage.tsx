import "bootstrap/dist/css/bootstrap.min.css";
import "./HomePage.scss";
import React, { useState, useEffect } from "react";
import { Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

interface HeaderHomePage {}

const HomePage: React.FC<HeaderHomePage> = (props) => {
  //   const [loading, setLoading] = useState(false);

  //   if (!loading) {
  //     return <div>loading...</div>;
  //   }
  return (
    <Container className="d-flex main-block">
      <Container className="bg-warning w-75 ">
        <Link to="/" className="link-logo-block text-primary ">
          <h1 className="logo text-dark">RS Lang</h1>
        </Link>
        <div className="main-img w-75 h-75"></div>
      </Container>

      <Container className="bg-light">
        <header className="header">
          <Nav
            variant="pills"
            defaultActiveKey="/home"
            className="justify-content-end align-items-center"
          >
            <Nav.Item className="">
              <Nav.Link
                href="/"
                className="btn btn-outline-warning rounded-pill border border-0 btn-lg mr-3"
              >
                Обучение
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                eventKey="link-1"
                className="btn btn-outline-warning rounded-pill border border-0 btn-lg mr-3"
              >
                Игры
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                eventKey="link-2"
                className="btn btn-outline-warning rounded-pill border border-0 btn-lg mr-5"
              >
                Статистика
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="">
              <Nav.Link
                eventKey="disabled"
                className="btn btn-primary rounded-pill border border-4 btn-lg mr-3 login-button"
              >
                Войти
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </header>
      </Container>
    </Container>
  );
};
export default HomePage;
