import "bootstrap/dist/css/bootstrap.min.css";
import "./AudioCall.scss";
import React, { useState } from "react";
import { VolumeUp } from "react-bootstrap-icons";
import { Button } from "react-bootstrap";

import FullScreenWrapper from "./../../FullScreenWrapper/FullScreenWrapper";
import Preview from "./../Preview/Preview";
import RioImg from "../../../assets/img/games/audio_rio.jpg";

const PREVIEW_HEADING = "Аудиовызов";
const PREVIEW__DESCRIPTION =
  "Ты слышишь слово и видишь 5 вариантов его перевода. При этом не видишь, как это слово пишется по-английски. Твоя задача выбрать правильный перевод озвученного слова.";

const AudioCall = () => {
  const [words, setWords] = useState(null);
  const level = null; //TODO: get level from book page

  const setUserWords = (words: any) => {
    setWords(words);
    console.log(words);
  };

  return (
    <div className="audio-call">
      <FullScreenWrapper>
        {words === null ? (
          <Preview
            heading={PREVIEW_HEADING}
            description={PREVIEW__DESCRIPTION}
            backgroundImg={RioImg}
            level={level}
            setUserWords={setUserWords}
          />
        ) : (
          <div className="audio-call-game">
            <div className="audio-call-game__wrapper">
              <Button className="audio-call__listen-btn">
                <VolumeUp className="audio-call__listen-btn_icon" />
              </Button>
            </div>
          </div>
        )}
      </FullScreenWrapper>
    </div>
  );
};

export default AudioCall;
