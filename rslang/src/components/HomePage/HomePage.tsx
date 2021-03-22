import "bootstrap/dist/css/bootstrap.min.css";
import "./HomePage.scss";
import React, { useState, useEffect } from "react";
import { Container, Nav, Button } from "react-bootstrap";
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
        <Link to="/" className="link-logo-block text-primary">
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
                eventKey="link-3"
                className="btn btn-primary rounded-pill border border-4 btn-lg mr-3 login-button"
              >
                Войти
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </header>
        <div className="description-block w-75 mt-5">
          <h2 className="description-head mt-2 mb-5">
            Изучайте Английский вместе с <p className="">RS Lang.</p>
          </h2>
          <p className="description-text">
            Ресурс позволяет учить английский онлайн при помощи метода
            интервального повторения, отслеживания индивидуального прогресса и
            мини-играми.
          </p>
          <p className="description-text">
            Мы рекомендуем сделать упор именно на изучении новых слов.
          </p>
          <h3 className="description-head mb-3 mt-5">
            Метод интервального повторения.
          </h3>
          <p className="description-text">
            Первый раз вы должны повторить это слово где-нибудь через пару
            минут, потом — через час, далее — на следующий день, затем — через 2
            дня, 5 дней, 10 дней, 3 недели, 6 недель, 3 месяца, 6 месяцев и т.д.
            И вуаля: вы на всю жизнь запомните, что за словом «cat» скрывается
            некто пушистый и мурлыкающий.{" "}
          </p>
          <Button
            variant="outline-primary"
            className="rounded-pill description-btn mt-3"
          >
            Регистрация
          </Button>{" "}
        </div>
      </Container>
    </Container>
  );
};
export default HomePage;
