import "bootstrap/dist/css/bootstrap.min.css";
import "./Results.scss";

import React, { useState } from "react";
import { Button } from "react-bootstrap";
import GaugeChart from "react-gauge-chart";
import { Link } from "react-router-dom";

type ResultsProps = {
  correctWords: string[];
  wrongWords: string[];
  continueGame: () => void;
};

const Results = ({ correctWords, wrongWords, continueGame }: ResultsProps) => {
  const [isOverviewMode, setIsOverviewMode] = useState(true);

  const toggleOverviewMode = () => {
    const currentState = isOverviewMode;
    setIsOverviewMode(!currentState);
  };
  const percent =
    correctWords.length / (correctWords.length + wrongWords.length);

  const dotClass = "results__tabs-control__dot";
  const dotClassActive = dotClass + " results__tabs-control__dot-active";

  const correctWordElements = correctWords.map((word, index) => (
    <p className="words-info__words" key={index}>
      {word}
    </p>
  ));
  const wrongWordElements = wrongWords.map((word, index) => (
    <p className="words-info__words" key={index}>
      {word}
    </p>
  ));

  return (
    <div className="results">
      <p className="results__final-tittle">
        Неплохо, но есть над чем поработать
      </p>
      <div className="results__info">
        {isOverviewMode ? (
          <div className="fullness">
            <p className="fullness__link" onClick={toggleOverviewMode}>
              {correctWords.length} слов изучено, {wrongWords.length} на
              изучении
            </p>
            <GaugeChart
              id="gauge-chart3"
              nrOfLevels={30}
              colors={["#FF5F6D", "#FFC371"]}
              arcWidth={0.3}
              percent={percent}
              textColor="black"
              needleColor="rgba(37, 130, 231, 0.4)"
            />
          </div>
        ) : (
          <div className="words-info">
            <p className="words-info__wrong">ОШИБОК: {wrongWords.length}</p>
            {wrongWordElements}
            <hr className="words-info__divider"></hr>
            <p className="words-info__correct">ЗНАЮ: {correctWords.length}</p>
            {correctWordElements}
          </div>
        )}
      </div>
      <div className="results__tabs-control">
        <div
          className={isOverviewMode ? dotClassActive : dotClass}
          onClick={toggleOverviewMode}
        ></div>
        <div
          className={isOverviewMode ? dotClass : dotClassActive}
          onClick={toggleOverviewMode}
        ></div>
      </div>
      <Button
        className="results__continue_btn"
        variant="info"
        onClick={continueGame}
      >
        Продолжить тренировку
      </Button>
      <Link to="/tutorial-page/games">
        <p className="results__list-games">К списку тренировок</p>
      </Link>
    </div>
  );
};

export default Results;
