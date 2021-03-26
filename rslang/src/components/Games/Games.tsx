import "bootstrap/dist/css/bootstrap.min.css";
import "./Games.scss";
import React from "react";
import { Container, Card, Button } from "react-bootstrap";
import Sprint from "../../assets/img/sprint.png";
import Puzzle from "../../assets/img/puzzle.png";
import Call from "../../assets/img/call.png";
import OurGame from "../../assets/img/our-game.png";
import Savanna from "../../assets/img/savanna.png";
import SpeakIt from "../../assets/img/speak-it.png";
interface InterfaceGames {}

const Games: React.FC<InterfaceGames> = (props) => {
  return (
    <Container className="min-vh-100 p-0 border border-top-0">
        <Container className="d-flex justify-content-around flex-wrap mt-4 p-5 bg-light">
        <Card
          style={{ width: "20rem" }}
          className="border-0 shadow bg-body m-3 card-mini-game card-mini-game-1"
        >
          <Card.Img variant="top" className="img-mini-game" src={SpeakIt} />
          <Card.Body>
            <Card.Title className="text-mini-game">Скажи это</Card.Title>
            <Button className="btn-mini-game">Играть</Button>
          </Card.Body>
        </Card>
        <Card
          style={{ width: "20rem" }}
          className="border-0 shadow bg-body m-3 card-mini-game card-mini-game-2"
        >
          <Card.Img variant="top" className="img-mini-game" src={Puzzle} />
          <Card.Body>
            <Card.Title className="text-mini-game">Паззл</Card.Title>
            <Button className="btn-mini-game">Играть</Button>
          </Card.Body>
        </Card>
        <Card
          style={{ width: "20rem" }}
          className="border-0 shadow bg-body m-3 card-mini-game card-mini-game-3"
        >
          <Card.Img variant="top" className="img-mini-game" src={Savanna} />
          <Card.Body>
            <Card.Title className="text-mini-game">Саванна</Card.Title>
            <Button className="btn-mini-game">Играть</Button>
          </Card.Body>
        </Card>
        <Card
          style={{ width: "20rem" }}
          className="border-0 shadow bg-body m-3 card-mini-game card-mini-game-4"
        >
          <Card.Img variant="top" className="img-mini-game" src={Call} />
          <Card.Body>
            <Card.Title className="text-mini-game">Аудиовызов</Card.Title>
            <Button className="btn-mini-game">Играть</Button>
          </Card.Body>
        </Card>
        <Card
          style={{ width: "20rem" }}
          className="border-0 shadow bg-body m-3 card-mini-game card-mini-game-5"
        >
          <Card.Img variant="top" className="img-mini-game" src={Sprint} />
          <Card.Body>
            <Card.Title className="text-mini-game">Спринт</Card.Title>
            <Button className="btn-mini-game">Играть</Button>
          </Card.Body>
        </Card>
        <Card
          style={{ width: "20rem" }}
          className="border-0 shadow bg-body m-3 card-mini-game card-mini-game-6"
        >
          <Card.Img variant="top" className="img-mini-game" src={OurGame} />
          <Card.Body>
            <Card.Title className="text-mini-game">Наша игра</Card.Title>
            <Button className="btn-mini-game">Играть</Button>
          </Card.Body>
        </Card>
      </Container>
    </Container>
  );
};
export default Games;
