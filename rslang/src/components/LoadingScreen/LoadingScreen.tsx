import "bootstrap/dist/css/bootstrap.min.css";
import "./LoadingScreen.scss";
import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

interface HeaderLoadingScreen {}

const LoadingScreen: React.FC<HeaderLoadingScreen> = (props) => {
  return (
    <Container>
      <div className="container">
        <div className="loader">
          <div className="loader--dot"></div>
          <div className="loader--dot"></div>
          <div className="loader--dot"></div>
          <div className="loader--dot"></div>
          <div className="loader--dot"></div>
          <div className="loader--dot"></div>
          <div className="loader--text"></div>
        </div>
      </div>
    </Container>
  );
};
export default LoadingScreen;
