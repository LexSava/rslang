import "bootstrap/dist/css/bootstrap.min.css";
import "./Games.scss";
import React from "react";
import { Container } from "react-bootstrap";
interface InterfaceGames {}

const Games: React.FC<InterfaceGames> = (props) => {
  return (
    <Container className="min-vh-100 p-0 border border-top-0">
      <Container className="study-page-head-block bg-light">
        <h2 className="study-page-head-text p-3">Мини-игры</h2>
      </Container>
    </Container>
  );
};
export default Games;
