import "bootstrap/dist/css/bootstrap.min.css";
import "./AudioCall.scss";
import React, { useState, useEffect } from "react";
import { VolumeUp, CheckCircleFill, ArrowRight } from "react-bootstrap-icons";
import { Button, Image, ProgressBar } from "react-bootstrap";

import FullScreenWrapper from "./../../FullScreenWrapper/FullScreenWrapper";
import Preview from "./../Preview/Preview";
import RioImg from "../../../assets/img/games/audio_rio.jpg";
import { url, numOfPages } from "../../../api/defData";
import { playAudioWord, playAudio } from "../../../utils/AudioWord";
import getWords from "../../../api/getWords";

const correctAudio = require("./../../../assets/audio/correct.mp3");
const errorAudio = require("./../../../assets/audio/error.mp3");

const PREVIEW_HEADING = "Аудиовызов";
const PREVIEW__DESCRIPTION =
  "Ты слышишь слово и видишь 5 вариантов его перевода. При этом не видишь, как это слово пишется по-английски. Твоя задача выбрать правильный перевод озвученного слова.";

type WordType = {
  id: string;
  word: string;
  wordTranslate: string;
  image: string;
  audio: string;
};

type WordGameType = {
  word: WordType;
  isCorrect: boolean | null;
  isPassed: boolean;
  selectedWord: string | null;
  displayedWords: string[];
};

const keyMap = {
  FIRST_WORD: "1",
  SECOND_WORD: "2",
};

