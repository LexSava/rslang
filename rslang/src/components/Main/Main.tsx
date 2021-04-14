import "bootstrap/dist/css/bootstrap.min.css";
import "./Main.scss";
import React, { useState, useEffect } from "react";
import Study from "../Study/Study";
import Vocabulary from "../Vocabulary/Vocabulary";
import Games from "../Games/Games";
import Statistics from "../Statistics/Statistics";
import Settings from "../Settings/Settings";
import { Route, Switch } from "react-router-dom";
import useLocalStorage from "../../hooks/useLocalStorage";
import getUserData from "../../api/getUserData";
import setUserData from "../../api/setUserData";
import getWords from "../../api/getWords";
import { url } from "../../api/defData";
import _ from "lodash";
import schedule from "node-schedule";

interface InterfaceMain {}

const Main: React.FC<InterfaceMain> = (props) => {
  const [words, setWords] = useState<any>([]);
  const [allStatistics, setAllStatistics] = useLocalStorage(
    "allStatistics",
    ""
  );
  const [learnedWords, setLearnedWords] = useLocalStorage("learnedWords", []);
  const [hardWords, setHardWords] = useLocalStorage("hardWords", "");
  const [deletedWords, setDeletedWords] = useLocalStorage("deletedWords", "");
  const [correctAnswer, setCorrectAnswer] = useLocalStorage("correctAnswer", 0);
  const [bestSeries, setBestSeries] = useLocalStorage("bestSeries", 0);
  const [learnedWordToday, setLearnedWordToday] = useLocalStorage(
    "learnedWordToday",
    []
  );
  const [sortingDeletedWords, setSortingDeletedWords] = useLocalStorage(
    "sortingDeletedWords",
    ""
  );

  const [graphStatisticsDaily, setGraphStatisticsDaily] = useLocalStorage(
    "graphStatisticsDaily",
    []
  );
  const [
    graphStatisticsAllProgress,
    setGraphStatisticsAllProgress,
  ] = useLocalStorage("graphStatisticsAllProgress", []);

  let [page, setPage] = useLocalStorage("page", 0);
  const urlWords = `https://rocky-basin-33827.herokuapp.com/words?page=${page}&group=0`;
  const token: any = localStorage.getItem("token");
  const userId: any = localStorage.getItem("userId");
  const tokenUse: any = JSON.parse(token);
  const Id: any = JSON.parse(userId);

  schedule.scheduleJob("59 23 * * *", () => {
    setLearnedWordToday([]);
    setPage(0);
    console.log("YES");
  });

  schedule.scheduleJob("58 23 * * *", () => {
    setGraphStatisticsDaily([...graphStatisticsDaily, learnedWordToday.length]);
    setGraphStatisticsAllProgress([
      ...graphStatisticsAllProgress,
      learnedWords.length,
    ]);
  });

  useEffect(() => {
    if (learnedWordToday.length / 20 === page + 1) {
      setPage(++page);
    }
  }, [learnedWordToday]);

  // schedule.scheduleJob("0 * * * * *", () => {
  //   // setGraphStatisticsDaily([]);
  //   // setLearnedWordToday([]);
  //   setGraphStatisticsDaily([...graphStatisticsDaily, learnedWordToday.length]);
  //   setGraphStatisticsAllProgress([
  //     ...graphStatisticsAllProgress,
  //     learnedWords.length,
  //   ]);
  // });

  // schedule.scheduleJob("0 * * * * *", () => {
  //   setLearnedWordToday([]);
  //   setPage(0);
  //   console.log("YES");
  // });

  async function setUserStatistics() {
    if (tokenUse && Id) {
      const newStatistics = {
        vocabulary: {
          learnedWords: learnedWords.length,
          correctAnswer: correctAnswer,
          bestSeries: bestSeries,
          learnedWordToday: learnedWordToday.length,
          graphStatisticsDaily: graphStatisticsDaily,
          graphStatisticsAllProgress: graphStatisticsAllProgress,
        },
      };
      const fullUrl = `${url}users/${Id}/statistics`;
      const bearerToken = tokenUse;
      await setUserData(fullUrl, bearerToken, newStatistics)
        .then((responseData: any) => {})
        .catch((error) => {
          console.log(error.message);
        });
    }
  }

  useEffect(() => {
    setUserStatistics();
  }, [
    learnedWords,
    hardWords,
    deletedWords,
    correctAnswer,
    bestSeries,
    sortingDeletedWords,
    graphStatisticsDaily,
    learnedWordToday,
    graphStatisticsAllProgress,
  ]);

  async function getStatistic(url: string, bearerToken: string) {
    const fullUrl = `${url}users/${Id}/statistics`;
    await getUserData(fullUrl, bearerToken)
      .then((responseData: any) => {
        setAllStatistics(responseData);
        console.log(responseData);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  useEffect(() => {
    getStatistic(url, tokenUse);
  }, [
    learnedWords,
    hardWords,
    deletedWords,
    correctAnswer,
    bestSeries,
    sortingDeletedWords,
  ]);

  async function getData(url: string, pref: string) {
    const fullUrl = urlWords + pref;
    const data: any = await getWords(fullUrl);
    setWords(data);
  }

  useEffect(() => {
    getData(url, "");
  }, [page]);

  useEffect(() => {
    setSortingDeletedWords(
      _.differenceWith(learnedWords, deletedWords, _.isEqual)
    );
  }, [learnedWords, deletedWords]);

  const getHardWords = (arr: any) => {
    setHardWords(_.uniqWith(hardWords.concat(arr), _.isEqual));
  };

  const getLearnedWords = (arr: any) => {
    setLearnedWords(_.uniqWith(learnedWords.concat(arr), _.isEqual));
  };

  const getLearnedWordToday = (arr: any) => {
    setLearnedWordToday(_.uniqWith(learnedWordToday.concat(arr), _.isEqual));
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
          learnedWordToday={learnedWordToday}
          page={page}
          getHardWords={getHardWords}
          getLearnedWords={getLearnedWords}
          getDeletedWords={getDeletedWords}
          getCorrectAnswer={getCorrectAnswer}
          getBestSeries={getBestSeries}
          getLearnedWordToday={getLearnedWordToday}
        />
      </Route>
      <Route path="/tutorial-page/vocabulary">
        <Vocabulary
          hardWords={hardWords}
          deletedWords={deletedWords}
          learnedWords={learnedWords}
          sortingDeletedWords={sortingDeletedWords}
          getHardWords={getHardWords}
          getLearnedWords={getLearnedWords}
          getDeletedWords={getDeletedWords}
        />
      </Route>
      <Route path="/tutorial-page/games">
        <Games />
      </Route>
      <Route path="/tutorial-page/statistics">
        <Statistics allStatistics={allStatistics} />
      </Route>
      <Route path="/tutorial-page/settings">
        <Settings />
      </Route>
    </Switch>
  );
};
export default Main;
