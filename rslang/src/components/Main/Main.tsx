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
import useLocalStorage from "../../hooks/useLocalStorage";

import _ from "lodash";

const url = `https://serene-falls-78086.herokuapp.com/words`;

interface InterfaceMain {}

const Main: React.FC<InterfaceMain> = (props) => {
  const [words, setWords] = useState<any>([]);
  const [hardWords, setHardWords] = useState<any>([]);
  const [learnedWords, setLearnedWords] = useState<any>([]);

  async function getData(url: string, pref: string) {
    const fullUrl = url + pref;
    const data: any = await getWords(fullUrl);
    setWords(data);
  }
  useEffect(() => {
    getData(url, "");
  }, []);

  useEffect(() => {
    console.log(hardWords);
    console.log(learnedWords);
  }, [hardWords, learnedWords]);

  const getHardWords = (arr: any) => {
    setHardWords(_.uniqWith(hardWords.concat(arr), _.isEqual));
  };
  const getLearnedWords = (arr: any) => {
    setLearnedWords(_.uniqWith(learnedWords.concat(arr), _.isEqual));
  };

  return (
    <Switch>
      <Route exact path="/tutorial-page">
        <Study
          words={words}
          hardWords={hardWords}
          learnedWords={learnedWords}
          getHardWords={getHardWords}
          getLearnedWords={getLearnedWords}
        />
      </Route>
      <Route path="/tutorial-page/vocabulary">
        <Vocabulary />
      </Route>
      <Route path="/tutorial-page/games">
        <Games />
      </Route>
      <Route path="/tutorial-page/statistics">
        <Statistics />
      </Route>
      <Route path="/tutorial-page/settings">
        <Settings />
      </Route>
    </Switch>
  );
};
export default Main;
