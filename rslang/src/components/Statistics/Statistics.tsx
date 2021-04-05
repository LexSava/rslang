import "bootstrap/dist/css/bootstrap.min.css";
import "./Statistics.scss";
import React, { useState, useEffect } from "react";
import { Container, Table } from "react-bootstrap";
import getUserData from "../../api/getUserData";
import useLocalStorage from "../../hooks/useLocalStorage";
import { url } from "../../api/defData";
import { Bar, Line } from "react-chartjs-2";

interface InterfaceStatistics {
  learnedWords: any;
  correctAnswer: number;
  bestSeries: number;
}
interface dataInterface {
  id: string;
}

const Statistics: React.FC<InterfaceStatistics> = (props) => {
  const [userId, setUserId] = useLocalStorage("userId", "");
  const [token, setToken] = useLocalStorage("token", "");
  const [username, setUserName] = useLocalStorage("username", "");
  const [userpic, setUserPic] = useLocalStorage("userpic", "");
  const [statistics, setStatistics] = useLocalStorage("statistics", {});
  const [allWords, setAllWord] = useState<any>(props.learnedWords);
  const [barData, setBarData] = useState<any>({});
  const [lineData, setLineData] = useState<any>({});
  const [wordsLearnedToday, setWordsLearnedToday] = useState<any>([]);
  const [arrWordsLearnedToday, setArrWordsLearnedToday] = useLocalStorage(
    "arrWordsLearnedToday",
    ""
  );

  const ARRAY_OF_DATES: any = [];
  const D = new Date("04/04/2021");
  const Till = new Date();

  function pad(s: any) {
    return `00${s}`.slice(-2);
  }

  useEffect(() => {
    while (D.getTime() < Till.getTime()) {
      ARRAY_OF_DATES.push(
        `${D.getFullYear()}-${pad(D.getMonth() + 1)}-${pad(D.getDate())}`
      );
      D.setDate(D.getDate() + 1);
    }
  }, [Till]);

  useEffect(() => {
    setWordsLearnedToday(
      (wordsLearnedToday[ARRAY_OF_DATES.length - 1] = props.learnedWords.length)
    );
  }, [props.learnedWords]);

  useEffect(() => {
    setArrWordsLearnedToday(wordsLearnedToday);
    console.log(arrWordsLearnedToday);
  }, [wordsLearnedToday]);

  useEffect(() => {
    setLineData({
      labels: ARRAY_OF_DATES,
      datasets: [
        {
          label: "Выучено слов",
          data: wordsLearnedToday,
          backgroundColor: ["rgba(54, 162, 235, 0.6)"],
          borderWidth: 5,
        },
      ],
    });
  }, [props.learnedWords]);

  useEffect(() => {
    setBarData({
      labels: ARRAY_OF_DATES,
      datasets: [
        {
          label: "Ежедневный прогресс",
          data: wordsLearnedToday,
          backgroundColor: [
            "rgba(255, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 206, 86, 0.6)",
            "rgba(75, 192, 192, 0.6)",
          ],
          borderWidth: 3,
        },
      ],
    });
  }, [props.learnedWords]);

  async function getStatistic(url: string, bearerToken: string) {
    const fullUrl = `${url}users/${userId}/statistics`;
    await getUserData(fullUrl, bearerToken)
      .then((responseData: any) => {
        console.log(responseData);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  // getStatistic(url, token)

  return (
    <Container className="min-vh-100 p-0 border border-top-0">
      <Container className="statistics-page-head-block bg-light d-flex flex-wrap">
        <h2 className="statistics-page-head p-3 text-warning">Статистика</h2>
      </Container>
      <Container>
        <h2 className="mt-4">{"Статистика пользователя - " + username}</h2>

        <Table striped bordered hover className="mt-4">
          <thead>
            <tr>
              <th>#</th>
              <th>{"Статистика пользователя - " + username}</th>
              <th>Результат</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Пройдено карточек за все время</td>
              <td>{allWords.length}</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Лучшая серия</td>
              <td>{props.bestSeries}</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Процент правильных ответов</td>
              <td>{props.correctAnswer} %</td>
            </tr>
            <tr>
              <td>4</td>
              <td>Изучено новых слов</td>
              <td>{allWords.length}</td>
            </tr>
          </tbody>
        </Table>
      </Container>
      <Container className="BarExample">
        <Line
          data={lineData}
          options={{
            scales: {
              yAxes: [
                {
                  ticks: {
                    min: 0,
                    stepSize: 1,
                  },
                },
              ],
              xAxes: [
                {
                  ticks: {
                    min: 0,
                    stepSize: 1,
                  },
                  type: "time",
                  distribution: "series",
                  time: {
                    minUnit: "week",
                    unit: "week",
                    unitStepSize: 1,
                    min: "start",
                    max: "end",
                  },
                },
              ],
            },
            title: {
              display: true,
              text: "Статистика за весь период обучения",
              fontSize: 25,
            },
            legend: {
              display: true,
              position: "top",
            },
          }}
        />
        <Bar
          data={barData}
          options={{
            scales: {
              yAxes: [
                {
                  ticks: {
                    min: 0,
                    stepSize: 1,
                  },
                },
              ],
              xAxes: [
                {
                  ticks: {
                    min: 0,
                    stepSize: 1,
                  },
                  type: "time",
                  distribution: "series",
                  time: {
                    minUnit: "week",
                    unit: "week",
                    unitStepSize: 1,
                    min: "start",
                    max: "end",
                  },
                },
              ],
            },
            title: {
              display: true,
              text: "Сегодня изучено новых слов",
              fontSize: 25,
            },
            legend: {
              display: true,
              position: "top",
            },
          }}
        />
      </Container>
    </Container>
  );
};
export default Statistics;
