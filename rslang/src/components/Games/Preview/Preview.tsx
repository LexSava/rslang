import "bootstrap/dist/css/bootstrap.min.css";
import "./Preview.scss";
import React, { useState } from "react";
import { Jumbotron, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import Rating from "react-rating";

type PreviewProps = {
  backgroundImg: any;
  heading: string;
  description: string;
  level: number | null;
  setUserWords: (words: any) => void;
};

const Preview = ({
  backgroundImg,
  heading,
  description,
  level,
  setUserWords,
}: PreviewProps) => {
  const [levelRating, setLevelRating] = useState(level || 0);

  const onStarRatingPress = (newLevel: any) => {
    setLevelRating(newLevel);
  };

  const uploadWords = () => {
    //TODO: add api call for getting words by levelRating
    setUserWords("in progress...");
  };

  const startBtn =
    levelRating === 0 ? (
      <OverlayTrigger
        overlay={
          <Tooltip id="tooltip-disabled">
            Для продолжения требуется выбрать уровень сложности
          </Tooltip>
        }
      >
        <span className="d-inline-block">
          <Button disabled style={{ pointerEvents: "none" }}>
            Начать
          </Button>
        </span>
      </OverlayTrigger>
    ) : (
      <Button variant="primary" onClick={uploadWords}>
        Начать
      </Button>
    );

  return (
    <div
      className="preview"
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
      <Jumbotron
        className="preview__jumbotron"
        style={{ background: "rgba(0, 0, 0, 0.5)" }}
      >
        <h1 className="preview__jumbotron__heading">{heading}</h1>
        <p className="preview__jumbotron__description">{description}</p>
        <p className="preview__jumbotron__level">
          <span className="preview__jumbotron__level__title">
            Уровень сложности
          </span>
          <Rating
            stop={6}
            initialRating={levelRating}
            onClick={onStarRatingPress}
          />
        </p>
        <p>{startBtn}</p>
      </Jumbotron>
    </div>
  );
};

export default Preview;
