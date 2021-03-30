import "bootstrap/dist/css/bootstrap.min.css";
import "./Games.scss";
import React from "react";
import { Route, Switch } from "react-router-dom";
import { Link } from "react-router-dom";
import { Container, Card, Button } from "react-bootstrap";
import Sprint from "../../assets/img/sprint.png";
import Puzzle from "../../assets/img/puzzle.png";
import Call from "../../assets/img/call.png";
import OurGame from "../../assets/img/our-game.png";
import Savanna from "../../assets/img/savanna.png";
import SpeakIt from "../../assets/img/speak-it.png";

import AudioCall from "./AudioCall/AudioCall";

interface InterfaceGames {}

type GameCardType = {
  name: string;
  image: any;
  url: string;
  styleClass: string;
};

const Games: React.FC<InterfaceGames> = (props) => {
  const basePathName = "/tutorial-page/games";
  const gameCards: GameCardType[] = [
    {
      name: "Скажи это",
      image: SpeakIt,
      url: "speak-it",
      styleClass: "card-mini-game-1",
    },
    {
      name: "Паззл",
      image: Puzzle,
      url: "puzzle",
      styleClass: "card-mini-game-2",
    },
    {
      name: "Саванна",
      image: Savanna,
      url: "savanna",
      styleClass: "card-mini-game-3",
    },
    {
      name: "Аудиовызов",
      image: Call,
      url: "call",
      styleClass: "card-mini-game-4",
    },
    {
      name: "Спринт",
      image: Sprint,
      url: "sprint",
      styleClass: "card-mini-game-5",
    },
    {
      name: "Наша игра",
      image: OurGame,
      url: "our-game",
      styleClass: "card-mini-game-6",
    },
  ];

  const gameCardElements = gameCards.map((card, index) => {
    const styleClasses = `border-0 shadow bg-body m-3 card-mini-game ${card.styleClass}`;
    return (
      <Link to={`${basePathName}/${card.url}`} key={index}>
        <Card style={{ width: "20rem" }} className={styleClasses}>
          <Card.Img variant="top" className="img-mini-game" src={card.image} />
          <Card.Body>
            <Card.Title className="text-mini-game">{card.name}</Card.Title>
            <Button className="btn-mini-game">Играть</Button>
          </Card.Body>
        </Card>
      </Link>
    );
  });

  return (
    <Container className="min-vh-100 p-0 border border-top-0">
      <Container className="d-flex justify-content-around flex-wrap mt-4 p-5 bg-light">
        <Switch>
          <Route path={`${basePathName}/speak-it`}>
            <AudioCall />
          </Route>
          <Route path={basePathName}>{gameCardElements}</Route>
        </Switch>
      </Container>
    </Container>
  );
};
export default Games;
