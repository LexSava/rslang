import "bootstrap/dist/css/bootstrap.min.css";
import "./HomePage.scss";
import React, { useState, useEffect } from "react";
import { Container, Nav, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Words from "../../assets/img/words.jpg";
import Articles from "../../assets/img/articles.jpg";
import Tests from "../../assets/img/tests.jpg";
import Games from "../../assets/img/games.jpg";
import Progress from "../../assets/img/progress.jpg";
import BackgroundFeatures from "../../assets/img/background_features.jpg";
import Video from "../../assets/img/video.jpg";
import Ava_1 from "../../assets/img/ava_1.jpg";
import Ava_2 from "../../assets/img/ava_2.jpg";
import Ava_3 from "../../assets/img/ava_3.jpg";
import Ava_4 from "../../assets/img/ava_4.jpg";

interface HeaderHomePage {}

const HomePage: React.FC<HeaderHomePage> = (props) => {
  //   const [loading, setLoading] = useState(false);

  //   if (!loading) {
  //     return <div>loading...</div>;
  //   }
  return (
    <Container>
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
                  href="#features"
                  className="btn btn-outline-warning rounded-pill border border-0 btn-lg mr-3"
                >
                  Особенности
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  href="#video"
                  // eventKey="link-1"
                  className="btn btn-outline-warning rounded-pill border border-0 btn-lg mr-3"
                >
                  Видео
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  href="#team"
                  // eventKey="link-2"
                  className="btn btn-outline-warning rounded-pill border border-0 btn-lg mr-5"
                >
                  Команда
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className="">
                <Nav.Link
                  href="/tutorial-page"
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
              минут, потом — через час, далее — на следующий день, затем — через
              2 дня, 5 дней, 10 дней, 3 недели, 6 недель, 3 месяца, 6 месяцев и
              т.д. И вуаля: вы на всю жизнь запомните, что за словом «cat»
              скрывается некто пушистый и мурлыкающий.{" "}
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

      <Container className="mt-5 teaching-block" id="features">
        <Container className="d-flex  align-items-center justify-content-around">
          <h2 className="teaching-head ml-5">Особенности приложения</h2>
          <img
            src={BackgroundFeatures}
            alt="Background Features"
            className="w-50"
          />
        </Container>
        <Container className="d-flex justify-content-around flex-wrap">
          <Card
            style={{ width: "20rem" }}
            className="border-0 shadow bg-body m-3"
          >
            <Card.Img variant="top" src={Words} />
            <Card.Body>
              <Card.Title className="">Слова и готовый фразы</Card.Title>
              <Card.Text>
                Расширяй свой словарный запас и учи популярные фразы. Они
                выручат в любой ситуации, помогут поддержать разговор, сделают
                речь живой и непринужденной.
              </Card.Text>
            </Card.Body>
          </Card>

          <Card
            style={{ width: "20rem" }}
            className="border-0 shadow bg-body m-3"
          >
            <Card.Img variant="top" src={Articles} />
            <Card.Body>
              <Card.Title className="">Рассказы и статьи</Card.Title>
              <Card.Text>
                Если вы регулярно читаете художественные произведения
                англоязычных писателей, вы осваиваете «правильный» английский
                язык, который отличается от разговорного.
              </Card.Text>
            </Card.Body>
          </Card>

          <Card
            style={{ width: "20rem" }}
            className="border-0 shadow bg-body m-3"
          >
            <Card.Img variant="top" src={Tests} />
            <Card.Body>
              <Card.Title className="">Тесты</Card.Title>
              <Card.Text>
                Тесты благоприятно влияют на быстрое изучение нового материала и
                закрепление уже пройденного, они могут заменить Вам учителя при
                изучении английского самостоятельно.
              </Card.Text>
            </Card.Body>
          </Card>
          <Card
            style={{ width: "20rem" }}
            className="border-0 shadow bg-body m-3"
          >
            <Card.Img variant="top" src={Games} />
            <Card.Body>
              <Card.Title className="">Мини-игры</Card.Title>
              <Card.Text>
                Игры помогут вам не просто приятно провести время, но и
                расширить словарный запас, подтянуть знание грамматики и
                правописание.
              </Card.Text>
            </Card.Body>
          </Card>
          <Card
            style={{ width: "20rem" }}
            className="border-0 shadow bg-body m-3"
          >
            <Card.Img variant="top" src={Progress} />
            <Card.Body>
              <Card.Title className="">Статистика прогресса</Card.Title>
              <Card.Text>
                Вне зависимости от того, играете ли вы или тренируете слова -
                статистика по изученным словам обновляется и всегда доступна в
                настройках.
              </Card.Text>
            </Card.Body>
          </Card>
        </Container>
      </Container>

      <Container id="video" className="bg-light mt-5 p-5 position-relative">
        <h2 className="teaching-head ml-5">Видео о работе приложения</h2>
        <Container className="w-75 mt-5">
          <img src={Video} alt="Video" className="w-100" />
        </Container>
      </Container>

      <Container id="team" className="mt-5">
        <h2 className="teaching-head ml-5 text-warning ">О команде</h2>
        <Container className="w-100 mt-5 d-flex flex-wrap justify-content-around">
          <a
            href="https://github.com/LexSava"
            target="_blank"
            rel="noopener noreferrer"
            className="text-dark m-3"
          >
            <div
              className="card mb-3 border-0 shadow"
              style={{ width: "30rem" }}
            >
              <div className="row g-0">
                <div className="col-md-4">
                  <img src={Ava_1} alt="..." className="w-100"></img>
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title"> Aliaksei Savastsyanau</h5>
                    <p className="card-text team-card-profession-text">
                      <small className="text-muted">Front-end Developer</small>
                    </p>
                    <p className="card-text">
                      This is a wider card with supporting text below as a
                      natural lead-in to additional content. This content is a
                      little bit longer.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </a>
          <a
            href="https://github.com/dzmitrynz"
            target="_blank"
            rel="noopener noreferrer"
            className="text-dark m-3"
          >
            <div
              className="card mb-3 border-0 shadow"
              style={{ width: "30rem" }}
            >
              <div className="row g-0">
                <div className="col-md-4">
                  <img src={Ava_2} alt="..." className="w-100"></img>
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">Mitry Nayezzhy</h5>
                    <p className="card-text team-card-profession-text">
                      <small className="text-muted">Front-end Developer</small>
                    </p>
                    <p className="card-text">
                      This is a wider card with supporting text below as a
                      natural lead-in to additional content. This content is a
                      little bit longer.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </a>
          <a
            href="https://github.com/ivanova-anastasia"
            target="_blank"
            rel="noopener noreferrer"
            className="text-dark m-3"
          >
            <div
              className="card mb-3 border-0 shadow"
              style={{ width: "30rem" }}
            >
              <div className="row g-0">
                <div className="col-md-4">
                  <img src={Ava_3} alt="..." className="w-100"></img>
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">Anastasiya Ivanova </h5>
                    <p className="card-text team-card-profession-text">
                      <small className="text-muted">Front-end Developer</small>
                    </p>
                    <p className="card-text">
                      This is a wider card with supporting text below as a
                      natural lead-in to additional content. This content is a
                      little bit longer.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </a>
          <a
            href="https://github.com/tomsonst"
            target="_blank"
            rel="noopener noreferrer"
            className="text-dark m-3 "
          >
            <div
              className="card mb-3 border-0 shadow"
              style={{ width: "30rem" }}
            >
              <div className="row g-0">
                <div className="col-md-4">
                  <img src={Ava_4} alt="..." className="w-100"></img>
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">Stas Tom</h5>
                    <p className="card-text team-card-profession-text">
                      <small className="text-muted">Front-end Developer</small>
                    </p>
                    <p className="card-text">
                      This is a wider card with supporting text below as a
                      natural lead-in to additional content. This content is a
                      little bit longer.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </a>
        </Container>
      </Container>

      <Container className="footer-block bg-warning text-dark p-3">
        <footer className="d-flex justify-content-between flex-wrap footer inline align-items-center">
          <Link to="/" className="link-logo-block text-primary">
            <h1 className="logo m-0 text-dark">RS Lang</h1>
          </Link>
          <a
            href="https://github.com/LexSava"
            target="_blank"
            rel="noopener noreferrer"
            className="text-dark footer-link-git ml-1 mr-1"
          >
            Aliaksei
          </a>
          <a
            href="https://github.com/dzmitrynz"
            target="_blank"
            rel="noopener noreferrer"
            className="text-dark footer-link-git ml-1 mr-1"
          >
            Mitry
          </a>
          <a
            href="https://github.com/ivanova-anastasia"
            target="_blank"
            rel="noopener noreferrer"
            className="text-dark footer-link-git ml-1 mr-1"
          >
            Anastasiya
          </a>
          <a
            href="https://github.com/tomsonst"
            target="_blank"
            rel="noopener noreferrer"
            className="text-dark footer-link-git ml-1 mr-1"
          >
            Stas
          </a>

          <div className="text-dark">
            <a
              className="rss"
              href="https://rs.school/js/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="rss-year">'21</span>
            </a>
          </div>
        </footer>
      </Container>
    </Container>
  );
};
export default HomePage;
