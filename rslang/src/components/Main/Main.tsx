import "bootstrap/dist/css/bootstrap.min.css";
import "./Main.scss";
import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

interface HeaderMain {}

const Main: React.FC<HeaderMain> = (props) => {
  return <Container>Привет это основная страница</Container>;
};
export default Main;
