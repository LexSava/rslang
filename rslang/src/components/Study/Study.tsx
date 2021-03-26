import "bootstrap/dist/css/bootstrap.min.css";
import "./Study.scss";
import React from "react";
import { Container, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import NewWords from "../../assets/img/new_words.jpg";
import RepeatWords from "../../assets/img/repeat_words.jpg";
import HardWords from "../../assets/img/hard_words.jpg";
interface InterfaceStudy {}

const Study: React.FC<InterfaceStudy> = (props) => {
  return (
    <Container className="p-0 border border-top-0">
      <Container className="study-page-head-block bg-light d-flex flex-wrap">
        <h2 className="study-page-head p-3 text-warning">Привет.</h2>
        <h2 className="study-page-head p-3 text-dark">Приступим к обучению!</h2>
      </Container>
      <p className="study-page-head-text p-4">
        На этой странице вы можете следить за своим прогрессом и выбирать
        желаемый набор слов для изучения, например,{" "}
        <strong>“Новые слова”</strong> , <strong>“Повторить слова” </strong>
        или <strong>“Сложные слова”</strong> . Удачи!
      </p>
      <Container className="d-flex flex-wrap align-items-center justify-content-around">
        <h3 className="study-page-head m-0">Сегодня изучено</h3>
        <p className="study-page-head-text m-0">
          Сегодня изучено: 0 из 20 слов
        </p>
      </Container>
      <Container className="d-flex justify-content-around flex-wrap mt-4 p-5 bg-light">
        <Card
          style={{ width: "20rem" }}
          className="border-0 shadow bg-body m-3"
        >
          <Card.Img variant="top" src={NewWords} />
          <Card.Body>
            <Card.Title className="">Новые слова</Card.Title>
            <Card.Text>
              Нажмите, чтобы выучить новые слова на сегодня.
            </Card.Text>
            <Button variant="primary">Начать</Button>
          </Card.Body>
        </Card>
        <Card
          style={{ width: "20rem" }}
          className="border-0 shadow bg-body m-3"
        >
          <Card.Img variant="top" src={HardWords} />
          <Card.Body>
            <Card.Title className="">Повторить слова</Card.Title>
            <Card.Text>Нажмите, чтобы повторить выученные слова.</Card.Text>
            <Button variant="primary">Начать</Button>
          </Card.Body>
        </Card>

        <Card
          style={{ width: "20rem" }}
          className="border-0 shadow bg-body m-3"
        >
          <Card.Img variant="top" src={RepeatWords} />
          <Card.Body>
            <Card.Title className="">Сложные слова</Card.Title>
            <Card.Text>Нажмите, чтобы повторить сложные слова.</Card.Text>
            <Button variant="primary">Начать</Button>
          </Card.Body>
        </Card>
      </Container>
    </Container>
  );
};
export default Study;