const AudioCall = () => {
  const [words, setWords] = useState<WordGameType[] | null>(null);
  const currentWord: WordGameType | undefined = words?.find(
    (word) => word.isPassed === false
  );

  const level = null; //TODO: get level from book page

  const setUserWords = (words: WordType[]) => {
    const gameWords: WordGameType[] = mapWordsToWordsGameType(words);
    uploadFakeWords(gameWords);
  };

  const uploadFakeWords = async (gameWords: WordGameType[]): Promise<void> => {
    const randPage = Math.floor(Math.random() * numOfPages);
    const levelRating = Math.floor(Math.random() * 6);
    const fullUrl = `${url}words?page=${randPage}&group=${levelRating}`;
    getWords(fullUrl)
      .then((wordsData: any) => {
        gameWords.map((gameWord) => {
          const fakeWords = [
            ...getRandomFourWords(wordsData),
            gameWord.word.wordTranslate,
          ];
          gameWord.displayedWords = fakeWords.sort(() => 0.5 - Math.random());
          return gameWord;
        });
        setWords(gameWords);
        playAudioWord(gameWords[0].word.audio);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const setDefeatWord = () => {
    saveAnswer(false, null);
  };

  const setAnswerWord = (selectedWord: any) => {
    if (currentWord?.isCorrect !== null) return;
    const isWin = selectedWord === currentWord?.word.wordTranslate;
    saveAnswer(isWin, selectedWord);
  };

  const saveAnswer = (isCorrect: boolean, selectedWord: string | null): any => {
    if (typeof words === undefined || words === null) return;
    const updatedWords: WordGameType[] = words.map((oldWord: WordGameType) => {
      if (oldWord.word.word === currentWord?.word.word) {
        oldWord.isCorrect = isCorrect;
        oldWord.selectedWord = selectedWord;
      }
      return oldWord;
    });
    setWords(updatedWords);
    if (isCorrect) {
      playAudio(correctAudio.default);
    } else {
      playAudio(errorAudio.default);
    }
  };

  useEffect(() => {
    const handleUserKeyPress = (e: any) => {
      switch (e.code) {
        case "Digit1": {
          setAnswerWord(currentWord?.displayedWords[0]);
          break;
        }
        case "Digit2": {
          setAnswerWord(currentWord?.displayedWords[1]);
          break;
        }
        case "Digit3": {
          setAnswerWord(currentWord?.displayedWords[2]);
          break;
        }
        case "Digit4": {
          setAnswerWord(currentWord?.displayedWords[3]);
          break;
        }
        case "Digit5": {
          setAnswerWord(currentWord?.displayedWords[4]);
          break;
        }
        case "Enter": {
          if (currentWord?.isCorrect === null) {
            setDefeatWord();
          } else {
            switchNextWord();
          }
          break;
        }
        case "Space": {
          if (currentWord) playAudioWord(currentWord.word.audio);
          break;
        }
        default:
          console.log(`${e.code} isn't supported for AudioCall game.`);
      }
    };

    window.addEventListener("keydown", handleUserKeyPress);

    return () => {
      window.removeEventListener("keydown", handleUserKeyPress);
    };
  }, [words]);

  const switchNextWord = () => {
    if (typeof words === undefined || words === null) return;
    let wordIndex: number = 0;
    const updatedWords: WordGameType[] = words.map(
      (oldWord: WordGameType, index: number) => {
        if (oldWord.word.word === currentWord?.word.word) {
          oldWord.isPassed = true;
          wordIndex = index;
        }
        return oldWord;
      }
    );
    setWords(updatedWords);

    if (words[wordIndex + 1]) {
      playAudioWord(words[wordIndex + 1].word.audio);
    } else {
      console.log("end of the game!");
    }
  };

  const getProgress = () => {
    const currentIndex = words?.indexOf(currentWord!);
    return (currentIndex! / words!.length) * 100;
  };

  const defineGameScene = () => {
    if (words === null) {
      return (
        <Preview
          heading={PREVIEW_HEADING}
          description={PREVIEW__DESCRIPTION}
          backgroundImg={RioImg}
          level={level}
          setUserWords={setUserWords}
        />
      );
    } else if (currentWord === undefined) {
      return null; //TODO: end of the game
    } else {
      return (
        <div className="audio-call-game">
          <ProgressBar variant="ProgressBar" now={getProgress()} />
          <div className="audio-call-game__wrapper">
            {currentWord.isCorrect === null ? (
              <TaskMode
                currentWord={currentWord}
                setDefeatWord={setDefeatWord}
                setAnswerWord={setAnswerWord}
              />
            ) : (
              <AnswerMode
                currentWord={currentWord}
                switchNextWord={switchNextWord}
                setAnswerWord={setAnswerWord}
              />
            )}
          </div>
        </div>
      );
    }
  };

  const gameScene = defineGameScene();

  return (
    <div className="audio-call">
      <FullScreenWrapper>{gameScene}</FullScreenWrapper>
    </div>
  );
};

const TaskMode = ({ currentWord, setDefeatWord, setAnswerWord }: any) => {
  return (
    <React.Fragment>
      <AudioElement isAnswer={false} currentWord={currentWord} />
      <WordsElement currentWord={currentWord} setAnswerWord={setAnswerWord} />
      <Button
        onClick={setDefeatWord}
        className="audio-call__answer-btn"
        variant="outline-light"
      >
        НЕ ЗНАЮ
      </Button>
    </React.Fragment>
  );
};

const AnswerMode = ({ currentWord, switchNextWord, setAnswerWord }: any) => {
  return (
    <React.Fragment>
      <Image
        className="audio-call__image"
        src={url + currentWord.word.image}
        roundedCircle={true}
      />
      <div className="audio-call__answer">
        <AudioElement isAnswer={true} currentWord={currentWord} />
        <span className="audio-call__answer-word">{currentWord.word.word}</span>
      </div>

      <WordsElement currentWord={currentWord} setAnswerWord={setAnswerWord} />
      <Button
        onClick={switchNextWord}
        className="audio-call__answer-btn"
        variant="outline-light"
      >
        <ArrowRight />
      </Button>
    </React.Fragment>
  );
};

const AudioElement = ({ isAnswer, currentWord }: any) => {
  const listenWord = () => {
    if (currentWord) playAudioWord(currentWord.word.audio);
  };

  const volumeUpIconClass = isAnswer
    ? "audio-call__listen-btn_icon"
    : "audio-call__listen-btn_icon_big";
  return (
    <Button
      variant="light"
      className="audio-call__listen-btn"
      onClick={listenWord}
    >
      <VolumeUp className={volumeUpIconClass} />
    </Button>
  );
};

const WordsElement = ({ currentWord, setAnswerWord }: any) => {
  const wordElements = currentWord?.displayedWords.map(
    (word: string, index: number) => {
      let wordClasses = "audio-call__words__word_text";
      let indexElement: number | null = index + 1;
      if (currentWord.isCorrect !== null) {
        if (currentWord.word.wordTranslate === word) {
          if (currentWord.isCorrect) {
            indexElement = null;
          }
        } else {
          wordClasses += "_inactive";
          if (currentWord.selectedWord === word) {
            wordClasses += " audio-call__words__word_text_crossed";
          }
        }
      }
      let wordWrapperClasses = "audio-call__words__word";
      if (currentWord.isCorrect === null) {
        wordWrapperClasses += " audio-call__words__word_active";
      }
      return (
        <div
          className={wordWrapperClasses}
          onClick={(e) =>
            setAnswerWord(e.currentTarget.lastElementChild!.textContent)
          }
          key={index}
        >
          <span className="audio-call__words__word_index">
            {indexElement ? (
              indexElement
            ) : (
              <CheckCircleFill className="audio-call__words__word_index_icon" />
            )}
          </span>
          <span className={wordClasses}>{word}</span>
        </div>
      );
    }
  );

  return <div className="audio-call__words">{wordElements}</div>;
};

const getRandomFourWords = (wordArr: WordType[]) => {
  const shuffled = wordArr.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 4).map((shuffledWord) => shuffledWord.wordTranslate);
};

const mapWordsToWordsGameType = (words: WordType[]): WordGameType[] => {
  return words.map((word: WordType) => {
    return { word: word, isCorrect: null, isPassed: false } as WordGameType;
  });
};

export default AudioCall;
