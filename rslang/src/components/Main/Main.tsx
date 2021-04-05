import "bootstrap/dist/css/bootstrap.min.css";
import "./Main.scss";
import React, { useState, useEffect } from "react";
import Study from "../Study/Study";
import Vocabulary from "../Vocabulary/Vocabulary";
import Games from "../Games/Games";
import Statistics from "../Statistics/Statistics";
import Settings from "../Settings/Settings";
import { Route, Switch } from "react-router-dom";
import getWords from "../../api/getWords";
import setUserData from "../../api/setUserData";
import useLocalStorage from "../../hooks/useLocalStorage";

import _ from "lodash";

const url = `https://serene-falls-78086.herokuapp.com/words`;

interface InterfaceMain {}

const Main: React.FC<InterfaceMain> = (props) => {
  const [words, setWords] = useState<any>([]);
  const [statistics, setStatistics] = useState<any>([]);
  const [learnedWords, setLearnedWords] = useLocalStorage("learnedWords", "");
  const [hardWords, setHardWords] = useLocalStorage("hardWords", "");
  const [deletedWords, setDeletedWords] = useLocalStorage("deletedWords", "");
  const [correctAnswer, setCorrectAnswer] = useLocalStorage(
    "correctAnswer",
    ""
  );
  const [bestSeries, setBestSeries] = useLocalStorage("bestSeries", "");

  async function getData(url: string, pref: string) {
    const fullUrl = url + pref;
    const data: any = await getWords(fullUrl);
    setWords(data);
  }
  useEffect(() => {
    getData(url, "");
  }, []);

  useEffect(() => {
    console.log(statistics);
  }, [statistics]);

  const getHardWords = (arr: any) => {
    setHardWords(_.uniqWith(hardWords.concat(arr), _.isEqual));
  };
  const getLearnedWords = (arr: any) => {
    setLearnedWords(_.uniqWith(learnedWords.concat(arr), _.isEqual));
  };
  const getDeletedWords = (arr: any) => {
    setDeletedWords(_.uniqWith(deletedWords.concat(arr), _.isEqual));
  };
  const getCorrectAnswer = (arr: any) => {
    setCorrectAnswer(arr);
  };
  const getBestSeries = (arr: any) => {
    if (arr > bestSeries) {
      setBestSeries(arr);
    }
  };

  return (
    <Switch>
      <Route exact path="/tutorial-page">
        <Study
          words={words}
          hardWords={hardWords}
          deletedWords={deletedWords}
          learnedWords={learnedWords}
          getHardWords={getHardWords}
          getLearnedWords={getLearnedWords}
          getDeletedWords={getDeletedWords}
          getCorrectAnswer={getCorrectAnswer}
          getBestSeries={getBestSeries}
        />
      </Route>
      <Route path="/tutorial-page/vocabulary">
        <Vocabulary
          hardWords={hardWords}
          learnedWords={learnedWords}
          deletedWords={deletedWords}
          getHardWords={getHardWords}
          getLearnedWords={getLearnedWords}
          getDeletedWords={getDeletedWords}
        />
      </Route>
      <Route path="/tutorial-page/games">
        <Games />
      </Route>
      <Route path="/tutorial-page/statistics">
        <Statistics
          learnedWords={learnedWords}
          correctAnswer={correctAnswer}
          bestSeries={bestSeries}
        />
      </Route>
      <Route path="/tutorial-page/settings">
        <Settings />
      </Route>
    </Switch>
  );
};
export default Main;
